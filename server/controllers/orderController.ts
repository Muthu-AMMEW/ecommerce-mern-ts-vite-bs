import Razorpay from 'razorpay';
import crypto from 'crypto';
// import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import catchAsyncError from '../middlewares/catchAsyncError';
import Order from '../models/orderModel';
import Product from '../models/productModel';
import ErrorHandler from '../utils/errorHandler';


const razorpay: any = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//Updating the product stock of each order item
async function subStock(productId: string, quantity: number) {
    const product: any = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({ validateBeforeSave: false })
}
async function addStock(productId: string, quantity: number) {
    const product: any = await Product.findById(productId);
    product.stock = product.stock + quantity;
    product.save({ validateBeforeSave: false })
}

//Create New Order - api/v1/order/new
export const newOrder = catchAsyncError(async (req: any, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const options = {
        amount: Math.round(totalPrice * 100), // Convert amount to paise
        currency: paymentInfo.currency,
        receipt: paymentInfo.payerEmailId,
        notes: paymentInfo,
    };
    const pgInfo = await razorpay.orders.create(options);

    paymentInfo.pgOrderId = pgInfo.id;
    paymentInfo.paymentStatus = "Not Paid";


    orderItems.map((product: any) => product.image.length > 0 ? product.image = new URL(product.image).pathname + new URL(product.image).search + new URL(product.image).hash : undefined);

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        pgInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    //Updating the product stock of each order item
    order.orderItems.forEach(async (orderItem: any) => {
        await subStock(orderItem._id, orderItem.quantity)
    })

    order.orderItems.map(product => product.image.length > 0 ? product.image = `${process.env.SERVER_URL + product.image}` : undefined);

    res.status(200).json({
        success: true,
        order
    })
})

//Verify Payment and payment status - api/v1/verify-payment
export const verifyOrder = catchAsyncError(async (req, res, next) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const order: any = await Order.findOne({ "paymentInfo.pgOrderId": razorpay_order_id });

    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    const secret = razorpay.key_secret;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return next(new ErrorHandler(`Payment verification data missing ${req.params.id}`, 404))
    }
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        if (order) {
            order.paymentInfo.paymentStatus = 'paid';
            order.paymentInfo.paymentId = razorpay_payment_id;
            await order.save();
        }
        res.status(200).json({ status: 'ok' });
    } else {
        res.status(400).json({ status: 'verification_failed' });
        console.log("Payment verification failed");
    }

});


//Get Single Order - api/v1/order/:id
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'fullName email');
    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    order.orderItems.map(product => product.image.length > 0 ? product.image = `${process.env.SERVER_URL + product.image}` : undefined);

    res.status(200).json({
        success: true,
        order
    })
})

//Cancel Order / Order Status - api/v1/order/:id
export const cancelOrder = catchAsyncError(async (req, res, next) => {
    const order: any = await Order.findById(req.params.id);

    if (order?.orderStatus == 'Processing' && req.body.orderStatus == 'Processing') {
        return next(new ErrorHandler('Already in processing!', 400))
    }

    if (order?.orderStatus == 'Shipped' && req.body.orderStatus == 'Processing') {
        return next(new ErrorHandler('Order has been already shipped!', 400))
    }

    if (order?.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }

    if (order?.orderStatus == 'Returned') {
        return next(new ErrorHandler('Order has been already retured!', 400))
    }

    if (order?.orderStatus == 'Cancelled') {
        return next(new ErrorHandler('Order has been already Cancelled!', 400))
    }

    if (req.body.orderStatus == 'Cancelled') {
        order.orderStatus = req.body.orderStatus;
        await order.save();

        order.orderItems.forEach(async (orderItem: any) => {
            await addStock(orderItem._id, orderItem.quantity)
        })

        res.status(200).json({
            success: true
        })
    }


});

//My Orders(Get Loggedin User Orders) - /api/v1/myorders
export const myOrders = catchAsyncError(async (req: any, res, next) => {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

    orders.map(order => order.orderItems.map(product => product.image.length > 0 ? product.image = `${process.env.SERVER_URL + product.image}` : undefined));

    res.status(200).json({
        success: true,
        orders
    })
})

//Admin: Get All Orders - api/v1/admin/orders
export const orders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'fullName email');

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    orders.map(order => order.orderItems.map(product => product.image.length > 0 ? product.image = `${process.env.SERVER_URL + product.image}` : undefined));

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Admin: Update Order / Order Status - api/v1/admin/order/:id
export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order: any = await Order.findById(req.params.id);

    if (order.orderStatus == 'Processing' && req.body.orderStatus == 'Processing') {
        return next(new ErrorHandler('Already in processing!', 400))
    }

    if (order.orderStatus == 'Processing' && req.body.orderStatus == 'Returned') {
        return next(new ErrorHandler('Item is not shipped', 400))
    }

    if (order.orderStatus == 'Shipped' && req.body.orderStatus == 'Processing') {
        return next(new ErrorHandler('Order has been already shipped!', 400))
    }

    if (order.orderStatus == 'Delivered' && req.body.orderStatus != 'Returned') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }

    if (order.orderStatus == 'Returned') {
        return next(new ErrorHandler('Order has been already retured!', 400))
    }

    if (order.orderStatus == 'Cancelled') {
        return next(new ErrorHandler('Order has been already Cancelled!', 400))
    }

    order.orderStatus = req.body.orderStatus;
    if (req.body.orderStatus == 'Delivered') {
        order.deliveredAt = Date.now();

    }
    if (req.body.orderStatus == 'Returned') {
        order.returnedAt = Date.now();
        order.orderItems.forEach(async (orderItem: any) => {
            await addStock(orderItem._id, orderItem.quantity)
        })
    }
    await order.save();

    if (req.body.orderStatus == 'Cancelled') {
        order.orderItems.forEach(async (orderItem: any) => {
            await addStock(orderItem._id, orderItem.quantity)
        })
    }

    res.status(200).json({
        success: true
    })

});


//Admin: Delete Order - api/v1/admin/order/:id
export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    await order.deleteOne();
    res.status(200).json({
        success: true
    })
})


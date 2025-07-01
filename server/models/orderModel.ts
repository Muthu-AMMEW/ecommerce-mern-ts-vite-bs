import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        fullName: {
            type: String,
            required: true
        },
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }

    }],
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paymentInfo: {
        paymentId: {
            type: String,
            default: "Not Paid"
        },
        payerName: {
            type: String,
            required: true
        },
        payerPhoneNumber: {
            type: String,
            required: true
        },
        payerEmailId: {
            type: String,
            required: true
        },
        pgOrderId: {
            type: String,
            required: true,
            unique: true
        },
        currency: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            required: true
        }
    },
    pgInfo: {
        type: Object,
        required: [true, "Please give razorpay details"]
    },
    paidAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    },
    returnedAt: {
        type: Date
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Returned', 'Cancelled'],
        required: true,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

let orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
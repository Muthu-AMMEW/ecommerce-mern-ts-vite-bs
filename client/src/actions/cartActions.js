import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice';
import axios from 'axios'

export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/${id}`)
        dispatch(addCartItemSuccess({
            _id: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
    } catch (error) {

    }
}
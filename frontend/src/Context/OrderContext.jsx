import { createContext, useContext, useEffect, useReducer } from "react"
import axiosInstance from '../API/axiosInstance'

const OrderContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: true }
        case 'CREATE_ORDER':
            return { ...state, isLoading: false, orders: [...state.orders, action.payload] }

        case 'GET_ORDER':
            return { ...state, isLoading: false, orders: action.payload }
        case 'SET_ERROR':
            return {
                ...state, isLoading: false, isError: true
            }
        default:
            return state;

    }
}

const initialState = {
    orders: [],
    isLoading: false,
    isError: false
}
const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // ✅ 1. Place an Order
    const placeOrder = async ({ productId, quantity, address }) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await axiosInstance.post('create/', {
                product: productId,
                quantity,
                shipping_address: address,
            })
            const order = res.data
            dispatch({ type: 'CREATE_ORDER', payload: order })
        }
        catch (error) {
            dispatch({ type: 'SET_ERROR' })
        }
    }

    // ✅ 2. Fetch Current User's Orders
    const myOrder = async () => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await axiosInstance.get('my-orders/')
            const orders = res.data
            dispatch({ type: 'GET_ORDER', payload: orders })
        }
        catch (error) {
            dispatch({ type: 'SET_ERROR' })
        }
    }


    return (
        <OrderContext.Provider value={{ ...state, placeOrder, myOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

const useOrder = () => {
    return useContext(OrderContext)
}

export { OrderProvider, useOrder }
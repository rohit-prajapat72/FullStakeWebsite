import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducer/ProductReducer';
import axiosInstance from '../API/axiosInstance';


const AppContext = createContext();

const API = 'http://127.0.0.1:8000/api/products/'

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featuredProduct: [],
    isSingleLoading: false,
    singleProduct: {}
}

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getProductData = async (url) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            
            const response = await axiosInstance.get('products/');
            const products = await response.data;
            dispatch({ type: 'SET_API_DATA', payload: products })
        } catch (error) {
            console.log("API Error:", error.response?.data || error.message);
            dispatch({ type: 'API_ERROR' })
        }
    }


    // my 2nd api call for single product

    const getSingleProduct = async (url) => {
        dispatch({ type: 'SET_SINGLE_LOADING' })
        try {
            const response = await axiosInstance.get(url);
            const singleProduct = await response.data;
            dispatch({ type: 'SET_SINGLE_PRODUCT_DATA', payload: singleProduct })
        } catch (error) {
            dispatch({ type: 'SET_SINGLE_ERROR' })
        }
    }

    useEffect(() => {
        getProductData(API)
    }, [])

    return (
        <AppContext.Provider value={{ ...state, getSingleProduct }}>
            {children}
        </AppContext.Provider>
    )
}

// create custom hook
const useProductContext = () => {
    return useContext(AppContext);
}

export { ProductProvider, AppContext, useProductContext }

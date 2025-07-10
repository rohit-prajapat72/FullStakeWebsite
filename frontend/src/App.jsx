import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Product from "./Pages/Products"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"
import Applayout from "./Layout/Applayout"
import Profile from "./Pages/Profile"
import ErrorPage from "./Pages/ErrorPage"
import { GlobalStyle } from '../src/GlobalStyle'
import { ThemeProvider } from "styled-components"
import ResetPasswordRequest from "./Authentication/ResetPasswordRequest"
import ResetPasswordConfirm from "./Authentication/ResetPasswordConfirm"
import BuyProduct from "./Pages/BuyProduct"

const App = () => {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      bg_hover:'#f1f1f1',
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      message:'#29b6d9',
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "0 12px 25px rgba(0, 0, 0, 0.1)",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },

  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Applayout />,
      errorElement: <ErrorPage />,
      children: ([
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/products",
          element: <Product />
        },
        {
          path: '/singleProduct/:id',
          element: <ProductDetails />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/buy-now/:id',
          element:<BuyProduct/>
        }
      ]),
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path:'/ResetPassword',
      element:<ResetPasswordRequest/>
    },
    {
     path:"/reset-password/:uid/:token",
     element:<ResetPasswordConfirm/>
    }

  ])


  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App

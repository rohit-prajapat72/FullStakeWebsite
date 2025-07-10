import { useParams } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";
import { useProductContext } from "../Context/ProductContext";
import { useEffect } from "react";
// import OrderForm from "../component/order-section/OrderForm";
import BuyOrderPage from "../component/order-section/OrderForm";


const API = 'http://127.0.0.1:8000/api/products/'
const BuyProduct = () => {
  const { id } = useParams();
  const { placeOrder, isLoading } = useOrder();
  const { getSingleProduct, singleProduct } = useProductContext();


  useEffect(() => {
    getSingleProduct(`${API}${id}/`);
  }, [])


  return (
    <div>
      <p>name {singleProduct.name}</p>
      <BuyOrderPage
        onSave={(data) => {
          console.log("Order form submitted:", data);
          // call placeOrder(data)
        }}
        onCancel={() => {
          console.log("Cancelled");
        }}
      />

    </div>
  )
}

export default BuyProduct

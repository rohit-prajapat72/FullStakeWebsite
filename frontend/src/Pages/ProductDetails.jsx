import { useEffect } from 'react'
import { useProductContext } from '../Context/ProductContext'
import Loading from '../component/Loading'
import { useParams } from 'react-router-dom'
import PageNavigation from '../component/PageNavigation'
import styled from 'styled-components'
import ProductImage from '../component/ProductImage'
import FormatPrice from '../Helpers/FormatPrice'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaTruck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import RatingStar from '../component/RatingStar'
import AddToCart from '../component/AddToCart'
import ProductFeatures from '../component/ProductFeatures'
import CostomerReviews from '../component/CostomerReviews'




const API = 'http://127.0.0.1:8000/api/products/'

const ProductDetails = () => {
  const { isSingleLoading, singleProduct, getSingleProduct } = useProductContext();

  const { id } = useParams();

  const { name, brand, category, delivery_info, description, features, images, payment_method, ratings, return_policy, reviews, status, stock_quantity, stock_status, warranty, price } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}${id}/`)
  }, [])


  if (isSingleLoading) {
    return <Loading />
  }
  return (
    <Wrapper>
      <PageNavigation title={name} />
      <div className='container'>
        <div className="grid grid-two-column">
          <div className="product-iamge">
            <ProductImage images={images} />
          </div>
          <div className="product-data">
            <h3>{name}</h3>
            {category && <p>Category : {category.name}</p>}
            <p>Brand : {brand}</p>
            <RatingStar stars={ratings} />
            <p className="product-price">
              MRP :
              <del>
                <FormatPrice price={price + 2500} />
              </del>
            </p>
            <p className="product-price product-data-real-price">
              Deal of the Day :
              <FormatPrice price={price} />
            </p>
            <p>
              {description}
            </p>
            <div className="more-information">
              <div className="product-warranty">
                <VscWorkspaceTrusted className="icon" />
                <p>{warranty}</p>
              </div>
              <div className="product-delivery">
                <FaTruck className='icon' />
                <p>{delivery_info}</p>
              </div>
              <div className="product-replace">
                <GiReturnArrow className='icon' />
                <p>{return_policy}</p>
              </div>
              <div className="product-payment_method">
                <RiSecurePaymentLine className='icon' />
                <p>{payment_method}</p>
              </div>
            </div>
            <p className="is_avalable">
              In Stock : <strong> {stock_status}</strong>
            </p>
            <ProductFeatures features={features} />
            <hr />
            <AddToCart product={singleProduct} />
            <CostomerReviews reviews={reviews} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 3rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: .5rem;

  .more-information{
    margin:2rem 0rem;
    padding:0px 0px .8rem 0px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-bottom:1px solid black;
  }
  .product-warranty,
  .product-delivery,
  .product-replace,
  .product-payment_method{
    text-align:center;
  }

  .icon{
   width:100%;
   font-size:2rem;
  }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }

    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;


export default ProductDetails

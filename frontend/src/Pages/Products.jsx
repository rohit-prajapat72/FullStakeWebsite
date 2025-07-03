import React from 'react'
import { useProductContext } from '../Context/ProductContext'
import Loading from '../component/Loading'
import ProductCard from '../component/ProductCard';
import styled from 'styled-components';


const Products = () => {
  const { isLoading, products } = useProductContext();
  console.log(products);
  
  if (isLoading) {
    return <Loading />
  }
  return (
    <Wrapper className="section">
      <div className="container grid grid-two--column">
         <div className="category-section bg-red-300">
          <h2 className="text-center">Products</h2>
          <p className="text-center">Explore our wide range of products</p> 
         </div>
        <div className="grid grid-two-column">
          {products.map((curElem) => {
            return <ProductCard key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 0.3rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 100rem;
  }
    
 `;

export default Products

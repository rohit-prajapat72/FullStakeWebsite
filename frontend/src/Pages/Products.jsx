import React from 'react'
import { useProductContext } from '../Context/ProductContext'
import Loading from '../component/Loading'
import ProductCard from '../component/ProductCard';
import styled from 'styled-components';
import FilterSection from '../component/FilterSection';
import Sort from '../component/Sort';


const Products = () => {
  const { isLoading, products } = useProductContext();
  console.log(products);

  if (isLoading) {
    return <Loading />
  }
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>
        <section className='product-view--sort'>
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product grid grid-three-column">
            {products.map((curElem) => {
              return <ProductCard key={curElem.id} {...curElem} />;
            })}
          </div>
        </section>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;
export default Products

import { useProductContext } from '../Context/ProductContext';
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import styled from 'styled-components';

const FeatureProduct = () => {
  const { isLoading, featuredProduct } = useProductContext();

  if (isLoading) {
    return <Loading/>
  }

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Feature Services</div>
        <div className="grid grid-three-column">
          {featuredProduct.map((curElem) => {
            return <ProductCard key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0.3rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 100rem;
  }
 `;

export default FeatureProduct;
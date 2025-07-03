import { useState } from 'react';
import styled from 'styled-components';

const ProductImage = ({ images = [{image:''}] }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  return (
    <Wrapper>
      <div className="grid grid-four-colomn">
        {
          images.map((currimage) => {
            return (
              <figure >
                <img src={currimage.image}  
                  alt="Product image"
                  key={currimage.id}
                  className='box-image--style'
                  width={100}
                  height={100}
                  onClick={()=>setCurrentImage(currimage)}
                />
              </figure>
            )
          })
        }
      </div>

      {/* 2nd colomn */}
      <div className="main-screen">
        <img src={currentImage.image} alt='product image'  />
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: 50%;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      display: flex;
    flex-direction: column;
    }
  }
`;

export default ProductImage

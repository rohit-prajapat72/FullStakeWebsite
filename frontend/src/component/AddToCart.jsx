import React, { useState } from 'react'
import styled from 'styled-components'
import { FaCheck } from "react-icons/fa";
import CartAmountToggole from './CartAmountToggole';
import {Button} from '../style/Button'

const AddToCart = ({ product }) => {
  const { variants } = product
  const [currColor, setCurrColor] = useState(() =>
    variants && variants.length > 0 ? variants[0] : null
  );

  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  }
  const setIncrease = () => {
    amount < currColor.product_quantity ? setAmount(amount + 1) : setAmount(currColor.product_quantity);
  }

  return (
    <Wrapper>
      <div className="colors">
        <p>Colors :
          {
            variants && variants.map((variant) => {
              const { color, id } = variant
              return (
                <button
                  key={id}
                  style={{ backgroundColor: color }}
                  className={color === currColor ? 'btnStyle active' : 'btnStyle'}
                  onClick={() => setCurrColor(color)}
                >
                  {color === currColor ? <FaCheck className='checkStyle' /> : null}
                  {/* <FaCheck className='checkStyle' /> */}
                </button>
              )
            })
          }
        </p>
      </div>

      {/* Add to Cart */}
      <CartAmountToggole
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <Button>
         Add Cart
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: white;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart

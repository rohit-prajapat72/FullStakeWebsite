import React, { useState } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { FaCartArrowDown } from 'react-icons/fa';
import { LuMenu } from "react-icons/lu";
import { FaRegWindowClose } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Button } from '../style/Button';



const Nav = () => {
    const [menuIcon , setMenuIcon] = useState()
    return (
        <NavWrapper>
            <div className= {menuIcon ? "navbar active" : 'navbar'}>
                <ul className="navbar-lists">
                    <li><NavLink to="/" className="navbar-link"  onClick={()=>setMenuIcon(false)}>Home</NavLink></li>
                    <li><NavLink to="/about" className="navbar-link" onClick={()=>setMenuIcon(false)}>About</NavLink></li>
                    <li><NavLink to="/contact" className="navbar-link" onClick={()=>setMenuIcon(false)}>Contact</NavLink></li>
                    <li><NavLink to="/products" className="navbar-link" onClick={()=>setMenuIcon(false)}>Products</NavLink></li>
                    <li><NavLink to="/login" className="navbar-link" onClick={()=>setMenuIcon(false)}> <Button>Login</Button> </NavLink></li>
                    <li>
                        <NavLink to="/cart" className="navbar-link cart-trolley--link" onClick={()=>setMenuIcon(false)}>
                            <FaCartArrowDown className="cart-trolley" />
                            <span className="cart-total--item">10</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/profile" className="navbar-link" onClick={()=>setMenuIcon(false)}><CgProfile /></NavLink></li>
                </ul>
                {/* to button for open and close of menu */}
                <div className="mobile-navbar-btn">
                    <LuMenu name='menu-outline' className='mobile-nav-icon' onClick={()=>setMenuIcon(true)} />
                    <FaRegWindowClose name='close-outline' className='mobile-nav-icon close-outline' onClick={()=>setMenuIcon(false)} />
                </div>
            </div>

        </ NavWrapper>
    )
}

const NavWrapper = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.6rem;
          font-weight: 600;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 2.5rem;
      }

      .cart-total--item {
        width: 2rem;
        height: 2rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-size:1.2rem;
        align-items:center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        padding:3rem 0rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        transition: all .5s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all .5s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

export default Nav
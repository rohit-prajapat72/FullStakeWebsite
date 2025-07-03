import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from '../style/Button'

const HeroSection = ({data}) => {
    const {name} = data
    return (
        <Wrapper>
            <div className="container">
                <div className="grid grid-two-column">
                    <div className="hero-section-data">
                        <p className='intro-data'>Welcome to</p>
                        <h1 className='heading'>{name}</h1>
                        <p>Shop the newest gadgets, smart devices, and home tech at competitive prices. Whether you're upgrading or exploring, our handpicked electronics deliver performance, quality, and value — every time.</p>
                        <NavLink to='/products'>
                            <Button> Shop Now</Button> 
                        </NavLink>
                    </div>
                    <div className="hero-image">
                        <figure>
                            <img src="./Images/hero-section-img.jpg" alt="hero-section-img" />
                        </figure>
                    </div>

                </div>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

.heading{
font-size:4rem;
}

.hero-section-data{
display:flex;
flex-direction:column;
gap:1rem;
}

.hero-image img{
border-radius:1rem;
}


`

export default HeroSection

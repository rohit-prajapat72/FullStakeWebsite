import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const PageNavigation = ({ title }) => {
    return (
        <>
        <hr />
        <Wrapper>
            <NavLink to="/">
                Home
            </NavLink>  / {title}
        </Wrapper>
        </>
    )
}

const Wrapper = styled.section`
  height: 6rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  padding-left: 2rem;
  

  a {
    font-size: 2rem;
    color:${({theme})=>theme.colors.helper}
  }
    
`;

export default PageNavigation

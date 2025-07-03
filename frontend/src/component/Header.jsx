import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';


const Header = () => {
  return (
    <NavWrapper>
      <div className="header">
        <div className="logo">
          <NavLink to='/'>
            <h1>Prajapat_Store</h1>
          </NavLink>
        </div>
        <Nav />
      </div>
    </NavWrapper>
  );
};

export default Header;

// Styled-components
const NavWrapper = styled.header`

  .header{
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items:center;
  height:7rem;
  padding: 0 2rem;
  position:relative;
  }


  .logo{
  h1{
    font-size:3rem
  }
  }
`

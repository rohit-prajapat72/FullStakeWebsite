import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../style/Button';
import styled from 'styled-components';
import GoogleSignIn from './GoogleSignIn';
import axios from 'axios';

const LoginAPI = 'http://127.0.0.1:8000/api/token/'; // ✅ JWT token endpoint

const Login = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (formdata) => {
    const FormInputData = Object.fromEntries(formdata.entries());

    try {
      const res = await axios.post(LoginAPI, FormInputData);

      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      alert("Login successful!");
      navigate('/');
    } catch (error) {
      alert("Invalid username or password");
      console.error(error.response?.data);
    }
  };

  return (
    <Wrapper>
      <div className="sign-in">
        <div className="google-signin">
          <GoogleSignIn />
        </div>
        <form action={handleFormSubmit} className="form-section">
          <h2>🔐 Login</h2>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <div className="links">
            <NavLink to="/ResetPassword" className="forgot-pass">
              Forgot Password?
            </NavLink>
          </div>
          <Button type="submit">Log in</Button>
          <div className="auth-switch">
            Don't have an account?
            <NavLink to="/register" className="signup-link">
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradient};

 .sign-in{
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    width: 100%;
    max-width: 45rem;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    gap: 1.2rem;
    animation: fadeIn 0.5s ease-in-out;
 }

  .form-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }


  .links {
    text-align: right;
  }

  .forgot-pass {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.helper};
    text-decoration: none;
  }

  .forgot-pass:hover {
    text-decoration: underline;
  }

  .auth-switch {
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .signup-link {
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.helper};
    text-decoration: none;
    font-weight: 500;
  }

  .signup-link:hover {
    text-decoration: underline;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


export default Login

import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../style/Button'
import styled from 'styled-components'
import { useState } from 'react'



const RegisterAPI = 'http://127.0.0.1:8000/api/register/'
const Register = () => {
    const navigate = useNavigate();
    const [message , setMessage] = useState('');

    const handleFormSubmit = async (formdata) => {
        const FormInputData = Object.fromEntries(formdata.entries())
        console.log(FormInputData)

        try {
            await axios.post(RegisterAPI, FormInputData)
            alert("Registration Successfull")
            navigate('/login')
        }
        catch (error) {
            console.log(error)
            setMessage(error)
        }


    }
    return (
        <Wrapper>
            <form action={handleFormSubmit} className="form-section">
                <h2>📝 Register</h2>
                <input type="text" name="username" placeholder="Username" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    required
                />

                <Button type="submit">Register</Button>

                <p className="login-link">
                    Already have an account? <NavLink to="/login">Log in</NavLink>
                </p>
                {message && <p className='message'>{message}</p> }
            </form>
        </Wrapper>

    )
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  justify-content: center;
  align-items: center;

  .form-section {
    background: ${({ theme }) => theme.colors.white};
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    width: 100%;
    max-width: 45rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: slideIn 0.6s ease-in-out;
  }

  h2 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .login-link {
    text-align: center;
    font-size: 1.7rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .login-link a {
    color: ${({ theme }) => theme.colors.helper};
    font-weight: 500;
    margin-left: 5px;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
  .message {
    margin-top: 1rem;
    text-align: center;
    font-size:2rem;
    color: ${({ theme }) => theme.colors.message};
  }

  @keyframes slideIn {
    0% {
      transform: translateY(25px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


export default Register

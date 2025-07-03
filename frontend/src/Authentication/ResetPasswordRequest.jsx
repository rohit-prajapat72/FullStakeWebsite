import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../style/Button';

const ResetPasswordApi = 'http://localhost:8000/api/password-reset/';

const ResetPasswordRequest = () => {
  const [message, setMessage] = useState('');

  const handleResetRequest = async (formData) => {
    const FormInputData = Object.fromEntries(formData.entries());
    console.log("FormInputData", FormInputData);

    try {
      const response = await axios.post(
        ResetPasswordApi,
        JSON.stringify(FormInputData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Success Response", response.data);
      setMessage('✅ Password reset link sent to your email!');
    } catch (error) {
      console.log("AXIOS ERROR FULL:", error);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        setMessage(error.response.data?.detail || '⚠️ Something went wrong.');
      } else if (error.request) {
        console.log("No response received:", error.request);
        setMessage('❌ Server not responding.');
      } else {
        console.log("Request Error:", error.message);
        setMessage('❌ Failed to send request.');
      }
    }
  };

  return (
    <Wrapper>
        <form action={handleResetRequest} className="form-section">
          <h2>🔒 Reset Your Password</h2>
          <input
            type="email"
            placeholder="Enter your registered email"
            name="email"
            required
          />
          <Button type="submit">📩 Send Reset Link</Button>
          {message && <p className="response">{message}</p>}
        </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradient};
  .form-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 40rem;
    padding: 2rem;
    background: ${({theme})=>theme.colors.white};
    border-radius: 12px;
    box-shadow:${({theme})=>theme.colors.shadow};
    gap: 1.6rem;
    animation: fadeIn 0.6s ease-in-out;
  }

   h2 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: ${({theme})=>theme.colors.text};
    font-size:3rem;
  }

  .response {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 1.6rem;
    color: ${({theme})=>theme.colors.message};
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default ResetPasswordRequest;

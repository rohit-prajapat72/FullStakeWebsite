import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "../style/Button";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [message, setMessage] = useState("");

  const handleSubmit = async (formData) => {
    const FormInputData = Object.fromEntries(formData.entries())
    
    try {
      await axios.post("http://localhost:8000/api/reset-password-confirm/", {
        uid,
        token,
        FormInputData
      });

      setMessage("✅ Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Reset failed");
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <h2>🔐 Reset Your Password</h2>
        <form action={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            name="password2"
            required
          />
          <Button type="submit">Reset Password</Button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.gradient};

  .card {
    padding:2rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    width: 100%;
    max-width: 40rem;
    animation: fadeIn 0.6s ease-in-out;
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color:${({ theme }) => theme.colors.text};
    font-size:3.2rem;

  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message {
    margin-top: 1rem;
    text-align: center;
    font-size:2rem;
    color: ${({ theme }) => theme.colors.message};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(25px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default ResetPassword;

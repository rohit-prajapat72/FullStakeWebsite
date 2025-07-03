import styled from 'styled-components'
import axios from 'axios'
import { Button } from '../style/Button'


const ContactApi = 'http://localhost:8000/api/contact/'
const Contact = () => {

  const handleSendMessage = async (formdata) => {
    const FormInputData = Object.fromEntries(formdata.entries())
    console.log(FormInputData)
    try {
      await axios.post(ContactApi, FormInputData);
      alert("Message sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  }


  return (
    <Wrapper className='contact'>
      <div className="container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.8305776102293!2d72.74769650947826!3d26.717858976666886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3941a90b9f42efdf%3A0x86d306ceab73f9e5!2sBairdo%20ka%20bass!5e0!3m2!1sen!2sin!4v1750146393574!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        <div className="message-section">
          <form action={handleSendMessage}>
            <div className="content">
              <input type="text" name="username" placeholder='username' />
              <input type="email" name="email" placeholder='email' />
              <textarea name="message" rows={6} placeholder='message'></textarea>
              <Button type='submit'>
                   Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>

    </Wrapper>
  )
}

export default Contact

const Wrapper = styled.section`

  .container{
   display:grid;
   gap:2rem;
   margin:3rem auto;
  }

 .message-section{
 display:flex;
 justify-content:center;
 }
  
  .content{
  display:grid;
  width:30rem;
  gap:.7rem
  }
  input{
  outline:none;
  padding:1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius:.5rem;
 }

  textarea{
  outline:none;
  border-radius:.5rem;
  padding:1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;  }

`
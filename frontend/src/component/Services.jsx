import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";



const Services = () => {
    return (
        <Wrapper>
            <div className='container'>
                <div className="grid grid-three-column">
                    <div className="service-1">
                        <TbTruckDelivery className="icon" />
                        <h3>Super Fast And Free Delivery</h3>
                    </div>
                    <div className="service-2">
                        <div className="service-coloum-1">
                            <MdSecurity className="icon" />
                            <h3>Non-contact Shipping</h3>
                        </div>
                        <div className="service-coloum-2">
                            <GiReceiveMoney className="icon" />
                            <h3>Money-back Guaranteed</h3>
                        </div>
                    </div>
                    <div className="service-3">
                        <RiSecurePaymentLine className="icon" />
                        <h3>Super Secure Payment System</h3>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

.service-1,
.service-coloum-1,
.service-coloum-2,
.service-3 {
   background-color :${({theme})=>theme.colors.bg}; 
   padding:1rem 0rem;
}

.icon {
  font-size:3.8rem;
  color: #5138ee;
  display:flex;
  justify-content:center;
  }

.service-1,
.service-3 {
display:grid;
justify-content:center;

.icon{
width:100%;
}
}

.service-2{
display:grid;
gap:1rem;
}
.service-coloum-1,
.service-coloum-2 {
display:flex;
justify-content:space-evenly;
padding:2rem 0rem;
}

h3 {
    margin-top: 1.4rem;
    font-size: 1.5rem;
  }
`

export default Services

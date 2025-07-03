import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const RatingStar = ({ stars }) => {
    const { average_rating, total_reviews } = stars || {};


    const ratings = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        // debugger;
        return (
            <span key={index}>
                {average_rating >= index + 1 ? (
                    <FaStar className="icon" />
                ) : average_rating >= number ? (
                    <FaStarHalfAlt className="icon" />
                ) : (
                    <AiOutlineStar className="icon" />
                )}
            </span>
        )
    })
    return (
        <Wrapper>
            <div className="icon-style">
                {ratings}
                <p>({total_reviews} customer reviews)</p>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;
export default RatingStar




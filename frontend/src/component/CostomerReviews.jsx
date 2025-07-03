import styled from 'styled-components';

const CostomerReviews = ({ reviews }) => {

  return (
    <Wrapper>
      <div className="reviews">
        <h3>Costomer Reviews</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>rating</th>
              <th>comment</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews.map((review) => {
              const { id, user, rating, comment } = review;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{user.username}</td>
                  <td>{rating}</td>
                  <td>{comment}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 2rem;

  .reviews {
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
    font-weight: 600;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.bg};
  }

  tr:hover {
    background-color:${({ theme }) => theme.colors.bg_hover};
    transition: background-color 0.3s ease;
  }
`;

export default CostomerReviews

import styled from 'styled-components';

const ProductFeatures = ({ features}) => {
    return (
        <Wrapper>
            <div className="features">
                <h3>More Features</h3>
                {
                    features && Object.entries(features).map(([key, value]) => (
                        <div key={key} className="feature_object">
                            <p className="key">
                                <strong>{key}  </strong>
                            </p>
                            <p className="value">
                                {value}
                            </p>
                        </div>
                    ))
                }
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.div`

.feature_object{
display:flex;
justify-content:space-between;
width:100%;
gap:3rem;
}
`

export default ProductFeatures

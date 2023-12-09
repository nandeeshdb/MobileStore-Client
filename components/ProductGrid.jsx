import styled from "styled-components"
import ProductBox from "./ProductBox"

const StyledProductsGrid = styled.div`
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
`

function ProductGrid({products}) {
  return (
    <StyledProductsGrid>
        {
        products?.length > 0 && products.map(product=>(
          <div><ProductBox key={product._id} {...product} /></div>
        ))
      }
    </StyledProductsGrid>
  )
}

export default ProductGrid
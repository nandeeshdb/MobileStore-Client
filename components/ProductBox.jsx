import styled from "styled-components"
import Button from "./Button"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "./CartContext"
const ProductWrapper = styled.div`

` 

const Title = styled(Link)`
  font-weight: normal;
  font-size:1rem;
  margin:0;
  text-decoration:none;
  color:#050505
`

 const WhiteBox = styled(Link)`
    background-color: #fff;
    padding:20px;
    height:120px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    img{
        max-width: 100%;
        max-height: 80px;
    }
 `

 const ProductInfo = styled.div`
   margin: 10px ;
   
 `
const PirceInfoRow =styled.div`
    margin-top: 5px;
    display:flex;
    justify-content: space-between;
    gap:5px;
    align-items: center;  
`
const Price = styled.div`
   font-weight:bold;
   font-size:1rem;
  `
function ProductBox({_id,title,images,price}) {
  const{addProduct} = useContext(CartContext)
  return (
    <ProductWrapper>
        
    <WhiteBox href={`/products/${_id}`}>
        <div>
        <img src={images[0]}/>
        </div>
    </WhiteBox>
    <ProductInfo>
        <Title href={`/products/${_id}`}>
          {title}
        </Title>
        <PirceInfoRow>
           <Price> {price}$</Price>

        <Button primary outline onClick={()=>addProduct(_id)}>Add to cart</Button>
        </PirceInfoRow>
    </ProductInfo>
    </ProductWrapper>
  )
}

export default ProductBox
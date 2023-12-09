import styled from 'styled-components'
import Center from './Center'
import ProductGrid from './ProductGrid'


const Title = styled.h1`
  font-size:1.5rem;
  font-weight:bold;
  margin:20px 10px ;
`

function NewProducts({products}) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      
    <ProductGrid products={products} />
      
    </Center>
  )
}

export default NewProducts
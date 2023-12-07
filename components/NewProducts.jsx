import React from 'react'
import styled from 'styled-components'
import Center from './Center'
import ProductBox from './ProductBox'

const ProductsGrid = styled.div`
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
`

const Title = styled.h1`
  font-size:1.5rem;
  font-weight:bold;
  margin:20px 10px ;
`

function NewProducts({products}) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      
    <ProductsGrid>
      {
        products?.length > 0 && products.map(product=>(
          <div><ProductBox {...product} /></div>
        ))
      }
    </ProductsGrid>
    </Center>
  )
}

export default NewProducts
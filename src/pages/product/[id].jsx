import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { moongooseConnect } from '../../../lib/mongoose';
import { Product } from '../../../lib/model/Product';
import Header from '../../../components/Header';
import Center from '../../../components/Center';
import styled from 'styled-components';
import ImageComponent from '../../../components/ImageComponent';
import Button from '../../../components/Button';
import CartIcon from '../../../CartIcon';
import { CartContext } from '../../../components/CartContext';

const Title = styled.h1`
   font-size : 1.3em;
`

const WhiteBox = styled.div`
background-color: #fff;
padding:30px;
border-radius:10px;

`
const ColWrapper = styled.div`
  display:grid;
  grid-template-columns: .8fr 1.2fr;
  gap:40px;
  margin-top: 40px;
`

const PriceRow = styled.div`
  display:flex;
  gap:20px;
  align-items: center;
  margin-top:45px;
`


const Price = styled.span`
  font-size:1.4rem
`

function SingleProductPage({product}) {
  const {addProduct} = useContext(CartContext)

  return (
    <>
    <Header />
    <Center>
      <ColWrapper>
      <WhiteBox>
        <ImageComponent images={product.images}/>
        </WhiteBox>

      <div><Title>{product.title}</Title>
      <p>{product.description}</p>
      <PriceRow>
        <Price>{product.price}Rs</Price>
        <div><Button black onClick={()=>addProduct(product._id)}><CartIcon /> Add to cart</Button></div>
      </PriceRow>
      
      </div>
      </ColWrapper>


    </Center>

    </>
  )
}

export default SingleProductPage;

export const getServerSideProps=async(context)=>{
  await moongooseConnect()
  const{id} = context.query;
  const product = await Product.findById(id)
  return{
    props:{
      product:JSON.parse(JSON.stringify(product))

    }
  }

}
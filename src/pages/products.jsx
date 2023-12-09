import React from 'react'
import Header from '../../components/Header'
import Center from '../../components/Center'
import styled from 'styled-components'
import { moongooseConnect } from '../../lib/mongoose'
import { Product } from '../../lib/model/Product'
import ProductGrid from '../../components/ProductGrid'

const Title = styled.h1`
    font-size: 1.5em;
`



const ProductsPage = ({products}) =>{
    return(
    <>
    <Header />
    <Center>
        <Title>
            All Products
            {products.length}
        </Title>
        <ProductGrid products={products}/>

    </Center>
    </>
    )

}

export default ProductsPage;

export const getServerSideProps =async()=>{
    await moongooseConnect();
    const Products = await Product.find({},null,{sort:{_id:-1}})
    return{
        props:{
            products:JSON.parse(JSON.stringify(Products))
        }
    }

}

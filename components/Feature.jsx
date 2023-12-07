import React from 'react'
import Center from './Center'
import styled from 'styled-components'
import Button from './Button'
import { useRouter } from 'next/router'
import ButtonLink from './ButtonLink'
import CartIcon from '../icons/CartIcon'

const Bg = styled.div`
    background-color: #222;
    color:#fff;
    padding: 50px 0;
`

const Title = styled.h1`
    margin:0;
    font-weight: normal;
    font-size: 3rem;

`

const Dec = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`

const ColumnsWrapper = styled.div`
    display:grid;
    grid-template-columns: 1.1fr .9fr;
    gap:40px
   
`

const StyledImage = styled.img`
    max-width: 100%;
`
const Column = styled.div`
    display:flex;
    align-items:center
`

const ButtonsWrapper = styled.div`
    display:flex;
    gap:10px;
    margin-top: 25px;
`

function Feature({product}) {


    const router = useRouter()
  return (
    <Bg>
        <Center>
        <ColumnsWrapper>
            <Column>
            <div>
            <Title>{product.title}</Title>
             <Dec>{product.description}</Dec>
             <ButtonsWrapper>
             <ButtonLink href={'/products/'+product._id} white={1} outline={1}>Read more</ButtonLink>
             <Button  primary white>
             <CartIcon />
             Add to cart</Button>
             </ButtonsWrapper>
            </div>
            </Column>

            <Column>
                <StyledImage src='https://mobilemart.s3.ap-south-1.amazonaws.com/1701763398923.png'
                alt="no"/>
            </Column>
        </ColumnsWrapper>
        </Center>
    </Bg>
  )
}


export default Feature




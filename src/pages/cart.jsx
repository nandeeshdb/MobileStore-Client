import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import styled from 'styled-components'
import Button from '../../components/Button'
import { CartContext } from '../../components/CartContext'
import axios from 'axios'
import Table from '../../components/Table'
import Input from '../../components/Input'
import Center from '../../components/Center'

const ColumnWrapper = styled.div`
   display: grid;
   grid-template-columns: 1.1fr .9fr;
   gap:40px;
   margin-top: 40px;
`

const Box = styled.div`
   background-color: #fff;
   border-radius: 10px;
   padding:30px;

`

const ProductInfoCell = styled.td`
padding:10px;
margin-top: 10px;
  
`

const ProductImageBox= styled.div`
   width:100px;
  height:100px;
   padding:10px;
   border:1px solid rgba(0,0,0,0.1);
   border-radius: 10px;
   display:flex;
   align-items: center;
   justify-content: center;
   img{
      max-width:80px;
      max-height: 80px;
    }

`

const QuantityLabels = styled.span`
  padding:0 3px;
`

function cart() {
  const {cartProduct,addProduct,removeProduct} =useContext(CartContext);
  const [product,setProduct] =useState([]);
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[address,setAddress] = useState('')
  const[city,setCity] = useState('')
  const[country,setCountry] = useState('')
  const[pincode,setPincode] = useState('')
  const[isSuccess,setIsSuccess] = useState(false)

  useEffect(()=>{

   if(cartProduct.length > 0){
    axios.post('/api/cart',{ids:cartProduct}).then(response=>{
      setProduct(response.data);
    })
   }
   else{
    setProduct([])
   }
    
  },[cartProduct])

  const addMoreProduct =(id)=>{
    addProduct(id)

  }

  const lessMoreProduct = (id)=>{
    removeProduct(id)
  }

  let total = 0;
  for(const productId of cartProduct){
    const price = product.find(p=>p._id === productId)?.price || 0
    total += price;
  }

  const goToPayments = () =>{
    axios.post('/api/checkout',{ name,email,city,pincode,address,country,
      cartProduct,
    }).then(response=>{
      if(response.data.url){
        window.location = response.data.url;
      }
    })

  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      
    }
  }, []);

  if(isSuccess){
    return (
      <>
      <Header/>
      <Center>
        <Box>
          <h1>Thanks for your order!</h1>
          <p>We will email you when your order is out for delivery</p>
        </Box>
      </Center>
      </>
    )
  }
  return (
    <>
        <Header />
        <ColumnWrapper>
        <Box>{
          !cartProduct.length >0 && (
            <h2>Your Cart is empty</h2>
          )
          }

          {cartProduct.length > 0 &&(
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                product.map(product =>(
                  <tr>
                    <ProductInfoCell>
                      <ProductImageBox>
                      <img src={product.images[0]} alt="no" />
                      </ProductImageBox>
                      {product.title}
                      </ProductInfoCell> 
                    <td>
                      
                      <Button onClick={()=>lessMoreProduct(product._id)}>-</Button>
                      <QuantityLabels>
                      {cartProduct.filter(id=> id===product._id).length}
                      </QuantityLabels>
                      <Button onClick={()=>addMoreProduct(product._id)}>+</Button>
                      </td>
                    <td>{(cartProduct.filter(id=> id===product._id).length)*product.price}</td>

                    </tr>
    
                ))
              }
              <tr>
                <td></td>
                <td></td>
                <td>{total}</td>
              </tr>
              
         
            </tbody>
          </Table>
          )}
          
          </Box>



        <Box>
            <h2>Order Information</h2>
            
            <Input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} name="name"/>
            <Input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} name="email"/>
            <Input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} name="address"/>
            <Input type='text' placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)} name="city"/>
            <Input type='text' placeholder='Pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)} name="pincode"/>
            <Input type='text' placeholder='Country' value={country} onChange={(e)=>setCountry(e.target.value)} name="country"/>
            <input type="hidden" value={cartProduct.join(',')} name='products'/>
            <Button block black onClick={goToPayments}>Check Out</Button>
            
        </Box>
        </ColumnWrapper>

    </>
  )
}

export default cart
import Link from "next/link"
import styled from 'styled-components';
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";


const StyledHeader = styled.header`
    background-color:#222;
`

const Logo = styled(Link)`
    color:#fff;
    text-decoration: none;
    
`
const Wrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding:20px 0;
`
const StyledNav = styled.nav`
  display: flex;
  gap:15px;

`
const NavLink = styled(Link)`
  color:#aaa;
  text-decoration: none;

`


function Header() {
  const{cartProduct} = useContext(CartContext)
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
        <Logo href={'/'}>MobileStore</Logo>
        <StyledNav>
            <NavLink href={'/home'}>Home</NavLink>
            <NavLink href={'/products'}>All Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart({cartProduct.length})</NavLink>
        </StyledNav>
        </Wrapper>
        </Center>
    </StyledHeader>
  )
}

export default Header
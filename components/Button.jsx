import styled, { css } from "styled-components"


export   const  ButtonStyle = css`
 border:0;
     padding:5px 15px;
     border-radius:5px;
     cursor:pointer;
     display: inline-flex;
     align-items: center;
     text-decoration: none;
     svg{
      height: 16px;
      margin-right: 5px;
     };

     ${props => props.white && !props.outline && css`
        background-color: #fff;
        color:#000;
     `};


     ${props => props.black && props.outline && css`
        background-color: transparent;
        color:#000000;
        border:1px solid #fff;
     `};
     ${props => props.black && !props.outline && css`
        background-color: #000000;
        color:#fff;
     `};


     ${props => props.white && props.outline && css`
        background-color: transparent;
        color:#fff;
        border:1px solid #fff;
     `};

  
     ${props=> props.primary && !props.outline &&css`
     background-color:#5542F6;
     color:#fff; 
     border:1px solid #5542F6; 
     `};

     ${props=> props.primary && props.outline &&css`
     background-color:transparent;
     color:#0c6e3d; 
     border:1px solid #0c6e3d;
     `};

     ${props=> props.size==='l'  && css`
          font-size:1.2rem;
          padding:10px 20px
          svg{
            height: 36px;
           }
     `};

     ${props=>props.block && css`
       display: block;
       width:100%;
       padding:10px;
     `}
`

const StyledButton = styled.button`
      ${ButtonStyle}
    
`
function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}

export default Button;

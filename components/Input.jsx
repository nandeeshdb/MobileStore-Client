import styled from "styled-components"

const StyeldInputs = styled.input`
    width:100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius:10px;
    box-sizing: border-box;

`

function Input(props) {
  return (
    <StyeldInputs {...props}/>
  )
}

export default Input
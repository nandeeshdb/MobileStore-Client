import {createGlobalStyle} from 'styled-components';

const GloablStlye = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
   body{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
   }  
`

export default function App({ Component, pageProps }) {
  return(<>
  <GloablStlye />
   <Component {...pageProps} />
  </>)
}

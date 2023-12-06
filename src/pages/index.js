import Feature from "../../components/Feature";
import Header from "../../components/Header";
import { Product } from "../../lib/model/Product";
import { moongooseConnect } from "../../lib/mongoose";

export default function HomePage({featuredProduct}) {
 
  
  return (
   <>
   <Header />
   <Feature product={featuredProduct} />
   </>
  )
}

export async function getServerSideProps(){
  const freaturedProductId = '656f74b9fbfbc782e800dd55'
  await moongooseConnect();
  const featuredProduct = await Product.findById(freaturedProductId)
  return ({
    props:{featuredProduct:JSON.parse(JSON.stringify(featuredProduct))}
  })


}


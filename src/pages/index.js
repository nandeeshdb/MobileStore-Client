import Feature from "../../components/Feature";
import Header from "../../components/Header";
import NewProducts from "../../components/NewProducts";
import { Product } from "../../lib/model/Product";
import { moongooseConnect } from "../../lib/mongoose";

export default function HomePage({featuredProduct,newProducts}) {
  
 
  
  return (
   <>
   <Header />
   <Feature product={featuredProduct} />
   <NewProducts products={newProducts}/>
   </>
  )
}

export async function getServerSideProps(){
  const freaturedProductId = '656f74b9fbfbc782e800dd55'
  await moongooseConnect();
  const featuredProduct = await Product.findById(freaturedProductId)
  const newProducts = await Product.find({},null,{sort:{'_id':-1},limit:10})
  return ({
    props:{
      featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts))

  }
    
  })


}


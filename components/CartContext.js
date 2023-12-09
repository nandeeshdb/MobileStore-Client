import {createContext,  useEffect,  useState} from "react";

export const CartContext = createContext({})

export  const CartContextProvider =({children})=>{
    const ls =typeof window !== 'undefined' ? window.localStorage : null;
    const [cartProduct,setCartProduct]= useState([])

    useEffect(()=>{
        if(cartProduct?.length>0){
            ls?.setItem('cart',JSON.stringify(cartProduct))
        }
    },[cartProduct])

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProduct(JSON.parse(ls.getItem('cart')))
        }

    },[])


    const addProduct=(productId)=>{
        setCartProduct(prev=>[...prev,productId])
    }

    const removeProduct=(productId)=>{
        setCartProduct(prev=>{
            const pos = prev.indexOf(productId)
            if(pos !== -1){
                return prev.filter((value,index)=>index !== pos)
            }
            return prev
        })
    }

    function clearCart(){
        setCartProduct([])
      }

   return ( <CartContext.Provider value={{cartProduct,setCartProduct,addProduct,removeProduct,clearCart}}>
        {children}
    </CartContext.Provider>
   )
}
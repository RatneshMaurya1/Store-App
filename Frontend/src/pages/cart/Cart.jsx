import React, { useEffect, useState } from 'react'
import styles from "./cart.module.css"
import Navbar from '../../components/Navbar/Navbar'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { deleteCart, getCartItems, placeOrder, updateQuantity } from '../../services'
import { useCountContect } from '../../components/context/CountContext'

const Cart = () => {
    const [cart,setCart] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [addLoadingId,setAddLoadingId] = useState(null)
    const [removeLoadingId,setremoveLoadingId] = useState(null)
    const [loading,setLoading] = useState(false)
    const [name,setName] = useState("") 
    const navigate = useNavigate()
    const {setCount} = useCountContect()

    const getCarts = async () => {
        const response = await getCartItems()
        setCart(response.itemsTotalPrice)
        setTotalPrice(response.totalPrice)
    }
    const handleRemoveItem = async(productId) => {
        setremoveLoadingId(productId)
        try {
            const response = await updateQuantity(productId,"decrement")
            if(response){
                toast.success(response.message)
                await getCarts()
                return;
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setremoveLoadingId(null)
        }
    }

    const handleAddItem = async (productId) => {
        setAddLoadingId(productId)
        try {
            const response = await updateQuantity(productId,"increment")
            if(response){
                toast.success(response.message)
                await getCarts()
                return;
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setAddLoadingId(false)
        }
    }

    const handleOrder = async() => {
      if(cart.length === 0){
        return toast.error("Your cart is empty")
      }
      if(name.length === 0){
        return toast.error("Please enter your name")
      }
      setLoading(true)
      try {
        const response = await placeOrder(name,cart,totalPrice)
        if(response){
          toast.success(response.message)
          await deleteCart()
          navigate("/order")
        }
      } catch (error) {
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
    useEffect(() => {
        getCarts()
    },[])


    useEffect(() => {
        setCount(cart.length)
      }, [cart])
      
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItemsContainer}>
        <h2>Your cart</h2>
        {cart && cart.length > 0 ? cart.map((item) => (
          <div className={styles.cartItem} key={item._id}>
            <p>{item.storeName}</p>
            <div className={styles.cartItemDetails}>
            <div className={styles.itemName}>
            <h3>₹{item.totalPrice}</h3>
            <p>{item.name}</p>
            </div>
            </div>

            <div className={styles.cartItemQuantity}>
                <div className={styles.removeItem} onClick={() => handleRemoveItem(item._id)}>
                    <p>{removeLoadingId === item._id ? "•••" : "-"}</p>
                </div>
                <p className={styles.quantity}>{item.quantity}</p>
                <div className={styles.addItem} onClick={() => handleAddItem(item._id)}>
                    <p>{addLoadingId === item._id ? "•••" : "+"}</p>
                </div>
            </div>
          </div>
        )) : <p>Your order is empty</p>}
        <div className={styles.checkout}>
          <div className={styles.totalPrice}>
          <p>TotalPrice:</p>
          <p>₹{totalPrice}</p>
          </div>
          <div className={styles.placeOrder}>
            <div className={styles.yourName}>
                <p>Name:</p>
                <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
          <button className={styles.checkoutBtn} onClick={handleOrder}>{loading ? "Loading..." : "Place order"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
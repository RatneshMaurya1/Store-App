import React, { useEffect, useState } from 'react'
import styles from "./order.module.css"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../services'

const Order = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const response = await getOrders()
        setOrders(response)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getOrderItems()
  }, [])

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItemsContainer}>
        <h2>Your Orders</h2>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className={styles.orderBlock}>
              <h3>Order by: {order.userName}</h3>
              <p>Total: ₹{order.total}</p>
              <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
              <div className={styles.itemsList}>
                {order.items.map((item) => (
                  <div className={styles.cartItem} key={item._id}>
                    <div className={styles.cartItemDetails}>
                      <div className={styles.itemName}>
                        <p><strong>{item.name}</strong></p>
                        <p>₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <p><strong>Thank you, {order.userName}</strong></p>
              <p><strong>Your order has been placed successfully.</strong> </p>
              <button onClick={() => navigate("/")}>Go Back to Home</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  )
}

export default Order

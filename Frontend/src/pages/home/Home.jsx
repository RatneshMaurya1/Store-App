import React, { useEffect, useState } from 'react'
import styles from "./home.module.css"
import { getCartItems, stores } from '../../services'
import locationImage from "../../assets/Location.png"
import { useNavigate } from 'react-router-dom'
import { useCountContect } from '../../components/context/CountContext'
import toast from "react-hot-toast"

const Home = () => {
    const [storesData,setStoresData] = useState([])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {setCount} = useCountContect()

    useEffect(() => {
        const getStores = async () => {
            setLoading(true)
            try {
                const response = await stores()
                if(response){
                    setStoresData(response)
                    const updatedCartCount = await getCartItems()
                    setCount(updatedCartCount.itemsTotalPrice.length)
                }
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoading(false)
            }
        }
        getStores()
    },[])

    useEffect(() => {
      if(!localStorage.getItem("userId")){
        localStorage.setItem("userId",Date.now())
      }
    },[])

    useEffect(() => {
      toast(
        '⚠️ Our backend is hosted on a free Render server. It might take 20–30 seconds to wake up after being idle. Please be patient while it loads your order details.',
        {
          icon: '⏳',
          duration: 7000,
          style: {
            borderRadius: '10px',
            background: '#fff4e5',
            color: '#663c00',
            border: '1px solid #ffecb5',
            fontSize: '14px',
          },
        }
      );
    }, []);
    
    return (
        <div className={styles.homeContainer}>
      
          <div className={styles.itemsWrapper}>
            <h2>Hyperlocal Stores </h2>
            <div className={styles.itemsContainer}>
              {loading ? (
                <div className={styles.loaderContainer}>
                <div className={styles.loader}>Loading...</div>
                </div>
              ) : storesData.length > 0 ? (
                storesData.map((item) => (
                  <div className={styles.item} key={item._id} onClick={() => {navigate(`/product/${item._id}`),localStorage.setItem("storeName",item.name)}}
                  >
                    <h3>{item.name}</h3>
                    <p><img src={locationImage} alt="location-image" />{item.location}</p>
                  </div>
                ))
              ) : (
                <p>No item found</p>
              )}
            </div>
          </div>
        </div>
      );
}

export default Home

import React, { useEffect, useState } from "react";
import styles from "./products.module.css";
import { addItem, getCartItems, storeProducts } from "../../services";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCountContect } from "../../components/context/CountContext";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addItemId, setAddItemId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setCount } = useCountContect();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await storeProducts(id);
        if (response) {
          setProductsData(response);
          const updatedCart = await getCartItems();
          setCount(updatedCart.itemsTotalPrice.length);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleAddItem = async (productId) => {
    setAddItemId(productId);
    try {
      const response = await addItem(productId);
      if (response) {
        toast.success("Item added to cart.");
        const updatedCart = await getCartItems();
        setCount(updatedCart.itemsTotalPrice.length);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setAddItemId(null)
    }
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.itemsWrapper}>
        <h2>{localStorage.getItem("storeName")} Store </h2>
        <div className={styles.itemsContainer}>
          {loading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}>Loading...</div>
            </div>
          ) : productsData.length > 0 ? (
            productsData.map((item) => (
              <div className={styles.item} key={item._id}>
                <div className={styles.nameAndPrice}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddItem(item._id)}
                >
                  {addItemId === item._id ? "Loading..." : "Add to Cart"}
                </button>
              </div>
            ))
          ) : (
            <p>No item found</p>
          )}
        </div>
        <div className={styles.cart} onClick={() => navigate("/cart")}>
        <button >View cart</button>
        </div>
      </div>
    </div>
  );
};

export default Products;

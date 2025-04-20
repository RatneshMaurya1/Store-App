import React from "react";
import styles from "./navbar.module.css";
import cartImage from "../../assets/Basket.png";
import { useNavigate } from "react-router-dom";
import { useCountContect } from "../context/CountContext";

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const { count } = useCountContect()
  
  return (
    <div className={styles.navbarContainer}>
      <p onClick={() => navigate("/")}>Home</p>
      <p onClick={() => navigate("/order")}>My order</p>
      <div className={styles.cart}>
        <img
          onClick={() => navigate("/cart")}
          src={cartImage}
          alt="cart-image"
        />
        <p onClick={() => navigate("/cart")}>{count}</p>
      </div>
    </div>
  );
};

export default Navbar;

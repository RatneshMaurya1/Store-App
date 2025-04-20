const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const stores = async (userId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/stores`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };

export const storeProducts = async (storeId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products/${storeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };

export const addItem = async (productId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId:localStorage.getItem("userId"),productId})
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };
  
  export const getCartItems = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };

  export const updateQuantity = async (productId,action) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId:localStorage.getItem("userId"),productId,action})
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };

  export const placeOrder = async (userName,items,total) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId:localStorage.getItem("userId"),userName,items,total})
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };
  

  export const getOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };

  export const deleteCart = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/delete/cart/${localStorage.getItem("userId")}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };
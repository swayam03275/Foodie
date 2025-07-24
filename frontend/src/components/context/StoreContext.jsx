import { createContext, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import toast from "react-hot-toast";
export const StoreContext = createContext(null);

const StoreContextProvider = props => {
  const [cartItems, setCartItems] = useState({});
  const addToCart = itemId => {
    setCartItems(prev => {
      const isFirstTime = !prev[itemId];
      const updated = {
        ...prev,
        [itemId]: isFirstTime ? 1 : prev[itemId] + 1,
      };

      if (isFirstTime) {
        toast.success("item added to cart!");
      } else {
        toast("item quantity increased", {
          icon: "🛒",
        });
      }

      return updated;
    });
  };
  const removeFromCart = itemId => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast.error("item removed from cart!");
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find(el => el._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  };
  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;

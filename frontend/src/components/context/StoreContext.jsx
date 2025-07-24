import { createContext, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import { toast } from 'react-hot-toast';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        const isFirstTime = !cartItems[itemId];
        setCartItems((prev) => ({
            ...prev,
            [itemId]: isFirstTime ? 1 : prev[itemId] + 1,
        }));
        if (isFirstTime) {
            toast.success("Item added to cart!");
        } else {
            toast("Item quantity increased", {
                icon: "🛒",
            });
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        toast.error("Item removed from cart!");
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((el) => el._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
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
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

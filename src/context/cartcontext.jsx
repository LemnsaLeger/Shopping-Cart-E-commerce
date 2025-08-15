import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    //  adding product to localstorage
    useEffect(() => {
         if (!cartItems || cartItems.length === 0) return;
        let cartData = {} ;
        cartItems.forEach(item => {
            cartData[item.name] = item;
        });
        localStorage.setItem("cart", JSON.stringify(cartData));
    },[cartItems]);

    // loading logic
    useEffect(() => {
        const data = localStorage.getItem("cart");
        if(data) {
            const parsed = JSON.parse(data);
            const items = Object.values(parsed); // to array
            setCartItems(items);
        }
    },[]);

    // add to cart
    const addToCart = (product, qty = 0) => {
        if(!qty && qty < 1) return;


        setCartItems((prev) => {
            const existing = prev.find((item) => item.name === product.name);

            if(existing) {
                return prev.map((item) => item.name === product.name ? {...item, quantity: item.quantity + qty} : item
            );
            }
            return [...prev, {...product, quantity: qty}];
        });
        setShowSuccess(true);
    };

    // remove from card
    const removeFromCart = (name) => {
        setCartItems((prev) => prev.filter((item) => item.name !== name))
    };

    // counting cart items
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, cartCount, showSuccess, setShowSuccess}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
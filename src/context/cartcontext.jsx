import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // add to cart
    const addToCart = (product, qty = 0) => {
        if(!qty && qty < 1) return;

        
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if(existing) {
                return prev.map((item) => item.id === product.id ? {...item, quantity: item.quantity + qty} : item
            );
            }

            return [...prev, {...product, quantity: qty}];
        });
    };

    // remove from card
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    };

    // counting cart items
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, cartCount}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
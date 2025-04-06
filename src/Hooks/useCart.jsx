import { useState, useEffect } from 'react';

const CART_KEY = 'cart';

function useCart() {
    const [cart, setCart] = useState({});

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);




    // Sync cart with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);





    // Add or increment a product
    const addToCart = (productId) => {
        setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };




    // Decrease quantity or remove if zero
    const decreaseQuantity = (productId) => {
        setCart(prev => {
            if (!prev[productId]) return prev;

            const updated = { ...prev };
            updated[productId] -= 1;
            if (updated[productId] <= 0) {
                delete updated[productId];
            }
            return updated;
        });
    };




    // Remove product completely
    const removeFromCart = (productId) => {
        setCart(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    // Clear the entire cart
    // const clearCart = () => {
    //     setCart({});
    // };

    return {
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        // clearCart
    };
}

export default useCart;
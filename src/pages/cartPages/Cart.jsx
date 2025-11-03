import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../../features/cartSlice.js';

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const handleQuantityChange = (id, delta) => {
        // Dispatch action to update quantity
        const item = cartItems.find(p => p.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.quantity + delta);
        dispatch(updateQuantity({ id, quantity: newQty }));
    };
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={item.thumbnail} alt={item.title} style={{ width: '60px', borderRadius: '8px' }} />
                                <div className="flex-grow-1 mx-3">
                                    <h6>{item.title}</h6>
                                    <h5 className="mb-1 text-muted">Total: ${item.price * item.quantity}</h5>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-warning mt-3" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </>

            )}
        </div>
    );
}

export default Cart;
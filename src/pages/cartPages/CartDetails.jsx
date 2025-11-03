import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../../features/cartSlice.js';
function CartDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const item = cartItems.find(p => p.id === parseInt(id));
    const [tempQuantity, setTempQuantity] = useState(1);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (item) {
            setTempQuantity(item.quantity);
        }
    }, [item]);

    const handleQuantityChange = (delta) => {
        // Dispatch action to update quantity
        if (!item) return;
        const newQty = Math.max(1, tempQuantity + delta);
        setTempQuantity(newQty);
    };

    const handleUpdateQuantity = () => {
        dispatch(updateQuantity({ id: item.id, quantity: tempQuantity }));
        setMessage('Quantity updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };
    if (!item) {
        return <div className="container mt-5 pt-5">
            <h2 className="mb-4">Item not found in cart.</h2>
        </div>
    }
    return (
        <>
            {message && (
                <div className="cart-toast alert alert-success text-center">
                    {message}
                </div>
            )}
        <div className="container mt-5 pt-5">
            <h2 className="mb-4">Cart Item Details</h2>
            <div className="card shadow-sm p-3" style={{ backgroundColor: '#f3f6f4' }}>
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="img-fluid rounded border"
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <h4>{item.title}</h4>
                        <p className="text-muted">{item.description}</p>
                        <p className="fw-bold text-success">Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(-1)}>-</button>
                            <span className="mx-2">{tempQuantity}</span>
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        <button className="btn btn-primary" onClick={handleUpdateQuantity}>Update Cart</button>
                        <p className="mt-3">Total: ${item.price * tempQuantity}</p>
                </div>
            </div>
        </div>
        </div >
        </>
    );
}

export default CartDetails;
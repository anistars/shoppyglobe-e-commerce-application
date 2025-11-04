import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../../features/cartSlice.js';
import { useState } from 'react';
import "../../index.css";

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const validateForm = () => {
        const newErrors = {};
        if (!customer.name) newErrors.name = "Name is required";
        if (!customer.email) newErrors.email = "Email is required";
        if (!customer.phone.trim() || !/^\d{10}$/.test(customer.phone)) newErrors.phone = 'Valid 10-digit phone required';
        if (!customer.address) newErrors.address = "Address is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handlePlaceOrder = () => {
        if (validateForm()) {
            const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalAmount(totalAmount);
            setOrderPlaced(true);
            setShowForm(false);
            dispatch(clearCart());
        }
    };
    return (
        <div className="container mt-5 pt-5">
            {message && <div className="cart-toast alert alert-success text-center">{message}</div>}
            {showForm && (
                <div className="modal-backdrop">
                    <div className="modal-content p-4 rounded shadow">
                        <h4 className="mb-3">Enter Customer Details</h4>
                        <div className="mb-3">
                            <label className="form-label text-light">Name:</label>
                            <input type="text" className="form-control" id="name"
                                value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light">Email:</label>
                            <input type="email" className="form-control" id="email"
                                value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light">Phone:</label>
                            <input type="tel" className="form-control" id="phone"
                                value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                        </div>
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                        <div className="mb-3">
                            <label className="form-label text-light">Address:</label>
                            <input type="text" className="form-control" id="address"
                                value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                        </div>
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={handlePlaceOrder}>Confirm Order</button>
                        <button type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {orderPlaced && (
                <div className="alert alert-success" role="alert">
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                    <p><strong>Total:</strong> ${totalAmount.toFixed(2)}</p>
                    <p>Order placed successfully!</p>
                </div>
            )}
            <h2 className="mb-4">Shopping Cart</h2>
            <div>
                <button
                    className="btn btn-warning me-2"
                    onClick={() => dispatch(clearCart())}
                >
                    Clear Cart
                </button>
                <button
                    className="btn btn-success"
                    onClick={() => {
                        if (cartItems.length === 0) {
                            setMessage('Cart is empty. Add items before placing an order.');
                            setTimeout(() => setMessage(''), 3000);
                            return;
                        }
                        setShowForm(true)
                    }}
                >
                    Place Order
                </button>
            </div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={item.thumbnail} alt={item.title} style={{ width: '200px', borderRadius: '8px' }} />
                                <div className="flex-grow-1 mx-3">
                                    <h6>{item.title}</h6>
                                    <h6>Quantity: {item.quantity}</h6>
                                    <h5 className="mb-1 text-muted">Total: ${item.price * item.quantity}</h5>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                    <button className="btn btn-danger btn-sm mt-2" onClick={() => navigate(`/cart-details/${item.id}`)}>View Details</button>
                                </div>

                            </li>
                        ))}
                    </ul>
                </>

            )}
        </div>
    );
}

export default Cart;
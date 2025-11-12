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
    if (!customer.phone.trim() || !/^\d{10}$/.test(customer.phone))
      newErrors.phone = 'Valid 10-digit phone required';
    if (!customer.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(totalAmount);
      setOrderPlaced(true);
      setShowForm(false);
      dispatch(clearCart());
      setMessage("✅ Order placed successfully!");
      setTimeout(() => setMessage(""), 3500);
    }
  };

  return (
    <div className="container mt-5 pt-5 cart-page">
      {/* Toast message */}
      {message && <div className="fixed-toast">{message}</div>}

      {/* Customer form modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4 className="mb-3 text-center neon-text">Enter Customer Details</h4>
            <div className="form-group mb-3">
              <label>Name:</label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="form-control"
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="form-control"
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-group mb-3">
              <label>Phone:</label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="form-control"
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
            <div className="form-group mb-3">
              <label>Address:</label>
              <input
                type="text"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className="form-control"
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Confirm Order
              </button>
              <button className="btn btn-outline-light" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order success summary */}
      {orderPlaced && (
        <div className="order-summary card p-4 mb-4">
          <h4 className="neon-text mb-3">Order Summary</h4>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Total:</strong> ${totalAmount.toFixed(2)}</p>
        </div>
      )}

      {/* Header Buttons */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 className="mb-0 neon-text">🛒 Shopping Cart</h2>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-danger" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              if (cartItems.length === 0) {
                setMessage("⚠️ Cart is empty. Add items before placing an order.");
                setTimeout(() => setMessage(""), 3000);
                return;
              }
              setShowForm(true);
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-light text-center opacity-75">Your cart is empty.</p>
      ) : (
        <>
          {/* 🧮 Total Cost Section */}
          <div className="total-cost-box text-center my-4">
            <h4 className="neon-text">
              Total Cost: $
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </h4>
          </div>

          {/* Cart Items */}
          <div className="row g-4 justify-content-center">
            {cartItems.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="cart-item-card card h-100 p-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-img mb-3"
                  />
                  <h5 className="neon-text text-center">{item.title}</h5>
                  <p className="text-center mb-1">Quantity: {item.quantity}</p>
                  <p className="text-center text-muted">
                    Total: ${item.price * item.quantity}
                  </p>
                  <div className="d-flex justify-content-between mt-auto">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => navigate(`/cart-details/${item.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
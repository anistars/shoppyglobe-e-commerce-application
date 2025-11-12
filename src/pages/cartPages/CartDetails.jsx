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
    if (item) setTempQuantity(item.quantity);
  }, [item]);

  const handleQuantityChange = (delta) => {
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
    return (
      <div className="container mt-5 pt-5 text-center text-light">
        <h2 className="neon-text">Item not found in cart.</h2>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className="fixed-toast">{message}</div>
      )}

      <div className="container mt-5 pt-5 d-flex justify-content-center">
        <div className="cart-details-card p-4 rounded-4 shadow-lg">
          <div className="row align-items-center g-4">
            <div className="col-md-5 text-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="img-fluid rounded-4 border border-cyan shadow"
                style={{
                  maxHeight: '300px',
                  objectFit: 'cover',
                  backgroundColor: '#0f0f0f'
                }}
              />
            </div>

            <div className="col-md-7 text-light">
              <h3 className="fw-bold mb-2 neon-text">{item.title}</h3>
              <p className="text-secondary small mb-3">{item.description}</p>
              <h5 className="text-cyan fw-semibold mb-4">
                Price: ${item.price}
              </h5>

              <div className="d-flex justify-content-center align-items-center mb-3 gap-2">
                <button className="btn btn-outline-cyan btn-sm" onClick={() => handleQuantityChange(-1)}>-</button>
                <span className="quantity-display">{tempQuantity}</span>
                <button className="btn btn-outline-cyan btn-sm" onClick={() => handleQuantityChange(1)}>+</button>
              </div>

              <div className="text-center">
                <button className="btn btn-cyan px-4 py-2" onClick={handleUpdateQuantity}>
                  Update Cart
                </button>
                <p className="mt-3 text-cyan fw-bold">
                  Total: ${(item.price * tempQuantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartDetails;
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../../features/cartSlice.js';

function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                    <button className="btn btn-warning mt-3" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </>

            )}
        </div>
    );
}

export default Cart;
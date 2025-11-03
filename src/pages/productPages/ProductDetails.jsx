import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice.js';
import '../../index.css';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cartCounts, setCartCounts] = useState(0);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);
    if (!product) {
        return <p className="mt-5 pt-5 text-center">Loading product details...</p>;
    }
    const handleQuantityChange = (delta) => {
        setCartCounts(prevCounts => Math.max(0, prevCounts + delta));
    };

    const handleAddToCart = () => {
        if (cartCounts <= 0) {
            setMessage('Please select a quantity to add to cart.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        dispatch(addToCart({ ...product, quantity: cartCounts }));
        setMessage(`✅ Added ${cartCounts} of "${product.title}" to cart`);
        setTimeout(() => setMessage(''), 3000);


    }
    return (
        <div className="container mt-5 pt-5">
            {message && (
                <div className="cart-toast alert alert-success text-center">
                    {message}
                </div>
            )}
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm p-3" style={{ backgroundColor: '#f3f6f4' }}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="img-fluid rounded border"
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                        <div className="mt-3 text-center">
                            <h4>{product.title}</h4>
                            <p className="fw-bold text-success fs-5">Price: ${product.price}</p>
                        </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Description</h4>
                    <p className="text-muted">{product.description}</p>
                    <h5>🗣️ Customer Reviews</h5>
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <strong>{review.reviewerName}</strong>
                                    <p className="mb-1 text-center">{review.comment}</p>
                                    <span className="badge bg-warning text-dark">⭐ {review.rating}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available for this product.</p>
                    )}
                    <div className="d-flex justify-content-center align-items-center my-3">
                        <button className="btn btn-outline-secondary btn-sm"
                            onClick={(e) => { handleQuantityChange(-1) }}
                            disabled={cartCounts <= 0}
                        ><i className="bi bi-dash-circle"></i></button>
                        <span className="mx-3 fs-5">{cartCounts}</span>
                        <button className="btn btn-outline-secondary btn-sm"
                            onClick={(e) => { handleQuantityChange(1) }}
                        ><i className="bi bi-plus-circle"></i></button>
                    </div>
                    <button className="btn btn-primary mx-auto"
                        onClick={handleAddToCart}
                    >
                        Add to Cart ({cartCounts})

                    </button>
                </div>
            </div>
            <button className="btn btn-secondary mt-4" onClick={() => window.history.back()}>← Back to Products</button>
        </div>
    );
}

export default ProductDetails;
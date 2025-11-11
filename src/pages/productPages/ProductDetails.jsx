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
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <p className="loading-text">Loading product details...</p>;
  }

  const handleQuantityChange = (delta) => {
    setCartCounts((prev) => Math.max(0, prev + delta));
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
  };

  return (
    <div className="product-details-container container mt-5 pt-5">
      {message && <div className="cart-toast fixed-toast">{message}</div>}

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid product-img"
            />
            <div className="mt-3 text-center">
              <h4 className="product-title">{product.title}</h4>
              <p className="product-price">Price: ${product.price}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4 className="section-title">Description</h4>
          <p className="product-description">{product.description}</p>

          <h5 className="section-title">🗣️ Customer Reviews</h5>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <strong>{review.reviewerName}</strong>
                <p>{review.comment}</p>
                <span className="review-rating">⭐ {review.rating}</span>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews available.</p>
          )}

          <div className="quantity-controls my-3">
            <button
              className="qty-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={cartCounts <= 0}
            >
              <i className="bi bi-dash-circle"></i>
            </button>
            <span className="quantity-count">{cartCounts}</span>
            <button className="qty-btn" onClick={() => handleQuantityChange(1)}>
              <i className="bi bi-plus-circle"></i>
            </button>
          </div>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart ({cartCounts})
          </button>
        </div>
      </div>

      <button className="back-btn mt-4" onClick={() => window.history.back()}>
        ← Back to Products
      </button>
    </div>
  );
}

export default ProductDetails;
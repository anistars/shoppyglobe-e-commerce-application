import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="product-list-container container mt-5 pt-5">
      <h2 className="product-list-title">🛍️ Product List</h2>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <div className="row">
          {products.products && products.products.length > 0 ? (
            products.products.map((product) => (
              <div
                className="col-md-4 mb-4"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="card product-card h-100">
                  <div className="image-container">
                    <img
                      src={product.thumbnail}
                      className="card-img-top product-image"
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title line-clamp-1">{product.title}</h5>
                    <p className="card-text line-clamp-2">{product.description}</p>
                    <p className="product-price">💲{product.price}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
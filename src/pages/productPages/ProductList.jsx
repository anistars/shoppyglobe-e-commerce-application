import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../index.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4">Product List</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="row">
                    {products.products && products.products.length > 0 ? (
                        products.products.map(product => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card h-100 product-card shadow-sm" style={{ backgroundColor: "#f3f6f4", cursor: "pointer" }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <img
                                        src={product.thumbnail}
                                        className="card-img-top product-image"
                                        alt={product.title}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between text-center">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text line-clamp">{product.description}</p>
                                        <p className="card-text fw-bold text-success">Price: ${product.price}</p>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductList;
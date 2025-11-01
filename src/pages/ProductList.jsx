import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartCounts, setCartCounts] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                const intialQuantitys = {};
                data.products.forEach(product => {
                    intialQuantitys[product.id] = 0;
                });
                setCartCounts(intialQuantitys);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleQuantityChange = (productId, delta) => {
        setCartCounts(prevCounts => ({
            ...prevCounts,
            [productId]: Math.max(1, (prevCounts[productId] || 0) + delta)
        }));
    };
    const handleAddToCart = (productId) => {
        const quantity = cartCounts[productId] || 0;
        const productTitle = products.products.find(p => p.id === productId)?.title || 'Product';
        if (quantity === 0) {
            setMessage(`⚠️ Please select at least 1 item of "${productTitle}" to add to cart`);
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        setMessage(`✅ Added ${quantity} of "${productTitle}" to cart`);
        setTimeout(() => setMessage(''), 3000);

    }
    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4">Product List</h2>
            <div className="position-relative">
                {message && (
                    <div className="floating-message alert alert-success text-center">
                        {message}
                    </div>
                )}
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="row">
                    {products.products && products.products.length > 0 ? (
                        products.products.map(product => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card h-100 product-card shadow-sm" style={{ backgroundColor: "#f3f6f4", cursor: "pointer"}}
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
                                        <div className="d-flex justify-content-center align-items-center my-3">
                                            <button className="btn btn-outline-secondary btn-sm"
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                disabled={cartCounts[product.id] <= 1}
                                            ><i className="bi bi-dash-circle"></i></button>
                                            <span className="mx-3 fs-5">{cartCounts[product.id] || 0}</span>
                                            <button className="btn btn-outline-secondary btn-sm"
                                                onClick={() => handleQuantityChange(product.id, 1)}
                                            ><i className="bi bi-plus-circle"></i></button>
                                        </div>

                                        <button className="btn btn-primary mx-auto"
                                            onClick={() => handleAddToCart(product.id)}
                                        >
                                            Add to Cart ({cartCounts[product.id] || 0})

                                        </button>

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
import { useEffect, useState } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="container mt-4">
            <h2 className="mb-4">Product List</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="row">
                    {products.products && products.products.length > 0 ? (
                        products.products.map(product => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card h-100">
                                    <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">Price: ${product.price}</p>
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
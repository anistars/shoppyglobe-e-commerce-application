import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);
    if (!product) {
        return <p className="mt-5 pt-5 text-center">Loading product details...</p>;
    }
    return (
        <div className="container mt-5 pt-5">
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
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
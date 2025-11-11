function NotFound() {
    return (
        <div className="container mt-5 pt-5 text-center">
            <h1 className="display-4 text-danger">404</h1>
            <p className="lead">Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="btn btn-primary">Go Back Home</a>
        </div>

    );
}

export default NotFound;
import { Link } from "react-router-dom";
import "../../index.css";

function NotFound() {
  return (
    <div className="not-found-page d-flex flex-column justify-content-center align-items-center text-center">
      <div className="glow-circle mb-4">
        <h1 className="display-1 fw-bold text-cyan">404</h1>
      </div>
      <h3 className="mb-3 text-light">Oops! Page Not Found</h3>
      <p className="mb-4">
        The page you're trying to reach doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-glow">
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default NotFound;

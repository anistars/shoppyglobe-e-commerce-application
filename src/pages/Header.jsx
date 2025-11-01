function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100"
            style={{ backgroundColor: '#4b1a0a' }}>
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="#">
                        ShoppyGlobe
                    </a>
                    <div className="d-flex ms-auto">
                        <button className="btn btn-info" type="button">
                            <i className="bi bi-cart"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;
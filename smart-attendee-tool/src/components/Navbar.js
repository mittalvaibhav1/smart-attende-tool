const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className="navbar_logo">
                <img src="./cgc-landran-logo.jpg" alt=""/>
            </div>
            <span className="navbar_text">CGC Landran</span>
            <div className="nav_items">
                <a href="/about">About</a>
                <a href="/contactus">Contact us</a>
                <a href="/login">Login</a>
            </div>
        </div>
    );
}

export default Navbar;
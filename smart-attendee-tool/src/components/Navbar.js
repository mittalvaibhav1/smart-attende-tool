import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';

const Navbar = () => {

    const handleClick = (e) => {
        e.preventDefault();
            store.addNotification({
                title: "Under Maintenance 🔨🔨",
                message: "This feature is still under development, Please comeback later.",
                type: "warning",
                insert: "top",
                container: "top-right", 
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
    }

    return ( 
        <>
            <div className="navbar">
                <div className="navbar_logo">
                    <img src="./cgc-landran-logo.jpg" alt=""/>
                </div>
                <span className="navbar_text">CGC Landran</span>
                <div className="nav_items">
                    <a onClick = {handleClick} href="/about">About</a>
                    <a onClick = {handleClick} href="/contactus">Contact us</a>
                    <a href="/login">Login</a>
                </div>
            </div>
            <ReactNotification/>
        </>
    );
}

export default Navbar;
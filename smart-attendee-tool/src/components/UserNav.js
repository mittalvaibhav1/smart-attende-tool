import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';

const UserNav = () => {
    const { user } = useContext(UserContext);

    const handleClick = (e) => {
        if(e.target.tagName === "A") {
            e.preventDefault();
            store.addNotification({
                title: "Under Maintenance 🔨🔨",
                message: "This feature is still under development, Please comeback later.",
                type: "warning",
                insert: "top",
                container: "top-right", 
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            
        }
    }
    return (  
        <div className="user_nav">
            <ReactNotification />
            <div onClick = {handleClick} className="nav_links">
                <a href="/Home"> Home </a>
                <a href="/Reports"> Reports </a>
                <a href="/Classroom"> Classroom </a>
            </div>
            <div className="nav_user">
                <img src={user.photoURL} alt=""/>
                <span>{user.displayName} <span>&#x25BC;</span></span>
            </div>
        </div>
    );
}

export default UserNav;
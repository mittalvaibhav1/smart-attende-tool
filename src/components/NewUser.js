import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ImageUpload from "./Imageupload";

const NewUser = () => {
    const { user } = useContext(UserContext);
    return (  
        <div className="newuser">
            <div className="newuser_img">
                <img src= {user.photoURL} alt="userimage"/>
            </div>
            <div className="newuser_body">
                <h1>Welcome, {user.displayName}.</h1>
                <p>Please, upload a good well-lit picture of yourself, where your face is clearly visible.</p>
                <p>Note: Image size should be below <span>150KB.</span></p>
                <ImageUpload user = {user} />
            </div>
        </div>
    );
}

export default NewUser;
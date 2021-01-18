import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Loader from 'react-loader-spinner';


const Success = () => {
    const { user } = useContext(UserContext);
    return (  
        <div className="success">
            <h1>Hey! { user.displayName }, your attendance has been marked successfully.</h1>
            <Loader type="Rings" color="white" height={120} width={120} />
        </div>
    );
}

export default Success;
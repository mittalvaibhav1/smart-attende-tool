import { createContext, useState } from 'react';

export const UserContext = createContext();
let user = sessionStorage.getItem('user');
let session_user = user ? JSON.parse(user) : null;

const UserContextProvider = (props) => {
    const[user, setUser] = useState(session_user);
    
    return (  
        <UserContext.Provider value = {{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
import { UserContext } from "../contexts/UserContext";
import { auth, google_provider } from "../firebase";
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../firebase';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    async function checkUser(email) {
        db.collection('users')
        .where('email','==', email)
        .get()
        .then((snapshot) => {
            if(!snapshot.docs.length) {
                history.push('/login/new');
            }
            else {
                history.push('/Home');
            }
        })

    }

    const google_signIn = () => {
        auth.signInWithPopup(google_provider)
        .then(result => {
            setUser(result.user);
            sessionStorage.setItem('user',JSON.stringify(result.user));
            checkUser(result.user.email);
        })
        .catch(err => console.log(err.message));
    }
    return (  
        <div className="login">
            <div className="login_body">
                <div className="login_body_content">
                    <div className="login_logo">
                        <img src="./face-recognition.png" alt=""/>
                    </div>
                    <h2>Sign In</h2>
                    <div className="login_button" onClick = { google_signIn }>
                        <div className="login_button_img">
                            <img src="./google.png" alt=""/>
                        </div>
                        <div className="login_button_text">
                            <span>Sign in with Google</span>
                        </div>
                    </div>
                    <div className="login_button">
                        <div className="login_button_img">
                            <img src="./twitter.png" alt=""/>
                        </div>
                        <div className="login_button_text">
                            <span>Sign in with Twitter</span>
                        </div>
                    </div>
                    <div className="login_button">
                        <div className="login_button_img">
                            <img src="./github.png" alt=""/>
                        </div>
                        <div className="login_button_text">
                            <span>Sign in with Github</span>
                        </div>
                    </div>
                </div>
                <div className="login_body_svg">
                    <img src="./login_illus.jpg" alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Login;
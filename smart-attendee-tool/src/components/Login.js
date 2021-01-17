const Login = () => {
    return (  
        <div className="login">
            <div className="login_body">
                <div className="login_body_content">
                    <div className="login_logo">
                        <img src="./cgc-landran-logo.jpg" alt=""/>
                    </div>
                    <h2>Sign In</h2>
                    <div className="login_button">
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
import Hero from "./Hero";
import Navbar from "./Navbar";
import Services from "./Services";
import Footer from "./Footer";

const Landing = () => {
    return (  
        <div className="landing">
            <Navbar/>
            <Hero/>
            <Services />
            <Footer />
        </div>
    );
}

export default Landing;
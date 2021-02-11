const Hero = () => {
    const handleStart = () => {
        window.scrollTo({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (  
        <div className="hero">
            <div className="hero_text">
                <h1 className="hero_heading">
                    Smart Attendee
                    <span>
                        Supervision Tool
                    </span>
                </h1>
                <p>
                    The Smart Attendee Supervision Tool provides the facility of
                    automatically determining the presence or absence of the student
                    in an online class/session using facial ecoginition technology with
                    the help of machine learning and deep algorithms.
                </p>
                <div className="hero_buttons">
                    <div onClick = {handleStart} className="start">Start</div>
                    <div className="watch">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="playIcon"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>   
                        <span>Watch More</span>
                    </div>
                </div>
            </div>
            <div className="hero_image">
                <img src="face-recoginition.jpg" alt=""/>
            </div>
        </div>
    );
}

export default Hero;
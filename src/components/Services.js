const Services = () => {
    return (  
        <div className="services">
            <div className="services_heading">
                <h1>Amazing <span>Services</span></h1>
            </div>
            <div className="services_items">
                <div className="services_item_">
                    <div className="item_image">
                        <img src="./service1.png" alt=""/>
                    </div>
                    <div className="item_content">
                        <h3>Mark Attendance</h3>
                        <p>Click the link below to mark your attendance</p>
                        <span>Mark Now →</span>
                    </div>
                </div>
                <div className="services_item_">
                    <div className="item_image">
                        <img src="./service2.png" alt=""/>
                    </div>
                    <div className="item_content">
                        <h3>View Attendance</h3>
                        <p>CLick the link below to view your attendance</p>
                        <span>View Now →</span>
                    </div>
                </div>
                <div className="services_item_">
                    <div className="item_image">
                        <img src="./service3.png" alt=""/>
                    </div>
                    <div className="item_content">
                        <h3>Personalized Attendance Report</h3>
                        <p>Click the link below to generate your report</p>
                        <span>Create Now →</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
import Videocam from "./Videocam";

const Attendance = ({ attendance , setAttendance , videoStream, setVideoStream }) => {
    return (  
        <div className="attendance">
                <div className="attendance_heading">
                    <h1>Please stay still in front of the camera to mark your attendance</h1>
                </div>
                <Videocam 
                    attendance = { attendance } 
                    setAttendance = { setAttendance } 
                    videoStream = { videoStream }
                    setVideoStream = { setVideoStream }
                />
        </div>
    );
}

export default Attendance;
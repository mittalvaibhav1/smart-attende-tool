import UserNav from "./UserNav"
import { useState, useEffect } from 'react';
import Attendance from "./Attendance";
import Success from './Success';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';

const MarkAttendace = () => {
    const [attendance, setAttendance] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    
    function stopVideoOnly(stream) {
        stream.getTracks().forEach(function(track) {
            if (track.readyState === 'live' && track.kind === 'video') {
                track.stop();
            }
        });
    }

    useEffect(() => {
        if(videoStream) stopVideoOnly(videoStream);
    }, [attendance]);

    useEffect(() => {
        if(attendance) {
            store.addNotification({
                title: "Wonderful!",
                message: "Attendance Marked Successfully!",
                type: "success",
                insert: "top",
                container: "top-right", 
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        }
    },[attendance]);

    return (  
        <div className="mark_attendance">
            <UserNav />
            { attendance && <ReactNotification />}
            {!attendance && <Attendance 
                attendance = { attendance } 
                setAttendance = { setAttendance } 
                videoStream = { videoStream }
                setVideoStream = { setVideoStream }
            />}
            {attendance && <Success />}
        </div>
    );
}

export default MarkAttendace;
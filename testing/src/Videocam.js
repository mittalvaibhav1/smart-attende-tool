import { useEffect, useRef, useState} from 'react';

const Videocam = () => {
    const videoRef = useRef(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream
            })
            .catch(err => {
                console.log(err.message);
            })
        console.log(videoRef);
    },[]);
    return (
        <div style={{position: "relative"}} className="margin">
            <video ref = {videoRef} autoPlay ={true}  muted></video>
        </div>
    );
}


export default Videocam;
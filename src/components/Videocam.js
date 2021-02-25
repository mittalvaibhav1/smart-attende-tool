import { useContext, useEffect, useRef, useState} from 'react';
import * as faceapi from 'face-api.js';
import Loader from 'react-loader-spinner';
import db from '../firebase';
import { UserContext } from '../contexts/UserContext';
import firebase from 'firebase'

const Videocam = ({setAttendance, setVideoStream }) => {
    const videoRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    let convertedReference = null;
    let docid = null;
    let attendanceData = [];

    async function load_image_data() {
        return new Promise((resolve, reject) => {
            db.collection('users')
            .where('email','==',user.email)
            .get()
            .then(snapshot => {
                snapshot.docs.forEach((doc) => {
                    docid = doc.id;
                    attendanceData = doc.data().attendance ? doc.data().attendance : [];
                    convertedReference = JSON.parse(doc.data().imgData);
                    resolve(convertedReference);
                })
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            })
        })
    }

    async function load_models() {
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.mtcnn.loadFromUri('/models');
        return Promise.resolve();
    }

    async function mark_attendance() {
        const mtcnnParams = {
            minFaceSize: 200
        }
        let marked = false;
        const options = new faceapi.MtcnnOptions(mtcnnParams);
        const input = document.getElementById('inputVideo');
        let fullFaceDescriptions = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors();

        await load_image_data();

        convertedReference[0].descriptors[0] = Float32Array.from(convertedReference[0].descriptors[0]);
        let labeledDescriptors = [new faceapi.LabeledFaceDescriptors(convertedReference[0].label, [convertedReference[0].descriptors[0]])];
        if(labeledDescriptors) {
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors[0], 0.5);
            const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor));
            results.forEach((bestMatch, i) => {
                const text = bestMatch.toString();
                console.log(text);
                if(text && text.split(' ')[0] !== 'unknown' ) {
                    marked = true;
                    const now = new Date();
                    db.collection('users')
                    .doc(docid)
                    .update(
                        {
                            attendance : [
                                ...attendanceData,
                                {
                                    present: true,
                                    time : firebase.firestore.Timestamp.fromDate(now)
                                }
                            ]
                        }
                    )
                    .then(() => {
                        setAttendance(true);
                        })
                    .catch((err) => {
                        console.log(err.message);
                    })
                        
                }
            });
        }
        if(!marked) {
            console.log ('nope');
            setTimeout(mark_attendance);
        }
    }

    useEffect(async () => {    
        await load_models(setLoading);
        setLoading(false);
    },[setLoading]);

    useEffect(() => {
        if(!loading && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setVideoStream(stream);
                videoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.log(err.message);
            });
        }
    },[loading,videoRef,setVideoStream]);

    return (
        <div className="videocam">
            {loading && <Loader type="Circles" color="white" height={80} width={80}/> }
            { !loading && <video  id = "inputVideo" ref = {videoRef} onPlay = { mark_attendance } autoPlay ={true}  muted></video> } 
        </div>
    );
}

export default Videocam;
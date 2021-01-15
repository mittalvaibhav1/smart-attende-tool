import { useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';
import { MtcnnOptions } from 'face-api.js';

let reference =  null;
async function run() {
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.mtcnn.loadFromUri('/models');
    referenceData();
}
async function referenceData() {
    const imgUrl = `Vaibhav Mittal.jpg`
    console.log("Image aagiiii");
    const img = await faceapi.fetchImage(imgUrl);
    const fullFaceDescription = await faceapi.detectSingleFace(img, new MtcnnOptions()).withFaceLandmarks().withFaceDescriptor();
    
    if (!fullFaceDescription) {
        throw new Error(`no faces detected for ${"Vaibhav Mittal"}`);
    }
    
    const faceDescriptors = [fullFaceDescription.descriptor]
    reference = [new faceapi.LabeledFaceDescriptors("Vaibhav Mittal", faceDescriptors)];
    console.log(reference, "Hiii");
}
async function playFunc() {
    const mtcnnParams = {
        minFaceSize: 200
    }
    const canvas = document.getElementById('overlay');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const options = new faceapi.MtcnnOptions(mtcnnParams)
    const input = document.getElementById('inputVideo');
    const displaySize = { width: 640, height: 480 };
    faceapi.matchDimensions(canvas, displaySize);
    let fullFaceDescriptions = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(fullFaceDescriptions, displaySize);
    // if(reference) {
    //     // const maxDescriptorDistance = 0.6
    //     // const faceMatcher = new faceapi.FaceMatcher(reference, maxDescriptorDistance)
    //     // const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor));
    //     // results.forEach((bestMatch, i) => {
    //     //     const box = fullFaceDescriptions[i].detection.box
    //     //     const text = bestMatch.toString()
    //     //     const drawBox = new faceapi.draw.DrawBox(box, { label: text })
    //     //     drawBox.draw(canvas)
    //     // })
    // }
    // else {
        faceapi.draw.drawDetections(canvas, resizedDetections)
        console.log(fullFaceDescriptions,1);
    //}
    setTimeout(playFunc,500);
}
const Videocam = () => {
    const videoRef = useRef(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream
            })
            .catch(err => {
                console.log(err.message);
            });
            
        run(videoRef);
    },[]);
    return (
        <div className="margin">
            <video style={{position: "absolute"}} id = "inputVideo" ref = {videoRef} autoPlay ={true}  muted></video>
            <canvas style={{position: "absolute"}} id="overlay" />
        </div>
    );
    //onPlay = {() =>playFunc(videoRef)}
}


export default Videocam;
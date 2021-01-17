import { useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';

let reference =  null;
let convertedRef = null;
async function run() {
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.mtcnn.loadFromUri('/models');
    referenceData();
}
async function referenceData() {
    const imgUrl = `Vaibhav Mittal.jpg`;
    const mtcnnParams = {
        minFaceSize: 200
    };
    const options = new faceapi.MtcnnOptions(mtcnnParams);
    console.log("Image aagiiii");
    console.log(faceapi.fetchImage);
    const img = await faceapi.fetchImage(imgUrl);
    console.log("Helllo jiiiii - 1");
    const fullFaceDescription = await faceapi.detectAllFaces(img, options).withFaceLandmarks().withFaceDescriptors();
    console.log(fullFaceDescription,"Helllo jiiiii");
    if (!fullFaceDescription) {
        throw new Error(`no faces detected for ${"Vaibhav Mittal"}`);
    }
    console.log("Helllo jiiiii");
    const faceDescriptors = fullFaceDescription[0].descriptor;
    console.log(faceDescriptors);
    reference = [new faceapi.LabeledFaceDescriptors("Vaibhav Mittal", [faceDescriptors])];
    console.log(reference, "Hiii");
    // saving in local storage
    localStorage.setItem("descriptor", JSON.stringify(reference));
    // get data from local storage
    var convertedReference = JSON.parse(localStorage.getItem("descriptor"));
    // convert object to Float32Array
    convertedReference[0].descriptors[0] = Float32Array.from(convertedReference[0].descriptors[0]);
    // construct labeled face descriptor from data from localStorage and save it in the variable
    // declared in line 5
    convertedRef = [new faceapi.LabeledFaceDescriptors(convertedReference[0].label, [convertedReference[0].descriptors[0]])];
    console.log(convertedRef);
}
async function playFunc() {
    const mtcnnParams = {
        minFaceSize: 200
    }
    const canvas = document.getElementById('overlay');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const options = new faceapi.MtcnnOptions(mtcnnParams);
    const input = document.getElementById('inputVideo');
    const displaySize = { width: 640, height: 480 };
    faceapi.matchDimensions(canvas, displaySize);
    let fullFaceDescriptions = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(fullFaceDescriptions, displaySize);
    let labeledDescriptors = reference;
    // UNCOMMENT TO USE CONVERTED REF FROM LOCAL STORAGE AND COMMENT THE LINE ABOVE
    // let labeledDescriptors = convertedRef;
    if(labeledDescriptors) {
        console.log(labeledDescriptors[0]);
        const maxDescriptorDistance = 0.6;
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors[0]);
        const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor));
        results.forEach((bestMatch, i) => {
            const box = fullFaceDescriptions[i].detection.box
            const text = bestMatch.toString()
            const drawBox = new faceapi.draw.DrawBox(box, { label: text })
            drawBox.draw(canvas)
        })
        // console.log(JSON.parse(localStorage.getItem('fullFaceDescription')));
        // const faceMatcher = new faceapi.FaceMatcher(JSON.parse(localStorage.getItem('fullFaceDescription')));
        // const bestMatch = faceMatcher.findBestMatch(fullFaceDescriptions);
        // console.log(bestMatch.toString())
    }
    else {
        faceapi.draw.drawDetections(canvas, resizedDetections)
        console.log(fullFaceDescriptions,1);
    }
    setTimeout(playFunc);
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
            <video style={{position: "absolute"}} id = "inputVideo" ref = {videoRef} onPlay = {() =>playFunc(videoRef)} autoPlay ={true}  muted></video>
            <canvas style={{position: "absolute"}} id="overlay" />
        </div>
    );
    //onPlay = {() =>playFunc(videoRef)}
}


export default Videocam;
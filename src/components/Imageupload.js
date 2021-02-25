import { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { useHistory } from 'react-router-dom';
import db from '../firebase';

async function load_models() {
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.mtcnn.loadFromUri('/models');
}

const ImageUpload = ({user}) => {

    const file = useRef(null);
    const [error, setError] = useState('');
    const history = useHistory();
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        load_models();
    },[]);

    async function add_user(reference) {
        const doc = {
            email : user.email,
            imgData : reference,
        }
        db.collection('users').add(doc).then(() => {
            history.push('/Home');
        })
        .catch(err => {
            console.log(err.message);
        })
    }
    
    async function detect_face(name, img_file) {
        const mtcnnParams = {
            minFaceSize: 200
        };
        const options = new faceapi.MtcnnOptions(mtcnnParams);
        const img = await faceapi.fetchImage(img_file);
        const fullFaceDescription = await faceapi.detectAllFaces(img, options).withFaceLandmarks().withFaceDescriptors();
        console.log(fullFaceDescription);

        if(!fullFaceDescription.length) {
            setError('No faces detected! Please select some other file');
            setFileName('');
            return false;
        }

        const faceDescriptors = fullFaceDescription[0].descriptor;
        const reference = [new faceapi.LabeledFaceDescriptors(name, [faceDescriptors])];
        console.log(reference);

        setError(`Selected file - ${file.current.files[0].name}`);

        if(window.confirm('Is this your final submission? You cannot change it later on!')) {
            add_user(JSON.stringify(reference));
        }

        return true;
    }
    function displayfile() {
        setError('');
        setFileName(file.current.files[0].name);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(file.current.files.length && file.current.files[0].size > 153600) {
            setError('Please upload an image of size less than 150 KB');
            setFileName('');
        }
        else if(file.current.files.length) {
            const url = URL.createObjectURL(file.current.files[0]);
            detect_face(user.displayName, url);
        }
        else {
            setError("No file selected.")
        }
    }
    return (  
        <div className="imageupload">
            <form onSubmit={handleSubmit}>
                <label htmlFor="file_input">Choose File</label>
                <input id = "file_input" type="file" accept="image/jpeg" ref={file} name="image" onChange = {displayfile} />
                <button type="submit">Submit</button>
            </form>
            <span>{ error }</span>
            <span>{ fileName }</span>
        </div>
    );
}

export default ImageUpload;
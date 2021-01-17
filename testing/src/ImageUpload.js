import { useRef } from 'react';

const ImageUpload = () => {

    const file = useRef(null);

    function checkImage() {
        console.log(file.current.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(file.current.files[0].size > 153600) {
            alert('Please upload an image of size less than 150 KB');
        }
        else alert(`Selected file - ${file.current.files[0].name}`);
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/jpeg" ref={file} name="image" onChange={checkImage}/>
            <button type="submit">Submit</button>
        </form>
    );
}


export default ImageUpload;
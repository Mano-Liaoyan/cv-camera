import React from "react";
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import {saveAs} from 'file-saver';
import './App.css';


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function App() {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
            saveAs(imageSrc, 'screenshot.png');
        },
        [webcamRef, setImgSrc]
    );

    // var Base64Code = imgSrc.split("data:image/png;base64,"); //base64Image is my image base64 string
    //
    // const dirs = RNFetchBlob.fs.dirs;
    //
    // var path = dirs.DCIMDir + "/image.png";
    //
    // RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64')
    //     .then((res) => {
    //         console.log("File : ", res)
    //     });

    return (
        <div className="App">
            <h1>CV-Camera</h1>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/png"
                width={1280}
                videoConstraints={videoConstraints}
            />

            <Button onClick={capture} variant="contained">Capture photo</Button>
            {imgSrc && (
                <img src={imgSrc} alt="Screenshots"/>
            )}
        </div>
    );
}

export default App;

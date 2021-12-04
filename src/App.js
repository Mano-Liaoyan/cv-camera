import React from 'react'
import Webcam from 'react-webcam'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { saveAs } from 'file-saver'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

const useStyles = makeStyles({
  captureButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 13,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function App() {
  const classes = useStyles()
  const webcamRef = React.useRef(null)
  const [imgSrc, setImgSrc] = React.useState(null)
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    saveAs(imageSrc, 'screenshot.png')
  }, [webcamRef, setImgSrc])

  return (
    <div className="App">
      <div className={classes.flex}>
        <h2 style={{ marginBottom: 0 }}>CV-Camera</h2>
        <Webcam
          audio={false}
          height={720}
          width={1280}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
        />
        <Button
          className={classes.captureButton}
          onClick={capture}
          variant="contained"
          style={{ marginTop: '1rem' }}
        >
          Capture photo
        </Button>
        {imgSrc && (
          <img src={imgSrc} alt="Screenshots" style={{ marginTop: '1rem' }} />
        )}
      </div>
    </div>
  )
}

export default App

import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'

const Scanner = () => {

  const [scanData, setScanData] = useState('')

  const webCamRef = useRef(null)



  // credit:
  // https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects/16972036
  const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
          u8arr[n] = bstr.charCodeAt(n)
      }
      const file = new File([u8arr], filename, {type:mime})
      setScanData(file)

      let formData = new FormData()
      formData.append("imageFile", file, "file")
      console.log(file);
      axios.post('http://localhost:5000/scan', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Apikey": process.env.REACT_APP_BCODEAPIKEY
        },
      })
      .then(res=> {
        console.log(res)
      })
      .catch(err => {console.error(err.message)})

  }


  const scan = useCallback(
    () => {
      const imgSrc = webCamRef.current.getScreenshot()
      dataURLtoFile(imgSrc, 'barcode.jpg')

    },
    [webCamRef]
  )

// CSS
  const styleForOverlay = {
    postion: 'absolute',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    zIndex: '2'
  }

  const webcamWrap = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '1'
  }

  const videoElementStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0',
    borderRadius: '.5rem',
    zIndex: '-1'
  }



return(
        <div style={{position: 'relative', height: '25rem'}} className='m-5'>
            <div style={webcamWrap}>
                <Webcam
                    style={videoElementStyle}
                    ref={webCamRef}
                    screenshotFormat='image/jpeg'
                />
                <div style={styleForOverlay}>
                    <button className='bg-gray-600 text-gray-200 m-5 p-2 rounded-sm' onClick={scan}>scan</button>
                </div>
            </div>
        </div>
      )
}

export default Scanner

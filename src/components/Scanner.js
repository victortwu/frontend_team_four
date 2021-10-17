import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import ManualBarcodeSearch from './ManualBarcodeSearch'
import ShowScanned from './ShowScanned'
import axios from 'axios'

const Scanner = () => {

  const [scanData, setScanData] = useState('')
  const [manualSearch, setManualSearch] = useState(false)
  const [showProductPage, setShowProductPage] = useState(false)

  const webCamRef = useRef(null)

  const openKeypad = () => {
    setManualSearch(true)
  }

  const closeKeypad = () => {
    setManualSearch(false)
  }



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
      formData.append("imageFile", file, "barcode.jpg")
      console.log(file);

      for (const value of formData.values()) {
        console.log(value)
      }



      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener("readystatechange", function() {
           if(this.readyState === 4) {
                console.log(this.responseText);
           }
      });

      xhr.open("POST", "https://api.cloudmersive.com/barcode/scan/image");
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.setRequestHeader("Apikey", process.env.REACT_APP_BCODEAPIKEY);
      console.log('Line 66!!')
      xhr.send(formData);

  }


  const scan = useCallback(
    () => {
      const imgSrc = webCamRef.current.getScreenshot()
      dataURLtoFile(imgSrc, 'barcode.jpg')

    },
    [webCamRef]
  )

  const getProduct = () => {
    console.log('Clicked')

  }

// CSS
  const styleForOverlay = {
    postion: 'absolute',
    height: '100vh',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    zIndex: '2'
  }

  const overlayBtns = {
    marginTop: '15%',
    marginLeft: '15%',
    marginRight: '15%',
    display: 'flex',
    justifyContent: 'space-around'
  }

  const iconBtns = {
    width: '10vw',
    height: '10vw',
    border: 'solid 1px white',
    borderRadius: '.5rem'
  }

  const webcamWrap = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '1'
  }

  const videoElementStyle = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0',
    borderRadius: '.5rem',
    zIndex: '-1'
  }



return(
        <div style={{position: 'relative', height: '100%'}} className='m-5'>
            <div style={webcamWrap}>
                <Webcam
                    style={videoElementStyle}

                    ref={webCamRef}
                    screenshotFormat='image/jpeg'
                />
                <div style={styleForOverlay}>

                    {
                      manualSearch ? <ManualBarcodeSearch closeKeypad={closeKeypad}/>

                      :   <div style={overlayBtns}>
                              <button onClick={openKeypad} style={iconBtns}>S</button>
                              <button style={iconBtns}>?</button>
                              <button style={iconBtns}>?</button>
                          </div>
                    }

                    {
                      manualSearch ? ''
                      :   <button style={{position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%, -50%)'}}
                            onClick={()=> {
                              scan()
                              getProduct()
                            }
                          }>
                            SCAN
                          </button>
                    }

                </div>
            </div>
        </div>
      )
}

export default Scanner

// this is to use barcode api in node backend

// axios.post('http://localhost:5000/scan', formData, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     "Apikey": process.env.REACT_APP_BCODEAPIKEY
//   },
// })
// .then(res=> {
//   console.log(res)
// })
// .catch(err => {console.error(err.message)})

// this is the SDK code snippet for frontend

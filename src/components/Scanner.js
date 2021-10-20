import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import ManualBarcodeSearch from './ManualBarcodeSearch'
import ShowScanned from './ShowScanned'
import axios from 'axios'

const Scanner = () => {

  const [scanData, setScanData] = useState('')
  const [manualSearch, setManualSearch] = useState(false)
  const [showProductPage, setShowProductPage] = useState(false)
  const [response, setResponse] = useState(null) // this is for testing barcodescanner api call
  // useState initialized with testing code
  const [barcodeString, setBarcodeString] = useState('')
  const [productData, setProductData] = useState({})


  const webCamRef = useRef(null)

  const openKeypad = () => {
    setManualSearch(true)
  }

  const closeKeypad = () => {
    setManualSearch(false)
  }

  const closePrPg = () => {
    setShowProductPage(false)
  }

  const getProduct = (code) => {

    //setShowProductPage(true)


    // upc test call, NOT from Cloudmersive
    axios.get(`http://localhost:5000/upc/${code}`)
      .then(res => {
        setProductData(res.data)
      })
      .catch(err => {console.error(err)})
  }



  // credit:
  // https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects/16972036
  const dataURLtoFile = async(dataurl, filename) => {
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

      for (const value of formData.values()) {
        console.log(value)
      }
      // credit: help from Daniel Edminster
      try {

        // fake data here for testing flow of app w/o wasting api calls
        const fakeScanData = {
          Successfull: true, // <--- keep getting a 200, false on my camera
          BarcodeType: 'upc',
          RawText: '0111222333446' //<--- this is what we want from cloudmersive
        }


// uncomment below to make actual api calls

        // let req = await axios.request({
        //   method: 'POST',
        //   url: 'https://api.cloudmersive.com/barcode/scan/image',
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     "Apikey": process.env.REACT_APP_BCODEAPIKEY
        //   },
        //   data: formData
        // })
        //
        // console.log(req.data)

        // barcodeString gets set HERE
        setBarcodeString(fakeScanData.RawText) // on real call --> req.data.RawText
        setResponse(fakeScanData.Successfull) //just to test

        getProduct(fakeScanData.RawText)





      }
      catch(error) {
              console.log(error);
      }

    }



  const scan = useCallback(
    () => {
      const imgSrc = webCamRef.current.getScreenshot()
      dataURLtoFile(imgSrc, 'barcode.jpg')

    },
    [webCamRef]
  )


// CSS
  const positionForOverlay = {
    postion: 'absolute',
    height: '100vh',
    left: '0', top: '0', right: '0', bottom: '0',
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
    top: '0', right: '0', left: '0', bottom: '0',
    borderRadius: '.5rem',
    zIndex: '-1'
  }

console.log(barcodeString)
console.log(productData)
return(
        <div style={{position: 'relative', height: '100%'}} className='m-5'>
            <div style={webcamWrap}>
                <Webcam
                    style={videoElementStyle}

                    ref={webCamRef}
                    screenshotFormat='image/jpeg'
                />

                {
                  showProductPage ? <div style={positionForOverlay}>
                                        <ShowScanned
                                            response={response} closePrPg={closePrPg}
                                            productData={productData}
                                        />
                                    </div>

                  :     <div style={positionForOverlay}>

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
                                    setShowProductPage(true)
                                  }
                                }>
                                  SCAN
                                </button>
                          }

                      </div>
                }




            </div>
        </div>
      )
}

export default Scanner

import React, { useRef } from 'react'
import axios from 'axios'

const Scanner = props => {

  const webCamRef = useRef(null)

    const getProduct = async(code) => {

      let res  = await axios.get(`http://localhost:5000/upc/${code}`)
        .then(res => {
          console.log(res.data.result[code])
          props.setProductData(res.data.result[code])
        })
        .catch(err => {console.error(err)})
      }


    const getBarcode = async(param) => {
      props.setIsLoading(true)
      const file = param


      let formData = new FormData()
      formData.append("imageFile", file, "file")
      console.log(file);

      for (const value of formData.values()) {
        console.log(value)
      }
      //credit: help from Daniel Edminster
      try {

        // fake data here for testing flow of app w/o wasting api calls
        const fakeScanData = {
          Successfull: true,
          BarcodeType: 'upc',
          RawText: '0111222333446'
        }


  // uncomment below to make actual api calls

        let req = await axios.request({
          method: 'POST',
          url: 'https://api.cloudmersive.com/barcode/scan/image',
          headers: {
            'Content-Type': 'multipart/form-data',
            "Apikey": process.env.REACT_APP_BCODEAPIKEY
          },
          data: formData
        })

        console.log(req.data)

        // barcodeString gets set HERE
        getProduct(req.data.RawText)
        props.setBarcodeString(req.data.RawText)
        props.setIsLoading(false)
        //setBarcodeString(fakeScanData.RawText) // on real call --> req.data.RawText
        //setResponse(fakeScanData.Successfull) //just to test

        //getProduct(fakeScanData.RawText)
      }
      catch(error) {
              console.log(error);
      }
      props.setIsLoading(false)
    }

    const getInput = () => {
      getBarcode(webCamRef.current.files[0])
      props.setShowProductPage(true)
    }

  return(
      <input ref={webCamRef} onChange={getInput} type="file" accept="image/*" capture="camera"/>
  )
}

export default Scanner

import React, { useRef } from 'react'
import { config } from '../Constants'
import axios from 'axios'

const url = config.url.baseUrl

//let appBaseURL = 'http://localhost:5000'
// let appBaseURL = 'https://greenscan-api.herokuapp.com'
// // for now
// if (process.env.NODE_ENV !== 'developement') {
//   //appBaseURL = 'http://localhost:5000'
// }

const Scanner = props => {

  const webCamRef = useRef(null)

    const getProduct = async(code) => {

      let res  = await axios.get(`${url}/upc/${code}`)
        .then(res => {
          console.log(res.data.message)
          console.log(res.data.items[0])
          // console.log(res.data.result[code])
          props.setProductData(res.data.items[0])
        })
        .catch(err => {console.error(err.message)})
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

        // const fakeScanData = {
        //   Successfull: true,
        //   BarcodeType: 'upc',
        //   RawText: '012000171741',
        // }


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


        getProduct(req.data.RawText)
        props.setBarcodeData(req.data)
        props.setIsLoading(false)

        // getProduct(fakeScanData.RawText)
        // props.setBarcodeData(fakeScanData)
        // props.setIsLoading(false)
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

import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ManualBarcodeSearch from './ManualBarcodeSearch'
import ShowScanned from './ShowScanned'

import '../home.css'


const Home = () => {

  const [barcodeString, setBarcodeString] = useState('')
  const [productData, setProductData] = useState({})
  const [showProductPage, setShowProductPage] = useState(false)
  const [factoid, setFactoid] = useState('')

  const webCamRef = useRef(null)


  const closePrPg = () => {
    setShowProductPage(false)
  }


  const getProduct = async(code) => {

    let res  = await axios.get(`http://localhost:5000/upc/${code}`)
      .then(res => {
        console.log(res.data.result[code])
        setProductData(res.data.result[code])
      })
      .catch(err => {console.error(err)})
    }



  const getBarcode = async(param) => {

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
        Successfull: true, // <--- keep getting a 200, false on my camera
        BarcodeType: 'upc',
        RawText: '0111222333446' //<--- this is what we want from cloudmersive
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
      setBarcodeString(req.data.RawText)

      //setBarcodeString(fakeScanData.RawText) // on real call --> req.data.RawText
      //setResponse(fakeScanData.Successfull) //just to test

      //getProduct(fakeScanData.RawText)
    }
    catch(error) {
            console.log(error);
    }

  }


  const getInput = () => {
    getBarcode(webCamRef.current.files[0])
    setShowProductPage(true)
  }

  const dummyFacts = ['Banana', 'Orange', 'Apple', 'Mango']
  const getFactiods = () => {
    const randomIndex = Math.floor(Math.random() * (dummyFacts.length - 1))
    setFactoid(dummyFacts[randomIndex])
  }

useEffect(()=> {
  // let intId = setInterval(()=> {
  //   getFactiods()
  // }, 2500)
  //return clearInterval(intId)
}, [])


  return(
    <>

    {
        showProductPage ? <ShowScanned
                              closePrPg={closePrPg}
                              barcodeString={barcodeString}
                              productData={productData}
                          />

        :     <div className='homeCnt'>
                <div style={{height: '20%'}}/>
                <div className='mx-6'>
                    <div className='factiodDiv'>
                      <p>{factoid}</p>
                    </div>

                    <div id='scanBtnLink' >

                        <label style={{position: 'absolute', top: '20%', left: '65%', opacity: '0'}}>
                          <input ref={webCamRef} onChange={getInput} type="file" accept="image/*" capture="camera"/>
                        </label>
                    </div>


                </div>

                <div className='flex justify-evenly mx-4'>
                    <Link to='/map'>
                    <div id='mapBtn'></div>
                    </Link>

                    <Link to='/materials'>
                    <div id='materialsBtn'></div>
                    </Link>
                </div>

            </div>
    }



    </>
  )
}

export default Home

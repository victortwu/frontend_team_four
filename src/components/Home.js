import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextLoop from 'react-text-loop'
import ManualBarcodeSearch from './ManualBarcodeSearch'
import ProductPage from './ProductPage'
import RecycleSymbols from './RecycleSymbols'

import '../styleSheets/home.css'


const Home = (props) => {

  const [barcodeString, setBarcodeString] = useState('')
  const [productData, setProductData] = useState({})
  const [showProductPage, setShowProductPage] = useState(false)
  const [showRecycleSymbols, setShowRecycleSymbols] = useState(false)
  const [factoid, setFactoid] = useState('')

  const webCamRef = useRef(null)


  const closePrPg = () => {
    setShowProductPage(false)
  }

  const closeRecMenu = () => {
    setShowRecycleSymbols(false)
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
  // const dummyFElements = dummyFacts.map((el,i) => {
  //   return <p key={el+i} id='factoidP'>{el}</p>
  // })
  // const getFactiods = () => { // CSS fadeIn animation not working
  //
  //   const randomIndex = Math.floor(Math.random() * (dummyFElements.length - 1))
  //
  //   setFactoid(dummyFElements[randomIndex])
  // }

useEffect(()=> {
  // let intId = setInterval(()=> {
  //   getFactiods()
  // }, 2500)
  // return clearInterval(intId)
}, [])

//console.log(factoid)
  return(
    <>

    {
        showProductPage ? <ProductPage
                              closePrPg={closePrPg}
                              barcodeString={barcodeString}
                              productData={productData}
                          />

        :     <div className='homeCnt'>
                <div style={{height: '20%'}}/>
                <div className='mx-6'>
                    <div className='factiodDiv'>
                      <TextLoop children={dummyFacts}/>
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

                    <div  onClick={()=> setShowRecycleSymbols(!showRecycleSymbols)} id='materialsBtn'></div>

                </div>

            </div>
    }

    {
      showRecycleSymbols ? <RecycleSymbols closeRecMenu={closeRecMenu}/> : ''
    }


    </>
  )
}

export default Home

// <Link to='/materials'>
//
// </Link>

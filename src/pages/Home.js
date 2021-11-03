import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextLoop from 'react-text-loop' 
import ManualBarcodeSearch from '../components/ManualBarcodeSearch'
import ProductPage from './ProductPage'
import RecycleSymbols from '../components/RecycleSymbols'

import '../styleSheets/home.css'

let appBaseURL = 'http://localhost:5000'

// for now
if (process.env.NODE_ENV !== 'developement') {
  //appBaseURL = 'http://localhost:5000'
}


const Home = (props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [barcodeString, setBarcodeString] = useState('')
  const [productData, setProductData] = useState({})
  const [showProductPage, setShowProductPage] = useState(false)
  //const [showRecycleSymbols, setShowRecycleSymbols] = useState(false)
  const [factoids, setFactoids] = useState([])
  const [factoidsLoaded, setFactoidsLoaded] = useState(false)


  const webCamRef = useRef(null)


  const closePrPg = () => {
    setShowProductPage(false)
  }

  // const closeRecMenu = () => {
  //   setTimeout(()=> {
  //     setShowRecycleSymbols(false)
  //   },1000)
  // }

  const getProduct = async(code) => {

    let res  = await axios.get(`http://localhost:5000/upc/${code}`)
      .then(res => {
        console.log(res.data.result[code])
        setProductData(res.data.result[code])
      })
      .catch(err => {console.error(err)})
    }



  const getBarcode = async(param) => {
    setIsLoading(true)
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
      setBarcodeString(req.data.RawText)
      setIsLoading(false)
      //setBarcodeString(fakeScanData.RawText) // on real call --> req.data.RawText
      //setResponse(fakeScanData.Successfull) //just to test

      //getProduct(fakeScanData.RawText)
    }
    catch(error) {
            console.log(error);
    }
    setIsLoading(false)
  }


  const getInput = () => {
    getBarcode(webCamRef.current.files[0])
    setShowProductPage(true)
  }



  const factoidMap =  factoids.map(factoid => {
      return <p style={{whiteSpace: 'normal'}} key={factoid._id}>{factoid.factoid}</p>
  })

  const checkFactoids = () => {
    console.log('check factoids called')
    if ( factoids === [] ) {
      setFactoidsLoaded(false)
    } else {
      setFactoidsLoaded(true)
    }
  }





useEffect(()=> {
  axios.get(appBaseURL + '/factoid')
    .then(res=> {
      setFactoids(res.data)
    })
    .catch(err=> {console.error(err.message)})
    setTimeout(() => {checkFactoids()} , 2500)

}, [])

console.log(factoidMap)
  return(
    <>


    {
        showProductPage ? <ProductPage
                              closePrPg={closePrPg}
                              barcodeString={barcodeString}
                              productData={productData}
                              isLoading={isLoading}
                          />

        :      <div className='homeCnt md:h-full mx-auto rounded-xl overflow-hidden md:max-w-3xl text-sm' >
                <div style={{height: '20%'}}/>

                <div className='mx-6'>
                    <div className='factiodDiv'>
                    {factoidsLoaded ? <TextLoop interval={7000} children={factoidMap} /> : ''}
                    </div>

                    <div id='scanBtnLink' >

                        <label id='inputLabel' for='scanInput'>
                          <input name='scanInput' ref={webCamRef} onChange={getInput} type="file" accept="image/*" capture="camera"/>
                        </label>
                    </div>


                </div>

                <div className='flex justify-between mx-6'>
                    <Link to='/map'>
                    <div id='mapBtn'></div>
                    </Link>

                    <div  onClick={()=> props.setShowRecycleSymbols(true)} id='materialsBtn'></div>

                </div>

            </div>
    }




    </>
  )
}

export default Home

// {
//   showRecycleSymbols ? <RecycleSymbols closeRecMenu={closeRecMenu}/> : ''
// }

//<TextLoop noWrap={false} children={factoid}/>


// <Link to='/materials'>
//
// </Link>

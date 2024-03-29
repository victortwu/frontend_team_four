import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextLoop from 'react-text-loop'
import Scanner from '../components/Scanner'
import ProductPage from './ProductPage'
import RecycleSymbols from '../components/RecycleSymbols'
import { config } from '../Constants'
import '../styleSheets/home.css'

const url = config.url.baseUrl



const Home = (props) => {

  const [factoids, setFactoids] = useState([])
  const [factoidsLoaded, setFactoidsLoaded] = useState(false)


    const factoidMap =  factoids.map(factoid => {
        return <p style={{whiteSpace: 'normal'}} key={factoid._id}>{factoid.factoid}</p>
    })

    const checkFactoids = () => {

      if ( factoids === [] ) {
        setFactoidsLoaded(false)
      } else {
        setFactoidsLoaded(true)
      }
    }





    useEffect(()=> {
      axios.get(url + '/factoid')
        .then(res=> {
          setFactoids(res.data)
        })
        .catch(err=> {console.error(err.message)})
        setTimeout(() => {checkFactoids()} , 2000)

    }, [])


  return(
    <>


    {
        props.showProductPage ? <ProductPage
                              setShowProductPage={props.setShowProductPage}
                              barcodeData={props.barcodeData}
                              productData={props.productData}
                              isLoading={props.isLoading}
                              setShowRecycleSymbols={props.setShowRecycleSymbols}
                          />

        :      <div className='homeCnt md:h-full mx-auto rounded-xl overflow-hidden md:max-w-3xl text-sm' >
                <div style={{height: '20%'}}/>

                <div className='mx-6'>
                    <div className='factiodDiv'>
                      {factoidsLoaded ? <TextLoop interval={7000} children={factoidMap} /> : ''}
                    </div>

                    <div id='scanBtnLink' >

                        <label id='inputLabel'>
                          <Scanner
                              setProductData={props.setProductData}
                              setIsLoading={props.setIsLoading}
                              setShowProductPage={props.setShowProductPage}
                              setBarcodeData={props.setBarcodeData}
                          />
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

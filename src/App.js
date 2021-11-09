import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import './App.css';
import RecycleSymbols from './components/RecycleSymbols'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home'

import ProductPage from './pages/ProductPage'
import MapPage from './pages/MapPage'
import Navigation from './components/Navigation'





function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [barcodeData, setBarcodeData] = useState({})
  const [productData, setProductData] = useState([])
  const [showProductPage, setShowProductPage] = useState(false)

  const [loadHomePage, setLoadHomePage] = useState(false)
  // this sets up materials menu almost like another nav
  const [showRecycleSymbols, setShowRecycleSymbols] = useState(false)

  // closes materials menu, passed down as props
  const closeRecMenu = (ms) => {
    setTimeout(()=> {
      setShowRecycleSymbols(false)
    }, ms)
  }


  useEffect(() => {

      // delay home page render
      setTimeout(()=> {
          setLoadHomePage(true)
      }, 2000)

  }, [])

const greenHill = {
  position: 'absolute',
  marginTop: '53.125em',
  width: '100%',
  height: '100%',

  animation: 'slideUp 2s forwards',
  animationDelay: '1s',
}

console.log(productData)
  return (
    <BrowserRouter>

      <main className='App text-center sm:text-left'>
      <div style={greenHill} id='backgroundTwo'/>
            { loadHomePage ? <Navigation
                                  closeRecMenu={closeRecMenu}
                                  setShowRecycleSymbols={setShowRecycleSymbols}
                                  setProductData={setProductData}
                                  setIsLoading={setIsLoading}
                                  setShowProductPage={setShowProductPage}
                                  setBarcodeData={setBarcodeData}
                                  showProductPage={showProductPage}
                                  productData={productData}
                                  barcodeData={barcodeData}
                                  isLoading={isLoading}
                                  /> : '' }

      <Switch>

            <Route exact path='/'>

                <div className='mainWrapper'>
                    { loadHomePage ? <Home
                                        closeRecMenu={closeRecMenu}
                                        setShowRecycleSymbols={setShowRecycleSymbols}
                                        setProductData={setProductData}
                                        setIsLoading={setIsLoading}
                                        setShowProductPage={setShowProductPage}
                                        setBarcodeData={setBarcodeData}
                                        showProductPage={showProductPage}
                                        productData={productData}
                                        barcodeData={barcodeData}
                                        isLoading={isLoading}
                                        /> : '' }
                </div>

            </Route>

            <Route exact path='/test'>
                <div className='mainWrapper'>
                  <RecycleSymbols />

                </div>
            </Route>

            <Route exact path='/map'>
                <div className='mainWrapper'>
                    <MapPage/>
                </div>
            </Route>

            <Route exact path='/materials'>
                <div className='mainWrapper'>

                </div>
            </Route>



        </Switch>

        {
          showRecycleSymbols ? <div className='mainWrapper'>
                                  <RecycleSymbols closeRecMenu={closeRecMenu}/>
                              </div>
                              : ''
        }


        </main>

    </BrowserRouter>
  );
}

export default App;

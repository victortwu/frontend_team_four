import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import './App.css';
import RecycleSymbols from './components/RecycleSymbols'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
//import ManualBarcodeSearch from './components/ManualBarcodeSearch'
import ProductPage from './pages/ProductPage'
import Map from './components/Map'
import Navigation from './components/Navigation'
import Search from './pages/search'
import Display from './pages/display'
import Loading from './components/Loading'

//let appBaseURL = ''

// for now

// if (process.env.NODE_ENV === 'developement') {
//   appBaseURL = 'http://localhost:5000'
// } else {
//   console.log(process.env.NODE_ENV)
//   appBaseURL = 'http://localhost:5000'
// }



function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [barcodeData, setBarcodeData] = useState({})
  const [productData, setProductData] = useState({})
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
                  <ProductPage/>

                </div>
            </Route>

            <Route exact path='/map'>
                <div className='mainWrapper'>
                    <Map/>
                </div>
            </Route>

            <Route exact path='/materials'>
                <div className='mainWrapper'>

                </div>
            </Route>
            <Route exact path='/search'>
                <div className='mainWrapper'>
                    <Search/>
                </div>
            </Route>
            <Route exact path='/display'>
                <div className='mainWrapper'>
                    <Display/>
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

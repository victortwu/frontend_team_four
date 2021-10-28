import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import './App.css';
import RecycleSymbols from './components/RecycleSymbols'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home'
import ManualBarcodeSearch from './components/ManualBarcodeSearch'
import Map from './components/Map'
import Navigation from './components/Navigation'
import Search from './pages/search'
import Display from './pages/display'


//let appBaseURL = ''

// for now

// if (process.env.NODE_ENV === 'developement') {
//   appBaseURL = 'http://localhost:5000'
// } else {
//   console.log(process.env.NODE_ENV)
//   appBaseURL = 'http://localhost:5000'
// }



function App() {

  const [loadHomePage, setLoadHomePage] = useState(false)

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
            { loadHomePage ? <Navigation/> : '' }

      <Switch>

            <Route exact path='/'>

                <div className='mainWrapper'>
                    { loadHomePage ? <Home/> : '' }
                </div>

            </Route>

            <Route exact path='/test'>
                <div className='mainWrapper'>

                    <ManualBarcodeSearch />
                </div>
            </Route>

            <Route exact path='/map'>
                <div className='mainWrapper'>
                    <Map/>
                </div>
            </Route>

            <Route exact path='/materials'>
                <div className='mainWrapper'>
                    <RecycleSymbols/>
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

        </main>

    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import RecycleSymbols from './components/RecycleSymbols'
//import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home'
import Scanner from './components/Scanner'
import Map from './components/Map'
import Navigation from './components/Navigation'
import Search from './pages/search'
import Display from './pages/display'


let appBaseURL = ''
// for now
if (process.env.NODE_ENV === 'developement') {
  appBaseURL = 'http://localhost:5000'
} else {
  console.log(process.env.NODE_ENV)
  appBaseURL = 'http://localhost:5000'
}



function App() {

  const [recTypeData, setRecTypeData] = useState([])


  useEffect(() => {
    axios.get(appBaseURL + '/plastics')
      .then(res => {
        setRecTypeData(res.data)
      })
      .catch(err => { console.error(err.message) })
  }, [])

const greenHill = {
  position: 'absolute',
  marginTop: '850px',
  backgroundColor: 'gray',
  width: '100%',
  height: '100%',
  animationDelay: '3s',
  animation: 'slideUp 2s forwards'
}


  return (
    <BrowserRouter>

      <main className='App'>
      <div style={greenHill}/>
        <Navigation/>

      <Switch>

            <Route exact path='/'>

                <div className='mainWrapper'>
                    <Home/>
                </div>

            </Route>

            <Route exact path='/scanner'>
                <div className='mainWrapper'>
                    <Scanner/>
                </div>
            </Route>

            <Route exact path='/map'>
                <div className='mainWrapper'>
                    <Map/>
                </div>
            </Route>

            <Route exact path='/materials'>
                <div className='mainWrapper'>
                    <RecycleSymbols recTypeData={recTypeData}/>
                </div>
            </Route>
            <Route exact path='/search'>
                <div className='mainWrapper'>
                    <Search/>
                </div>
            </Route>
            <Route exact path='/display/:upc'>
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

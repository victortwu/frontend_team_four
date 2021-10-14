import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
//import WebCam from './components/WebCam'
import RecycleSymbols from './components/RecycleSymbols'
import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contact from './components/Contact';
import WebCam from './components/WebCam';
import Scanner from './components/Scanner'



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

  return (
    <main className='App bg-cl1 '>
      <Scanner />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route component={RecycleSymbols} path='/' />
          <Route component={Contact} path='/' />
          <Route component={WebCam} path='/' />
        </Switch>
        {/* <WebCam> camera</WebCam> */}
      </BrowserRouter>
      <div className='text-cl3 bg-cl1'>
        <RecycleSymbols recTypeData={recTypeData} />
      </div>

    </main>
  );
}

export default App;

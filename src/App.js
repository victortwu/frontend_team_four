import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
//import WebCam from './components/WebCam'
import RecycleSymbols from './components/RecycleSymbols'

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


    useEffect(()=> {
      axios.get(appBaseURL + '/plastics')
        .then(res => {
          setRecTypeData(res.data)
        })
        .catch(err => {console.error(err.message)})
    }, [])

  return (
    <main className="App">
      <div className='h-full w-full bg-poop'>
        <RecycleSymbols recTypeData={recTypeData}/>
      </div>
    </main>
  );
}

export default App;

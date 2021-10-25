import React, { useState, useEffect } from 'react'
import '../styleSheets/manualBarcodeSearch.css'

const ManualBarcodeSearch = (props) => {

const [buttons, setButtons] = useState([])
const [display, setDisplay] = useState('')
const [numArr, setNumArr] = useState([])


let tempNumArr = []
const appendNum = (numStr) => {
  console.log('clicked: ', numStr)
  tempNumArr.push(numStr)
  setNumArr(tempNumArr)
  setDisplay(...numArr + numStr)

}

useEffect(()=> {
  let tempArr = []

    for ( let i = 0; i < 10; i++ ) {
      let num = i + 1
      if (num === 10) {
        num = 0
      }
      const gridSpot = `area${num}`
      tempArr.push(<button
        key={num + gridSpot}
        className='numBtn'
        id={gridSpot}
        style={{gridArea: gridSpot, justifySelf: 'center'}}
        onClick={()=> appendNum(`${num}`)}>
          {num}
        </button>)
    }
    setButtons(tempArr)

}, [])


console.log(display)
  return(
    <div className='searchPadCnt'>
      <div className='display'>
        {numArr.map(num=> {return num})}
      </div>
      <div className='keypad'>
        {buttons.map(btn => {
          return btn
        })}
      </div>
    </div>
  )
}

export default ManualBarcodeSearch

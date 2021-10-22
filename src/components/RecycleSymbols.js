import React, { useState, useEffect } from 'react'
import '../styleSheets/recycleSymbols.css'
import { ReactComponent as XButton } from '../assets/Close Modal.svg'
import { Link } from 'react-router-dom'

const RecycleSymbols = (props) => {
console.log(props.recTypeData)






  return(
        <div className='gridWrapper'>

          <span id='lineOne'>Please select your</span>
          <span id='lineTwo'>recycle code</span>

          <Link to='/'>
            <div id='xBtn'><XButton/></div>
          </Link>

          <div className='recycleTypesCnt'>

            {
              props.recTypeData.map(type => {
                const gridSpot = `area${type.recycleNumber}`
                return <div
                          key={type._id}
                          onClick={()=> {console.log(`${type.recycleInfoOptionOne}`)}}
                          id={gridSpot}
                          style={{gridArea: gridSpot, justifySelf: 'center'}}
                          className='recTypeBtn'
                          >
                          {type.recycleNumber}
                        </div>
              })
            }

            <div style={{justifySelf: 'center'}} className='recTypeBtn'>
              ?
            </div>



          </div>
          <div className='bottomSpacer'/>
        </div>


  )
}

export default RecycleSymbols

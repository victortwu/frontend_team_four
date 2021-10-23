import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styleSheets/recycleSymbols.css'
import { ReactComponent as XButton } from '../assets/Close Modal.svg'
import { Link } from 'react-router-dom'

let appBaseURL = ''
// for now
if (process.env.NODE_ENV === 'developement') {
  appBaseURL = 'http://localhost:5000'
} else {
  console.log(process.env.NODE_ENV)
  appBaseURL = 'http://localhost:5000'
}




const RecycleSymbols = (props) => {


const [recTypeData, setRecTypeData] = useState([])
const [singleRecType, setSingleRecType] = useState({})
const [showRecTypeModal, setShowRecTypeModal] = useState(false)
const [animation, setAnimation] = useState('up')

useEffect(()=> {
  axios.get(appBaseURL + '/plastics')
    .then(res => {
      setRecTypeData(res.data)
    })
    .catch(err => { console.error(err.message) })

}, [])

const getById = (id) => {
  axios.get(appBaseURL + '/plastics' + '/' + id)
    .then(res => {
      setSingleRecType(res.data)
    })
    .catch(err => { console.error(err.message) })
}

console.log(singleRecType)

  return(
      <>
        <div className={`gridWrapper ${animation}`}>

          <span id='lineOne'>Please select your</span>
          <span id='lineTwo'>recycle code</span>


            <div onClick={()=> {
                    props.closeModal(false)

                    }
                  } id='xBtn'><XButton/></div>


          <div className='recycleTypesCnt'>

            {
              recTypeData.map(type => {
                const gridSpot = `area${type.recycleNumber}`
                return <div
                          key={type._id}
                          onClick={()=> {
                            getById(type._id)
                            setShowRecTypeModal(true)
                            }}
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

        {
          showRecTypeModal ?

          <div className={`showModalWrapper ${animation}`}>
            <div className='infoAndBtnContainer'>
              <div className='infoBox'>

                <h1 style={{fontWeight: '600', fontSize: '1.1rem'}}>{singleRecType.recycleInfoOptionOne} | PETE</h1>
                <span style={{marginTop: '2rem', fontStyle: 'italic', fontWeight: '200'}}>(name of the plastic)</span>

                <table style={{position: 'absolute', bottom: '2rem'}}>
                  <tbody>
                    <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                      <td style={{fontWeight: '500', paddingBottom: '1rem'}}>CAN YOU RECYCLE<br/>THIS NUMBER?</td>
                      <td style={{paddingBottom: '1rem', paddingLeft: '1rem'}}><span style={{fontWeight: '500'}}>Yes!</span> Some Data here...</td>
                    </tr>
                    <tr style={{fontSize: '.8rem'}}>
                      <td style={{fontWeight: '500', paddingTop: '1rem'}}>PICK UP?<br/>DROP OFF?</td>
                      <td style={{paddingTop: '1rem', paddingLeft: '1rem'}}>Contact you local<br/>recycling company<br/>for more info</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <button onClick={()=> setShowRecTypeModal(false)} className='linkToMapBtn'>
                CLOSE
              </button>
            </div>
          </div> : ''
        }

        </>
  )
}

export default RecycleSymbols

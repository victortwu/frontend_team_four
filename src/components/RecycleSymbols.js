import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../styleSheets/recycleSymbols.css'
import { ReactComponent as XButton } from '../assets/Close Modal.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as DropArrow } from '../assets/Drop-Down Arrow.svg'
import RecTypeCard from './RecTypeCard'
import TextLoop from 'react-text-loop'

let appBaseURL = 'http://localhost:5000'

// for now
if (process.env.NODE_ENV !== 'developement') {
  //appBaseURL = 'http://localhost:5000'
}

console.log(appBaseURL)

const RecycleSymbols = (props) => {


  const [recTypeData, setRecTypeData] = useState([])
  const [singleRecType, setSingleRecType] = useState({})
  const [showRecTypeModal, setShowRecTypeModal] = useState(false)
  const [infoBoxExtended, setInfoBoxExtended] = useState(false)


  const extentionRef = useRef()
  const arrowRef = useRef()
  const recMenuRef = useRef()
  const recShowModalRef = useRef()

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

    const extendInfoBox = () => {
      extentionRef.current.style.animation = 'extend .5s forwards'
    }

    const retractInfoBox = () => {
      extentionRef.current.style.animation = 'retract .5s forwards'
    }

    const closeRecShowModal = () => {
      recShowModalRef.current.style.animation = 'slideDown2 1s'
      setTimeout(()=> {
        setShowRecTypeModal(false)
      }, 1000)
    }

    const slideMenuDown = () => {
      recMenuRef.current.style.animation = 'slideDown2 1s'
    }



//console.log(singleRecType)

  return(
      <>
        <div ref={recMenuRef} className='gridWrapper'>

          <span id='lineOne'>Please select your</span>
          <span id='lineTwo'>recycle code</span>


            <div onClick={()=> {  // refactor these functions like a nav drop down - issue #16
              slideMenuDown()
              props.closeRecMenu()

            }} id='xBtn'>
              <XButton/>
            </div>


          <div className='recycleTypesCnt'>

            {
              recTypeData.map(type => {
                const gridSpot = `area${type.recycleNumber}`
                return <RecTypeCard
                            key={type._id}
                            gridSpot={gridSpot}
                            getById={getById}
                            setShowRecTypeModal={setShowRecTypeModal}
                            type={type}
                          />
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

          <div ref={recShowModalRef} className='showModalWrapper'>

          <div className='backArrow'
                style={{position: 'absolute',
                        top: '1.5rem',
                        left: '1.5rem',
                        transform: 'rotate(-270deg)'}}
                onClick={()=> {
                  closeRecShowModal()
                  setInfoBoxExtended(false)
                }}>
              <DropArrow/>
          </div>

          <div className='recLogoHeader'>
                  {singleRecType.recycleNumber}
                  <span>{singleRecType.recycleCode}</span>
          </div>

            <div className='infoAndBtnContainer'>
              <div className='infoBox'>

                <h1 style={{fontWeight: '600', fontSize: '1.1rem'}}>Number {singleRecType.recycleNumber}{' * '}{singleRecType.recycleCode}</h1>
                <span style={{marginTop: '2rem', fontStyle: 'italic', fontWeight: '200'}}>({singleRecType.plasticName})</span>

                <table className='infoTable' style={{bottom: '6rem'}}>
                  <tbody>
                    <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                      <td style={{fontWeight: '500', paddingBottom: '1rem'}}>IS USED IN...</td>
                      <td style={{paddingBottom: '1rem', paddingLeft: '1rem'}}><TextLoop interval={1000} children={singleRecType.productExamples}/></td>
                    </tr>
                    <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                      <td style={{fontWeight: '500', paddingTop: '1rem'}}>IS RECYCLED INTO:</td>
                      <td style={{padding: '1rem'}}><TextLoop interval={1500} children={singleRecType.recycledExamples}/></td>
                    </tr>
                  </tbody>
                </table>


                <div ref={extentionRef} className='infoBoxExtention'>
                    <table className='extenstionTable' style={{position: 'absolute', bottom: '2rem'}}>
                      <tbody>
                        <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                          <td style={{fontSize: '.7rem', fontWeight: '500', paddingBottom: '1rem'}}>CAN YOU RECYCLE<br/>THIS NUMBER?</td>
                          <td style={{paddingBottom: '1rem', paddingLeft: '1rem'}}><span style={{fontWeight: '500'}}>{singleRecType.canRecycle}</span> {singleRecType.recycleInfoOne}</td>
                        </tr>
                        <tr style={{fontSize: '.8rem'}}>
                          <td style={{fontWeight: '500', paddingTop: '1rem'}}>PICK UP?<br/>DROP OFF?</td>
                          <td style={{fontSize: '.6rem', paddingTop: '1rem', paddingLeft: '1rem'}}>{singleRecType.recycleInfoTwo}</td>
                        </tr>
                      </tbody>
                    </table>

                    {
                      infoBoxExtended ?   <div ref={arrowRef}
                                                style={{position: 'absolute',
                                                        bottom: '1rem',
                                                        right: '1rem',
                                                        transform: 'rotate(180deg)'}}
                                                onClick={()=> {
                                                  retractInfoBox()
                                                  setInfoBoxExtended(false)
                                                }}>
                                                <DropArrow/>
                                          </div>

                                      :   <div ref={arrowRef}
                                              style={{position: 'absolute',
                                                      bottom: '1rem',
                                                      right: '1rem'}}
                                              onClick={()=> {
                                                extendInfoBox()
                                                setInfoBoxExtended(true)
                                              }}>
                                            <DropArrow/>
                                          </div>
                    }




                    <Link to='/map'>
                      <div className='linkToMapBtn'/>
                    </Link>

                </div>

              </div>

            </div>

          </div> : ''
        }

        </>
  )
}

export default RecycleSymbols

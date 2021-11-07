import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../styleSheets/recycleSymbols.css'
import { ReactComponent as XButton } from '../assets/Close Modal.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as DropArrow } from '../assets/Drop-Down Arrow.svg'
import RecTypeCard from './RecTypeCard'
import GreenerChoices from './GreenerChoices'
import TextLoop from 'react-text-loop'
import { ReactComponent as WhiteArrowIcon } from '../assets/RecycleArrowsWhite.svg'
import { config } from '../Constants'

const url = config.url.baseUrl


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
      axios.get(url + '/plastics')
        .then(res => {
          setRecTypeData(res.data)
        })
        .catch(err => { console.error(err.message) })

    }, [])

    const getById = (id) => {
      axios.get(url + '/plastics' + '/' + id)
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

            <div onClick={()=> {
              slideMenuDown()
              props.closeRecMenu(1000)

            }} id='xBtn'>
              <XButton/>
            </div>

            <h1 className='recMenuTitle'>SELECT YOUR RECYCLE CODE</h1>

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
              <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'space-evenly'}}>
                <span>No</span> <span>recycle</span> <span>code</span>
              </div>
            </div>


          </div>
          <div className='bottomSpacer'/>
        </div>

        {
          showRecTypeModal ?

          <div ref={recShowModalRef} className='showModalWrapper shadow-2xl'>

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
                  <span id='numHeaderSpan'>{singleRecType.recycleNumber}</span>
                  <span id='codeHeaderSpan'>{singleRecType.recycleCode}</span>
                  <div className='headerIconDiv'><WhiteArrowIcon/></div>
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




                    <Link onClick={()=> {props.closeRecMenu()}} to='/map'>
                      <div className='linkToMapBtn'/>
                    </Link>

                </div>

              </div>

            </div>
                <div style={{height: '90%', display: 'flex', flexDirection: 'column-reverse'}}>
                  <GreenerChoices/>
                </div>
          </div> : ''
        }

        </>
  )
}

export default RecycleSymbols

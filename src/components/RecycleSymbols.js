import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../styleSheets/recycleSymbols.css'
import { ReactComponent as XButton } from '../assets/Close Modal.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as DropArrow } from '../assets/Drop-Down Arrow.svg'
import RecTypeCard from './RecTypeCard'
import RecTypeInfoBox from './RecTypeInfoBox'
import GreenerChoices from './GreenerChoices'
import { ReactComponent as WhiteArrowIcon } from '../assets/RecycleArrowsWhite.svg'
import { config } from '../Constants'

const url = config.url.baseUrl


const RecycleSymbols = (props) => {


  const [recTypeData, setRecTypeData] = useState([])
  const [singleRecType, setSingleRecType] = useState({})
  const [showRecTypeModal, setShowRecTypeModal] = useState(false)
  const [infoBoxExtended, setInfoBoxExtended] = useState(false)



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


    const closeRecShowModal = () => {
      recShowModalRef.current.style.animation = 'slideDown2 1s'
      setTimeout(()=> {
        setShowRecTypeModal(false)
      }, 1000)
    }

    const slideMenuDown = () => {
      recMenuRef.current.style.animation = 'slideDown2 1s'
    }


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
              <div className='showPageGrid'>
                  <div className='headerBox'>
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
                  </div>

                  <div className='mainContent'>

                    <RecTypeInfoBox
                        singleRecType={singleRecType}
                        infoBoxExtended={infoBoxExtended}
                        setInfoBoxExtended={setInfoBoxExtended}
                        />

                  </div>

                  <div className='linkComponentToMap' style={infoBoxExtended ? {opacity: '.6'} : {opacity: '1'}}>
                      <Link  onClick={()=> {props.closeRecMenu()}} to='/map'>
                               <div className='linkToMapBtn'/>
                      </Link>
                  </div>

                  <div className='grChoicesDiv' style={infoBoxExtended ? {opacity: '.6'} : {opacity: '1'}}>
                      <GreenerChoices />
                  </div>

              </div>
          </div> : ''
        }

        </>
  )
}

export default RecycleSymbols

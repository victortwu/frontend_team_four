import React, { useRef, useEffect, useState } from 'react'
import { ReactComponent as DropArrow } from '../assets/Drop-Down Arrow.svg'
import TextLoop from 'react-text-loop'
import style from '../cssModules/recTypeInfoBox.module.css'

const RecTypeInfoBox = props => {

  const [array1Loaded, setArray1Loaded] = useState(false)
  const [array2Loaded, setArray2Loaded] = useState(false)

  const extentionRef = useRef()
  const arrowRef = useRef()

    const checkArray1 = () => {
      if ( props.singleRecType.productExamples === [] ) {
        setArray1Loaded(false)
      } else {
        setArray1Loaded(true)
      }
    }

    const checkArray2 = () => {
      if ( props.singleRecType.recycledExamples === [] ) {
        setArray2Loaded(false)
      } else {
        setArray2Loaded(true)
      }
    }


    const extendInfoBox = () => {
      extentionRef.current.style.animation = 'extend .5s forwards'
    }

    const retractInfoBox = () => {
      extentionRef.current.style.animation = 'retract .5s forwards'
    }

  useEffect(()=> {
    setTimeout(()=> {
      checkArray1()
      checkArray2()
    }, 2000)
  }, [])


  return(

        <div className={style.mainContainer}>
          <div className={style.container}>

            <h1 className={style.title}>Number {props.singleRecType.recycleNumber}{' * '}{props.singleRecType.recycleCode}</h1>
            <span className={style.subTitle}>({props.singleRecType.plasticName})</span>

            <table className={style.mainTable}>
              <tbody>
                <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                  <td style={{fontWeight: '500', paddingBottom: '1rem', paddingLeft: '.5rem'}}>IS USED IN...</td>
                  <td style={{paddingBottom: '1rem', paddingLeft: '1rem'}}>
                      {array1Loaded ? <TextLoop interval={2000} children={props.singleRecType.productExamples}/> : ''}
                  </td>
                </tr>
                <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                  <td style={{fontWeight: '500', paddingTop: '1rem', paddingLeft: '.5rem'}}>IS RECYCLED INTO:</td>
                  <td style={{padding: '1rem'}}>
                      {array2Loaded ? <TextLoop interval={2500} children={props.singleRecType.recycledExamples}/> : ''}
                  </td>
                </tr>
              </tbody>
            </table>


            <div ref={extentionRef} className={style.extenstionContainer}>
                <table className={style.extentionTable}>
                  <tbody>
                    <tr style={{fontSize: '.8rem', borderBottom: 'solid 1px var(--mediumGr)'}}>
                      <td style={{fontSize: '.7rem', fontWeight: '500', paddingBottom: '1rem'}}>CAN YOU RECYCLE<br/>THIS NUMBER?</td>
                      <td style={{paddingBottom: '1rem', paddingLeft: '1rem'}}><span style={{fontWeight: '500'}}>{props.singleRecType.canRecycle}</span> {props.singleRecType.recycleInfoOne}</td>
                    </tr>
                    <tr style={{fontSize: '.8rem'}}>
                      <td style={{fontWeight: '500', paddingTop: '1rem'}}>PICK UP?<br/>DROP OFF?</td>
                      <td style={{fontSize: '.6rem', paddingTop: '1rem', paddingLeft: '1rem'}}>{props.singleRecType.recycleInfoTwo}</td>
                    </tr>
                  </tbody>
                </table>


                  {props.infoBoxExtended ?   <div ref={arrowRef}
                                            style={{position: 'absolute',
                                                    bottom: '1rem',
                                                    right: '1rem',
                                                    transform: 'rotate(180deg)'}}
                                            onClick={()=> {
                                              retractInfoBox()
                                              props.setInfoBoxExtended(false)
                                            }}>
                                            <DropArrow/>
                                      </div>

                                  :   <div ref={arrowRef}
                                          style={{position: 'absolute',
                                                  bottom: '1rem',
                                                  right: '1rem'}}
                                          onClick={()=> {
                                            extendInfoBox()
                                            props.setInfoBoxExtended(true)
                                          }}>
                                        <DropArrow/>
                                      </div> }

                          </div>

                  </div>

        </div>
      )
}

export default RecTypeInfoBox

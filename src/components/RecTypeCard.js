import React, { useState } from 'react'
import { ReactComponent as WhiteArrowIcon } from '../assets/RecycleArrowsWhite.svg'
import { ReactComponent as GreenArrowIcon } from '../assets/RecycleArrowsGreen.svg'

const RecTypeCard = props => {

  const [isActive, setIsActive] = useState(false)
  const style = isActive ? {gridArea: props.gridSpot, justifySelf: 'center', backgroundColor: 'var(--darkGr)', color: 'white'}
                        : {gridArea: props.gridSpot, justifySelf: 'center'}


  const activate = () => {
    setIsActive(true)
    setTimeout(()=> {
      setIsActive(false)
    }, 1000)
  }

  return(
            <div
              onClick={()=> {
                props.getById(props.type._id)
                props.setShowRecTypeModal(true)
                activate()
                }}
              id={props.gridSpot}
              style={style}
              className='recTypeBtn'
              >

              <span id='numSpan'>{props.type.recycleNumber}</span>

              <span id='codeSpan'>{props.type.recycleCode}</span>

              <div className='recArrIconDiv'>
                {isActive ? <WhiteArrowIcon/> : <GreenArrowIcon/>}
              </div>

            </div>
  )
}

export default RecTypeCard

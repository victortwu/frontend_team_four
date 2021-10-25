import React, { useState } from 'react'

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
              {props.type.recycleNumber}
              <span>{props.type.recycleCode}</span>
            </div>
  )
}

export default RecTypeCard

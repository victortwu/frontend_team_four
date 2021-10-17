import React from 'react'


const RecycleSymbols = (props) => {
console.log(props.recTypeData)

// wasn't sure how to do this with tailwind so just going to inject the css inline.  Also an effort to keep this component more encapsulated

// in fact, api call can happen here instead of passing in props
const gridPosition = {
  position: 'absolute',
  left: '0',
  top: '8rem',
  right: '0',
  bottom: '0',
  padding: '1rem',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr 1fr',
  gridTemplateAreas: `
                      'area1 area2'
                      'area3 area4'
                      'area5 area6'
                      'area7 areaQ'
                      `,
  gridGap: '1rem'
}

  return(
    <div className='h-4/6 bg-cl1 rounded-md shadow-lg z-10'>
      <div style={gridPosition}>

        {
          props.recTypeData.map(thing => {
            const gridSpot = `area${thing.recycleNumber}`
            return <div
                      key={thing._id}
                      id={gridSpot}
                      style={{gridArea: gridSpot}}
                      className='w-full h-full bg-cl2 text-cl3 text-xl rounded-md shadow-sm flex justify-center items-center'
                      >
                      {thing.recycleNumber}
                    </div>
          })
        }

        <div className='w-full h-full bg-cl2 text-cl3 text-xl rounded-md shadow-sm flex justify-center items-center'>
          ?
        </div>

      </div>



    </div>
  )
}

export default RecycleSymbols

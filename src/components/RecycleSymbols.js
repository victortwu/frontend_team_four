import React from 'react'

const RecycleSymbols = (props) => {
console.log(props.recTypeData)
  return(
    <div className='container absolute top-10 right-20 w-80 h-5/6 bg-blue-100 rounded-md shadow-lg z-10'>
      <div id='recIconCtn'>

        {
          props.recTypeData.map(thing => {
            const gridSpot = `area${thing.recycleNumber}`
            return <div key={thing._id} id={gridSpot} className='w-full h-full bg-gray-100 text-blue-300 text-xl rounded-md shadow-sm flex justify-center items-center'>
              {thing.recycleNumber}
            </div>
          })
        }

      </div>



    </div>
  )
}

export default RecycleSymbols

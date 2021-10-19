import React from 'react'
import { useParams } from 'react-router'


const Display = ()=>{

    const urlParam = useParams()
    const upc = urlParam['upc']
    console.log(upc)

    return (
        <div>
            <h1>Display Page</h1>
            <h2>{upc}</h2>   
        </div>
    )
}

export default Display
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router'


const Display = ()=>{

    const urlParam = useParams();
    const upc = urlParam['upc']
    const history = useHistory()

    const getUpcInfo =async()=>{
        const response = await fetch (`http://localhost:5000/upc/${upc}`)
        const responseData = await response.json()
        console.log(responseData)
        if (responseData['success']==false){
            history.push('/')
        }
    }


    useEffect(()=>{getUpcInfo()},[])
    
    

    return (
        <div>
            <h1>Display Page</h1>
            <h2>{upc}</h2>   
        </div>
    )
}

export default Display
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';

const Display = ()=>{

    const history = useHistory()
    const upc = useSelector((state)=>state.materialsInfo.upc)
    

    const getUpcInfo =async()=>{
        const response = await fetch (`http://localhost:5000/upc/${upc}`)
        const responseData = await response.json()
        console.log(responseData)
        if (responseData['num_results']==0){
            history.push('/')
        }else{
            const materials = responseData['result'][`${upc}`]['materials'] 
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
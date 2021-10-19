import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { assignMaterials } from '../reduxToolkit/materialsSlice';

const Display = ()=>{

    const history = useHistory()
    const upc = useSelector((state)=>state.materialsInfo.upc)
    const dispatch = useDispatch
    

    const getUpcInfo =async()=>{
        const response = await fetch (`http://localhost:5000/upc/${upc}`)
        const responseData = await response.json()
        console.log(responseData)
        if (responseData['num_results']===0){
            history.push('/')
        }else{
            dispatch(assignMaterials(responseData['result'][`${upc}`]['materials']))
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
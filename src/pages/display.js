import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { assignMaterials } from '../reduxToolkit/materialsSlice';

const Display = ()=>{

    const history = useHistory()
    const upc = useSelector((state)=>state.materialsInfo.upc)
    const latitude = useSelector((state)=>state.locationInfo.latitude)
    const longitude = useSelector((state)=>state.locationInfo.longitude)
    const materials = useSelector((state)=>state.materialsInfo.materials)
    const dispatch = useDispatch
    const [materialIDs, setMaterialIDs] = useState([])
    

    const getUpcInfo =async()=>{
        const response = await fetch (`http://localhost:5000/upc/${upc}`)
        const responseData = await response.json()
        console.log(responseData)
        if (responseData['num_results']===0){
            history.push('/')
        }else{
            const idNumbers = responseData['result'][`${upc}`]['materials'].map(material=>material.material_id)
            setMaterialIDs(idNumbers)
            
        }
    }

    

    const getLocationInfo =async()=>{
        const locationResponse = await fetch (`http://localhost:5000/locations/${latitude}/${longitude}/[${materialIDs}]`)
        const locationResponseData = await locationResponse.json()
        console.log(locationResponseData)
    }


    useEffect(()=>{getUpcInfo()},[])
    dispatch(assignMaterials(materialIDs))

   

    return (
        <div>
            <h1>Display Page</h1>
            <h2>{upc}</h2>
            <button onClick={getLocationInfo}>Find Recycling Centers</button>
        </div>
    )
}

export default Display
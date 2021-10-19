import React, {useState} from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { assignUPC } from '../reduxToolkit/materialsSlice'
import { assignLatitude, assignLongitude } from '../reduxToolkit/locationSlice'

const Search = ()=> {

    let history = useHistory()
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        e.preventDefault();
        dispatch(assignUPC(e.target.value))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position.coords)
                dispatch(assignLatitude(position.coords.latitude))
                dispatch(assignLongitude(position.coords.longitude))
            })
        }
        history.push(`/display`)
    }

    return (
        <div>
            <h1>Search Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Enter UPC"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search
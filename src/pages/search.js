import React, {useState} from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { assignUPC } from '../reduxToolkit/materialsSlice'

const Search = ()=> {

    let history = useHistory()
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        e.preventDefault();
        dispatch(assignUPC(e.target.value))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
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
import React, {useState} from 'react'
import { useHistory } from 'react-router'

const Search = ()=> {

    let history = useHistory()

    const [upc, setUpc] = useState()

    const handleChange = (e) =>{
        e.preventDefault();
        setUpc(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        history.push(`/display/${upc}`)
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
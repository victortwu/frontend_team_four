import React, {useState} from 'react'

const Search = ()=> {

    const [upc, setUpc] = useState()

    const handleChange = (e) =>{
        e.preventDefault();
        setUpc(e.target.value)
    }

    return (
        <div>
            <h1>Search Page</h1>
            <form>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Enter UPC"
                />
            </form>
        </div>
    )
}

export default Search
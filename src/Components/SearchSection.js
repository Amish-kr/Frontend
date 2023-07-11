import React, { useState } from "react"
import "./SearchSection.css"

const SearchSection = ({ setSerchString }) => {
  const [value, setValue] = useState("")
 
  const onChange = (event) => {
    setValue(event.target.value)
    setSerchString(event.target.value)
  }

  const onSearch = (searchTerm) => { 
    console.log("search", searchTerm)
  }  

  return (
    <div className='bb-1'>
      <div className='bb-2'>
        <div className='bb-3'>
          <input
            placeholder='Search a Courses'
            type='text'
            value={value}
            onChange={onChange}
          />
          <button className='bb-4' onClick={() => onSearch(value)}>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchSection

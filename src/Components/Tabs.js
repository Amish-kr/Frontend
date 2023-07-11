import { useState } from "react"
import SearchSection from "./SearchSection"
import Courses from "./Courses"
import Notes from "./Notes";
import Ebooks from "./Ebooks"

function Tabs() {
  const [toggleState, setToggleState] = useState(1)

  const [serchString, setSerchString] = useState("")

  const toggleTab = (index) => { 
    setToggleState(index) 
  }

  return ( 
    <>
      {/* Added by Shreya - start*/}
      <div className='aa-3'>
        <h1 className='aa-4 aa-5'>Learning center</h1>
        <div className='aa-6'>
          <button
            className={`aa-7 +
              ${toggleState === 1 ? "aa-8" : ""}`}
            onClick={() => toggleTab(1)}
          >
            Courses
          </button>
          <button
            className={`aa-7 +
              ${toggleState === 2 ? "aa-8" : ""}`}
            onClick={() => toggleTab(2)}
          >
            Notes
          </button>
          <button
            className={`aa-7 +
              ${toggleState === 3 ? "aa-8" : ""}`}
            onClick={() => toggleTab(3)}
          >
            Ebooks
          </button>
        </div>
      </div>
      {/* Added by Shreya - end */}

      {toggleState===2 ?  " " :  <SearchSection setSerchString={setSerchString} />}

      <div className='aa-9'>
        <div
          className={toggleState === 1 ? "aa-10  aa-11" : "aa-10"}
        >
          <Courses
            serchString={serchString}
          />
        </div>

        <div
          className={toggleState === 2 ? "aa-10  aa-11" : "aa-10"}
        >
           <Notes />
        </div>

        <div
          className={toggleState === 3 ? "aa-10  aa-11" : "aa-10"}
        >
          <Ebooks serchString={serchString}/>
        </div>
      </div>
    </>
  )
}

export default Tabs

import React, { useState } from "react"
import CompanyPolicy from "./CompanyPolicy.jsx"
import CompanyFaqs from "./CompanyFaqs.jsx"
import HeaderToggelButtons from "./HeaderToggelButtons"

const PolicyMaster = () => {
  const [component, setComponent] = useState("Company Policies")
  const changeComponentHandler = (component = "Company Policies") => {
    setComponent(component)
  }

  return (
    <div className='flex-main-container'>
      <HeaderToggelButtons
        title={"Policy Master"}
        components={["Company Policies", "Company FAQ"]}
        changeComponentHandler={changeComponentHandler}
        activeComponent={component}
      />
      {component === "Company Policies" ? <CompanyPolicy /> : <CompanyFaqs />}
    </div>
  )
}

export default PolicyMaster

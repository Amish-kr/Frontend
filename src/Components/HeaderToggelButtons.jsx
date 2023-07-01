import React from "react"
import "../Styles/HeaderToggelButtons.css"

const HeaderToggelButtons = ({
  title,
  components,
  changeComponentHandler,
  activeComponent,
}) => {
  return (
    <div className='header-toggle-buttons-frame'>
      <h1 className='header-toggle-buttons-title valign-text-middle'>
        {title}
      </h1>
      <div className='header-toggle-buttons-group'>
        {components.map((component, i) => (
          <button
            key={i}
            className={`header-toggle-button +
              ${
                activeComponent === component
                  ? "header-toggle-button-active"
                  : ""
              }`}
            onClick={() => changeComponentHandler(component)}
          >
            {component}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HeaderToggelButtons

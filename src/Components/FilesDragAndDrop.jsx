import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"

const FilesDragAndDrop = ({ onUpload }) => {
  const drop = useRef(null)
  const Files = useRef(null)
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer

    if (files && files.length) {
      onUpload(files)
    }
  }

  const handleBrowse = (event) => {
    const { files } = event.target

    if (files && files.length) {
      onUpload(files)
    }
  }

  const browseFiles = () => {
    Files.current.click()
  }

  useEffect(() => {
    console.log("here")
    if (drop.current) {
      drop.current.addEventListener("dragover", handleDragOver)
      drop.current.addEventListener("drop", handleDrop)
    }
    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver)
      drop.current?.removeEventListener("drop", handleDrop)
    }
  }, [])

  return (
    <div ref={drop} className='drag-and-drop-files valign-text-middle'>
      <div className='container-center-horizontal'>
        <span className='span0'>Drag and drop files here or</span>
        <input
          style={{ display: "none" }}
          ref={Files}
          type='file'
          onChange={handleBrowse}
          multiple
        />
        <button
          onClick={browseFiles}
          className='span1 browse poppins-medium-azure-radiance-14px'
        >
          browse
        </button>
      </div>
    </div>
  )
}

FilesDragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
}

export default FilesDragAndDrop

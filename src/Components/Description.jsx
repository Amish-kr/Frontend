const Description = ({imgsrc,text}) => {
  return (
    <div className="descriptioncontainer">
        <img src={`/${imgsrc}`} alt="invite group"/>
        <p>{text}</p>
    </div>
  )
}

export default Description
const Participants = () => {
  const items = [
    "/assets/pic1.jpg",
    "/assets/pic2.jpg",
    "/assets/pic3.jpg",
    "/assets/pic4.jpg",
    "/assets/pic5.jpg",
    "/assets/pic6.jpg",
  ];

  return (
    <div className="participantscontainer">
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            zIndex: `${items.length - index}`,
            left: `${25 * index}px`
          }}
        >
          <img src={item} alt="profile" />
        </div>
      ))}
      <p>+3 Interns working on this task</p>
    </div>
  )
}

export default Participants
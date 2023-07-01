import React, { useState, useEffect, useRef } from "react";
const News = () => {
  const [showAllNews, setShowAllNews] = useState(false);
  const [expandedNews, setExpandedNews] = useState(null);

  const toggleShowAllNews = () => {
    setShowAllNews(!showAllNews);
  };

  const expandNews = (index) => {
    setExpandedNews(index);
  };

  const news = [
    {
      id: 1,
      text: "We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome].",
      additionalInfo: "Additional information for news item 1",
    },
    {
      id: 2,
      text: "We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome].",
      additionalInfo: "Additional information for news item 2",
    },
    {
      id: 3,
      text: "We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome].",
      additionalInfo: "Additional information for news item 3",
    },
    {
      id: 4,
      text: "We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome]We're excited to announce the launch of our new course, [Course Name]! This course is designed to help you [briefly describe the course objective or outcome].",
      additionalInfo: "Additional information for news item 4",
    },
    // Add more news here if needed
  ];

  const displayedNews = showAllNews ? news : news.slice(0, 2);
  const notificationRef = useRef(null);
  const newsRef = useRef(null);
  let topPosition = "calc(78% + 600px)";
  useEffect(() => {
    const calculateTopPosition = () => {
      const notificationElement = notificationRef.current;

      if (notificationElement) {
        const screenWidth = window.innerWidth;
        let topPosition;

        if (screenWidth < 900) {
          topPosition = "calc(100% + 100px)";
        } else {
          topPosition = "calc(78% + 600px)";
        }

        notificationElement.style.top = topPosition;
      }
    };

    calculateTopPosition();
    window.addEventListener("resize", calculateTopPosition);

    return () => {
      window.removeEventListener("resize", calculateTopPosition);
    };
  }, []);

  return (
    <div
      ref={newsRef}
      style={{
        top: topPosition,
        left: "10%",
        right: "10%",
        height: "68%",
        borderRadius: "20px",
        border: "3px solid #000000",
        background: "rgba(255, 255, 255, 0.8)",
        zIndex: "1",
        padding: "20px",
      }}
    >
      {/* News */}
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "20px",
          color: "#000000",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ margin: 0 }}>News</h3>
          {news.length > 2 && (
            <button
              onClick={toggleShowAllNews}
              style={{
                border: "none",
                background: "none",
                color: "#0478FF",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {showAllNews ? "View Less" : "View More"}
            </button>
          )}
        </div>
        <hr
          style={{
            marginTop: "10px",
            width: "100%",
            border: "none",
            borderTop: "2px solid rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          style={{
            marginTop: "20px",
            maxHeight: "100%",
            overflow: "auto",
          }}
        >
          {displayedNews.map((newsItem, index) => (
            <div
              key={newsItem.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src="images/Ellipse 219.png"
                alt="Bullet"
                style={{
                  width: "23px",
                  height: "23px",
                  marginRight: "10px",
                }}
              />
              <p
                style={{
                  margin: 0,
                  color: "#000000",
                }}
              >
                {newsItem.text}{" "}
                {expandedNews === newsItem.id && (
                  <span style={{ color: "#000000" }}>
                    {newsItem.additionalInfo}
                  </span>
                )}
                {expandedNews !== newsItem.id && (
                  <span
                    style={{
                      color: "#0478FF",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => expandNews(newsItem.id)}
                  >
                    View details
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

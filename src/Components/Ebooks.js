import React, { useState, useEffect } from "react";
import "./Courses.css";
import EbookCard from "./EbookCard";

const EbooksCard = ({ serchString = "" }) => {
  const ebookType = [
    "Music Courses Ebook",
    "Graphic Design Courses Ebook",
    "UI/UX Design Courses Ebook",
    "Marketing Courses Ebook",
    "Development Courses Ebook",
    "Personal Development Courses Ebook",
    "Business Courses Ebook",
  ];
  const [ebooks, setEbooks] = useState([]);
  const [noOfElements, setNoOfElements] = useState(4);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/Allebooks`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setEbooks(data))
      .catch((error) => console.log(error));
  }, []);

  const loadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };
  // console.log(ebooks);

  const filteredEbooksByType = ebookType.map((type) => {
    const filteredEbooks = ebooks.filter(
      (ebook) =>
        ebook.type.toLowerCase() === type.toLowerCase() &&
        ebook.title.toLowerCase().includes(serchString.toLowerCase())
    );
    return { type, ebooks: filteredEbooks };
  });

  return (
    <div>
      {filteredEbooksByType.map(({ type, ebooks }, i) => (
        <section key={i}>
          <div className="yy-1">
            <h1 className="yy-2">{type}</h1>
            <div className="yy-3">
              {ebooks.slice(0, noOfElements).map((ebook, i) => (
                <EbookCard ebook={ebook} key={i} />
              ))}
            </div>
          </div>
          {ebooks.length > noOfElements && (
            <button className="yy-4" onClick={loadMore}>
              View More Ebooks
            </button>
          )}
        </section>
      ))}
    </div>
  );
};

export default EbooksCard;

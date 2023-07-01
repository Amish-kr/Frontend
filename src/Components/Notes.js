import React from 'react';
import "./Notes.css";

const Notes = (lecNo) => {
    const handleDownload = async() => {
        try {
            const response = await fetch(
              `${process.env.REACT_APP_API_ENDPOINT}/learningcenter/download`,
              {
                method:"POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            console.log(response);
            if (response.status === 200) {
              const data = await response.json();
              console.log(data);
              const pdfUrl = data;
              const downloadLink = document.createElement('a');
              downloadLink.href = pdfUrl;
              downloadLink.download = `Lecture-lesson.pdf`;
              document.body.appendChild(downloadLink);
              downloadLink.click(); 
              document.body.removeChild(downloadLink);
            } else {
              throw new Error("Error fetching courses");
            }
          } catch (error) {
            console.log(error);
          }
      };
  return (
    <div>

 
    <div className='cc-1'>
      <div className='cc-2 cc-4'>
         Lesson 1
      </div>
      <div className='cc-3 cc-4'>
         Lesson 2
      </div>
      <div className='cc-3 cc-4'>
         Lesson 3
      </div>
      <div className='cc-3 cc-4'>
         Lesson 4
      </div>
      <div className='cc-3 cc-4'>
         Lesson 5 
      </div>
      <div className='cc-3 cc-4'>
         Lesson 6
      </div>
      <div className='cc-3 cc-4'>
         Lesson 7
      </div>
      <div className='cc-3 cc-4'>
         Lesson 8
      </div>
    </div>


    <div className='frame-1000001663'>
         <div className='frame-1000001661'>
            <div className='lecture-111'>
                Lecture -1
            </div>
         </div>
         <div className='frame-1000001662'>
            <p className='what-is-graphic-designinggg'>
                What is Graphic Designing ???
            </p>
            <div className='frame-1000001654'>
                <div className='download-notesss' onClick={handleDownload}>
                    Download Notes
                </div>
            </div>
         </div>
    </div>
    <div className='frame-1000001663'>
    <div className='frame-1000001661'>
            <div className='lecture-111'>
                Lecture -2
            </div>
         </div>
         <div className='frame-1000001662'>
            <p className='what-is-graphic-designinggg'>
                What is Graphic Designing ???
            </p>
            <div className='frame-1000001654'>
                <div className='download-notesss' onClick={handleDownload}>
                    Download Notes
                </div>
            </div>
         </div>
    </div>
    <div className='frame-1000001663'>
    <div className='frame-1000001661'>
            <div className='lecture-111'>
                Lecture -3
            </div>
         </div>
         <div className='frame-1000001662'>
            <p className='what-is-graphic-designinggg'>
                What is Graphic Designing ???
            </p>
            <div className='frame-1000001654'>
                <div className='download-notesss' onClick={handleDownload}>
                    Download Notes
                </div>
            </div>
         </div>
    </div>
    <div className='frame-1000001663'>
    <div className='frame-1000001661'>
            <div className='lecture-111'>
                Lecture -4
            </div>
         </div>
         <div className='frame-1000001662'>
            <p className='what-is-graphic-designinggg'>
                What is Graphic Designing ???
            </p>
            <div className='frame-1000001654'>
                <div className='download-notesss' onClick={handleDownload}>
                    Download Notes
                </div>
            </div>
         </div>
    </div>
    <div className='frame-1000001663'>
         <div className='frame-1000001661'>
            <div className='lecture-111'>
                Lecture -5
            </div>
         </div>
         <div className='frame-1000001662'>
            <p className='what-is-graphic-designinggg'>
                What is Graphic Designing ???
            </p>
            <div className='frame-1000001654'>
                <div className='download-notesss' onClick={handleDownload}>
                    Download Notes
                </div>
            </div>
         </div> 
    </div> 
    
    <button className='cc-10'>View More</button>


    </div>
  )
}

export default Notes

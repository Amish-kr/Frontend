import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Searchdata.css';
import './Components/footer'
import Footer from './Components/footer';
const Searchdata = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/Alldatas`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSearch = () => {
    if (startDate && endDate) {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getTime() >= startDate.getTime() &&
          itemDate.getTime() <= endDate.getTime()
        );
      });
  
      setFilteredData(filtered);
    }
  };
  
  const handleExport = () => {
    alert('Export functionality will be implemented here.');
  };
  
  const handleReset = () => {
    setFilteredData(data);
    setStartDate(null);
    setEndDate(null);
  };
  
  return (
    <div>
      <div className="conta">
        <div className="rowing">
          <span className="labeling">Start Date:</span>
          <div className="form-grouping">
            <DatePicker
              className="inputing"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <span className="labeling">End Date:</span>
          <div className="form-grouping">
            <DatePicker
              className="inputing"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div className="form-grouping">
            <button
              id="searing"
              onClick={handleSearch}
              className="btn btn-primary09"
            >
              Search
            </button>
          </div>
          <div className="form-group">
            <button
              id="exping"
              onClick={handleExport}
              className="btn btn-primary09"
            >
              Export
            </button>
          </div>
          <div className="form-group">
            <button
              id="resetting"
              onClick={handleReset}
              className="btn btn-primary09"
            >
              Reset
            </button>
          </div>
        </div>
        <Footer />
      </div>
  
      <table className="table09">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Date</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Overtime</th>
            <th>Work</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td>{item.starttime}</td>
              <td>{item.endtime}</td>
              <td>{item.overtime}</td>
              <td>{item.work}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Searchdata;
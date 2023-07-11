import React, { useState, useEffect } from "react";
import "../Styles/AdminPage.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [employeeNames, setEmployeeNames] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/AllemployeeNames`,
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
        setEmployeeNames(responseData);
        // console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/getAdminTask`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const taskData = await response.json();
          setTasks(taskData);
          // console.log(taskData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTaskData();
  }, []);

  const handleDownload = (data) => {
    if (!data) {
      alert("No file found");
    } else {
      const pdfUrl = data;
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = `Task-Data.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform input validations
    if (
      !validateTitle() ||
      !validateDescription() ||
      !validateDueDate() ||
      !validateAssignedTo()
    ) {
      // If any validation fails, return without submitting the form
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/createTask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: title,
            description: description,
            date: new Date().toISOString(), // Assuming you want to use the current date as the task creation date
            deadline: dueDate,
            assignedTo: assignedTo,
          }),
        }
      );

      if (response.ok) {
        // Task created successfully
        const responseData = await response.json();
        const { taskId } = responseData; // Assuming your backend returns the ID of the created task
        const newTask = {
          _id: taskId, // Use the returned taskId as the task ID
          topic: title,
          description: description,
          date: new Date().toISOString(),
          deadline: dueDate,
          teamMember: assignedTo,
        };

        // Add the new task to the tasks array
        setTasks([...tasks, newTask]);

        // Reset form inputs
        setTitle("");
        setDescription("");
        setDueDate("");
        setAssignedTo("");

        // Show success message
        setShowSuccessMessage(true);
        window.location.reload(false);
        // Reset success message after 2 seconds
        // setTimeout(() => {
        //   setShowSuccessMessage(false);
        //   window.location.reload(false);
        // }, 2000);
      } else {
        navigate("/");
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const validateTitle = () => {
    if (!title) {
      alert("Please enter a title");
      return false;
    }
    return true;
  };

  const validateDescription = () => {
    if (!description) {
      alert("Please enter a description");
      return false;
    }
    return true;
  };

  const validateDueDate = () => {
    if (!dueDate) {
      alert("Please select a due date");
      return false;
    }
    return true;
  };

  const validateAssignedTo = () => {
    if (!assignedTo) {
      alert("Please select an employee");
      return false;
    }
    return true;
  };

  return (
    <div className="page009">
      <div className="admin-page009">
        <h1 className="dash009"> Admin Page</h1>

        <div className="button-container009">
          <button
            className={!showForm ? "active009" : ""}
            onClick={() => setShowForm(false)}
          >
            Assigned Tasks
          </button>

          <button
            className={showForm ? "active009" : ""}
            onClick={() => setShowForm(true)}
          >
            Assign Task
          </button>
        </div>

        {showForm ? (
          <form className="form009" onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              className="input009"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description:</label>
            <textarea
              className="text009"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label>Due Date:</label>
            <input
              className="date009"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <label>Assign To:</label>
            <select
              className="select009"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employeeNames.map((employee, index) => (
                <option key={index} value={employee}>
                  {employee}
                </option>
              ))}
            </select>

            <button className="submit009" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <table className="table009">
            <thead>
              <tr>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Doc</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.teamMember}</td>
                  <td>{task.deadline.split("T")[0]}</td>
                  <td>{task.status}</td>
                  <td>
                    <button onClick={() => handleDownload(task.file[0])}>
                      {" "}
                      File{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showSuccessMessage && (
          <div className="popup009">
            <div className="popup-content009">
              <p>Task assigned successfully</p>
              <button
                className="submit009"
                onClick={() => setShowSuccessMessage(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;

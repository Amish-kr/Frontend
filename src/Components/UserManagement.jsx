import React, { useState, useEffect } from "react";
import Chance from "chance";
import "../Styles/employeemanagement.css";

const EmployeeManagement = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [suspensionDays, setSuspensionDays] = useState(0);
  const [status, setStatus] = useState({
    isEdit: false,
    id: null,
    isDelete: false,
    isSuspend: false,
    isBlock: false,
    isAlreadyBlocked: false,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/getEmployeeDetails`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
          // console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          setEmployeeData(data);
          // console.log(data);
        } else {
          console.log("hfdjlv");
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, []);

  const UserSearch = {
    handleToggleSearch: () => {
      setSearchVisible(!searchVisible);
      setSearchQuery("");
    },

    handleSearch: (e) => {
      const { value } = e.target;
      setSearchQuery(value);
    },

    handleReset: () => {
      setSearchVisible(false);
      setSearchQuery("");
    },
  };

  const deleteFunction = {
    handleDeleteRender: (id) => {
      // console.log(id);
      setStatus({
        isEdit: false,
        isDelete: true,
        id: id,
        isSuspend: false,
        isBlock: false,
      });
    },

    handleDelete: async (id) => {
      // console.log(id);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/deleteUser/${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        // console.log(response);
        if (response.status === 200) {
          setEmployeeData((prevData) =>
            prevData.filter((employee) => employee._id !== id)
          );
          setStatus({ ...status, isDelete: false, id: null });
          // console.log(data);
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        console.error(error);
      } 
    },
    handleCancel: () => {
      setStatus({ ...status, isDelete: false, id: null });
    },
  };

  const editFunction =  {
    handleEditRender: (id,username, email, Role, isAdmin) => {
      setStatus({
        isEdit: true,
        isDelete: false,
        id: id,
        isSuspend: false,
        isBlock: false,
      });
      // console.log(isAdmin);
      setEditedData((prevEditedData) => {
        return {
          ...prevEditedData,
          username: username,
          email: email,
          Role: Role,
          isAdmin: isAdmin,
        };
      });
    },

    handleEdit: async (id) => {
      // console.log(editedData);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/editUser/${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(editedData),
          }
        );
        // console.log(response);
        if (response.status === 200) {
          // const data = await response.json();
          setEmployeeData((prevData) =>
          prevData.map((employee) => {
            if (employee._id === id) {
              return { ...employee, ...editedData };
            }
            return employee;
            })
          );
          setStatus({ ...status, isEdit: false, id: null });
          // window.location.reload(false);
          // console.log(data);
        } else {
          throw new Error("Failed to edit data");
        }
      } catch (error) {
        console.error(error);
      } 
      // window.location.reload(false);
    },

    handleCancel: () => {
      setStatus({ ...status, isEdit: false, id: null });
    },
  };

  const suspendFunction = {
    handleSuspendRender: (id) => {
      setStatus({
        isEdit: false,
        isDelete: false,
        id: id,
        isSuspend: true,
        isBlock: false,
      });
    },

    handleSuspend:async (id, suspensionDays) => {
      // console.log(suspensionDays);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/suspendUser/${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({suspensionDays}),
          }
        );
        // console.log(response);
        if (response.status === 200) {
          setStatus({ ...status, isSuspend: false, id: null });
          setSuspensionDays(0);
        } else {
          throw new Error("Failed to suspend user");
        }
      } catch (error) {
        console.error(error);
      } 
    },

    handleCancel: () => {
      setStatus({ ...status, isSuspend: false, id: null });
    },
  };

  const blockFunction = {
    handleBlockRender: async (id) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/findBlockedStatus/${id}`,
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
          const data = await response.json();
          if(data.isAlreadyBlocked === true){
            setStatus({
              isEdit: false,
              isDelete: false,
              id: id,
              isSuspend: false,
              isAlreadyBlocked: data.isAlreadyBlocked,
              isBlock: false,
            });
          }
          else{
            setStatus({
              isEdit: false,
              isDelete: false,
              id: id,
              isSuspend: false,
              isAlreadyBlocked: false,
              isBlock: true,
            });
          }
          
        } else {
          throw new Error("Failed to edit data");
        }
      } catch (error) {
        console.error(error);
      } 
    },

    handleBlock: async (id) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/blockUser/${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          setStatus({ ...status, isBlock: false, id: null });
        } else {
          throw new Error("Failed to block data");
        }
      } catch (error) {
        console.error(error);
      } 
    },
    handleUnBlock:async (id) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/unblockUser/${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          setStatus({ ...status, isAlreadyBlocked: false, id: null });
        } else {
          throw new Error("Failed to unblock data");
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleCancel: () => {
      setStatus({ ...status, isBlock: false, id: null });
    },
  };

  const filteredData = employeeData.filter((employee) =>
    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="Employee_management_wrapper">
      <h1>Employee Management</h1>
      <div className="Employee_wrapper">
        <table className="Employee_table">
          <thead>
            <tr>
              <th onClick={UserSearch.handleToggleSearch}>
                <div className="Employee_table_username">
                  <span>User</span>
                  {searchVisible && (
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={UserSearch.handleSearch}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={UserSearch.handleReset}
                    />
                  )}
                </div>
              </th>
              <th>Email</th>
              <th>isAdmin</th>
              <th>Role</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <div className="Employee_user">
                    <img src={employee.profile_image} alt={employee.username} />
                    <h4>
                      {status.id === employee._id && status.isEdit ? (
                        <input
                          type="text"
                          name="username"
                          defaultValue={employee.username}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      ) : (
                        employee.username
                      )}
                    </h4>
                  </div>
                </td>
                <td>
                  {status.id === employee._id && status.isEdit ? (
                    <input
                      type="email"
                      name="email"
                      defaultValue={employee.email}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {status.id === employee._id && status.isEdit ? (
                    <input
                    type="checkbox"
                      name="isAdmin"
                      defaultChecked={employee.isAdmin}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                  ) : (
                    String(employee.isAdmin)
                  )}
                </td>
                <td>
                  {status.id === employee._id && status.isEdit ? (
                    <input
                      type="text"
                      name="Role"
                      defaultValue={employee.Role}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          [e.target.name]: e.target.value,
                        })
                      }                  
                    />
                  ) : (
                    employee.Role
                  )}
                </td>

                {/* edit logic */}
                {status.id === employee._id &&
                (status.isDelete ||
                  status.isSuspend ||
                  status.isBlock) ? null : (
                  <td
                    className="Employee_edit"
                    colSpan={status.id === employee._id && status.isEdit ? 4 : 1}
                  >
                    <div>
                      <button
                        onClick={() =>
                          editFunction.handleEditRender(employee._id, employee.username, employee.email, employee.Role, employee.isAdmin)
                        }
                        style={{
                          backgroundColor:
                            status.id === employee._id && status.isEdit
                              ? "green"
                              : "",
                        }}
                      >
                        Edit
                      </button>
                      {status.id === employee._id && status.isEdit && (
                        <div>
                          <p>Edit this employee?</p>
                          <button
                            onClick={() => editFunction.handleEdit(employee._id)}
                          >
                            Yes
                          </button>
                          <button onClick={editFunction.handleCancel}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )}



                {/* delete logic */}
                {status.id === employee._id &&
                (status.isEdit || status.isSuspend || status.isBlock) ? null : (
                  <td
                    className="Employee_delete"
                    colSpan={
                      status.id === employee._id && status.isDelete ? 4 : 1
                    }
                  >
                    <div>
                      <button
                        onClick={() =>
                          deleteFunction.handleDeleteRender(employee._id)
                        }
                        style={{
                          backgroundColor:
                            status.id === employee._id && status.isDelete
                              ? "red"
                              : "",
                        }}
                      >
                        Delete
                      </button>
                      {status.id === employee._id && status.isDelete && (
                        <div>
                          <p>Are you sure you want to delete this employee?</p>
                          <button
                            onClick={() =>
                              deleteFunction.handleDelete(employee._id)
                            }
                          >
                            Yes
                          </button>
                          <button onClick={deleteFunction.handleCancel}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )}

                {/* supense logic */}
                {status.id === employee._id &&
                (status.isDelete || status.isBlock || status.isEdit) ? null : (
                  <td
                    className="Employee_suspend"
                    colSpan={
                      status.id === employee._id && status.isSuspend ? 4 : 1
                    }
                  >
                    <div>
                      <button
                        onClick={() =>
                          suspendFunction.handleSuspendRender(employee._id)
                        }
                        style={{
                          backgroundColor:
                            status.id === employee._id && status.isSuspend
                              ? "red"
                              : "",
                        }}
                      >
                        Suspend
                      </button>
                      {status.id === employee._id && status.isSuspend && (
                        <div>
                          <input
                            type="number"
                            name="suspensionDays"
                            placeholder="Enter number of days"
                            value={suspensionDays}
                            onChange={(e) => setSuspensionDays(e.target.value)}
                          />
                          <p> you want to Suspend this employee?</p>
                        
                          <button onClick={() => suspendFunction.handleSuspend(employee._id, suspensionDays || 0)}>
                            Yes
                          </button>
                          <button onClick={suspendFunction.handleCancel}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )}

                {/* block logic */}
                {status.id === employee._id &&
                (status.isDelete ||
                  status.isSuspend ||
                  status.isEdit) ? null : (
                  <td
                    className="Employee_block"
                    colSpan={
                      status.id === employee._id && status.isBlock ? 4 : 1
                    }
                  >
                    <div>
                      <button
                        onClick={() =>
                          blockFunction.handleBlockRender(employee._id)
                        }
                        style={{
                          backgroundColor:
                            status.id === employee._id && (status.isBlock)
                              ? "red"
                              : status.id === employee._id && status.isAlreadyBlocked
                              ? "green"
                              : ""
                        }}
                      >
                        Block
                      </button>
                      {status.id === employee._id && status.isBlock && (
                        <div>
                          <p>Are you sure you want to Block this employee?</p>
                          <button
                            onClick={() =>
                              blockFunction.handleBlock(employee._id)
                            }
                          >
                            Yes
                          </button>
                          <button onClick={blockFunction.handleCancel}>
                            No
                          </button>
                        </div>
                      )}
                      {status.id === employee._id && status.isAlreadyBlocked && (
                        <div>
                          <p>
                            Are you sure you want to{" "}
                            <u style={{ fontWeight: "bold" }}>Un</u> Block this employee?
                          </p>
                          <button
                            onClick={() =>
                              blockFunction.handleUnBlock(employee._id)
                            }
                          >
                            Yes
                          </button>
                          <button onClick={blockFunction.handleCancel}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EmployeeManagement;

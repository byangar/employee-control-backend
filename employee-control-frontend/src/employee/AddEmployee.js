import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AddEmployee() {
  // useNavigate is a hook that provides a function to programmatically switch routes.
  let navigation = useNavigate();

  // Local state for storing employee information
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: "",
  });
  // Unstructure the employee object to facilitate access to its properties
  const { name, department, salary } = employee;

  // Function to handle changes in form fields
  const onInputChange = (e) => {
    // Updates the employee's status with the values of the form fields.
    // The spread operator (...) is used to copy the properties of the employee object.
    // [e.target.name]: e.target.value is used to update the corresponding property
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents the default behaviour of the form (which is to reload the page)
    const urlBase = "http://localhost:8080/employees-app/employees";
    await axios.post(urlBase, employee); // Sends a POST request to the backend with the employees information
    navigation("/"); // Redirects the user to the home page
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Add Employee</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required={true}
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            required={true}
            value={department}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="salary"
            name="salary"
            required={true}
            value={salary}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sn me-3">
            
            Submit
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Return
          </a>
        </div>
      </form>
    </div>
  );
}

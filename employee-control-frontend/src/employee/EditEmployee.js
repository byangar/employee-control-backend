import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  const urlBase = "http://localhost:8080/employees-app/employees";

  // useNavigate is a hook that provides a function to programmatically switch routes.
  let navigation = useNavigate();

  // useParams is a hook that provides access to URL parameters.
  const { id } = useParams(); // Extracts the employee ID from the URL parameters

  // Local state for storing employee information
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: "",
  });
  // Unstructure the employee object to facilitate access to its properties
  const { name, department, salary } = employee;

  // useEffect is a hook that executes a side-effect function.
  // In this case, it loads the employee's data when the component is mounted.
  useEffect(() => {
    loadEmploye();
  }, []); // Empty dependencies indicate that the effect is executed only once when mounting the component.

  const loadEmploye = async () => {
    try {
      // Make a GET request to the API to get the employee's data with the given ID
      const result = await axios.get(`${urlBase}/${id}`);
      // Update the local status with the employee data obtained.
      setEmployee(result.data);
    } catch (error) {
      console.error("Error loading employee data:", error);
    }
  };

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
    await axios.put(`${urlBase}/${id}`, employee); // Sends a POST request to the backend with the employees information
    navigation("/"); // Redirects the user to the home page
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Edit Employee</h3>
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
            Save
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Return
          </a>
        </div>
      </form>
    </div>
  );
}

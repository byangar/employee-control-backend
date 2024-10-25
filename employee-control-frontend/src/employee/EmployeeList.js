import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import ExportButton from "../components/ExportButton";
import SearchBar from "../components/SearchBar";

export default function EmployeeList() {
  const urlBase = "http://localhost:8080/employees-app/employees";
  const [employees, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get(urlBase);
    setEmployee(result.data);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      loadEmployees();
    } else {
      const filteredEmployees = employees.filter((employee) =>
        employee.department.toLowerCase().includes(query.toLowerCase())
      );
      setEmployee(filteredEmployees);
    }
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    loadEmployees();
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h2>Employee System</h2>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Employee</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th>
              <ExportButton />
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <th scope="row">{employee.idEmployee}</th>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>
                <NumericFormat
                  value={employee.salary}
                  displayType={"text"}
                  thousandSeparator=","
                  prefix={"€"}
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
              <td className="text-center">
                <Link
                  to={`/edit/${employee.idEmployee}`}
                  className="btn btn-warning btn-sm me-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee(employee.idEmployee)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

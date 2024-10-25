import React from "react";

export default function About() {
  return (
    // Main container to center the content and add top margin
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Column that is centered and takes up 8 out of 12 columns on medium and larger screens */}
        <div className="col-md-8">
          {/* Card component with a shadow for a modern, elevated look */}
          <div className="card shadow-lg">
            <div className="card-body">
              {/* Title of the card, centered and with some bottom margin */}
              <h2 className="card-title text-center mb-4">
                Employee Control Application
              </h2>
              {/* Description section with bold heading */}
              <p className="card-text">
                <strong>Description</strong>
                <br />
                The Employee Control Application is a full-stack solution for
                managing employee information. It is built using Spring Boot for
                the backend and React for the frontend. The application provides
                functionalities to create, read, update, and delete (CRUD)
                employee records.
              </p>
              {/* Technologies used section with a bulleted list */}
              <p className="card-text">
                <strong>Technologies Used</strong>
                <br />
                <ul>
                  <li>
                    <strong>Frontend:</strong> React
                  </li>
                  <li>
                    <strong>Backend:</strong> Spring Boot
                  </li>
                  <li>
                    <strong>Database:</strong> Mysql
                  </li>
                </ul>
              </p>
              {/* Features section with a bulleted list */}
              <p className="card-text">
                <strong>Features</strong>
                <br />
                <ul>
                  <li>
                    <strong>Employee View:</strong> Displays a list of all
                    employees with options to edit and delete.
                  </li>
                  <li>
                    <strong>Add Employee:</strong> Allows adding new employees
                    to the database.
                  </li>
                  <li>
                    <strong>Edit Employee:</strong> Enables modification of
                    existing employee information.
                  </li>
                  <li>
                    <strong>Delete Employee:</strong> Allows employees to be
                    removed from the database.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

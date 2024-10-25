// Import React library for creating components
import React from "react";
// Import axios for making HTTP requests
import axios from "axios";

// Define a functional component called ExportButton
const ExportButton = () => {
  // Define an asynchronous function to handle the export process
  const handleExport = async () => {
    try {
      // Make a GET request to the server to fetch the Excel file
      const response = await axios.get(
        "http://localhost:8080/employees-app/employees/export",
        {
          responseType: "blob", // Specify that the response is a binary large object (blob)
        }
      );

      // Create a URL for the downloaded blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create a new anchor element to trigger the download
      const link = document.createElement("a");
      // Set the URL as the href attribute of the anchor element
      link.href = url;
      // Specify the name of the file to be downloaded
      link.setAttribute("download", "employees.xlsx");
      // Append the anchor element to the document body
      document.body.appendChild(link);
      // Trigger a click event on the anchor element to start the download
      link.click();
      // Remove the anchor element from the document body
      link.remove();
    } catch (error) {
      // Log any errors that occur during the export process
      console.error("Error exporting employees:", error);
    }
  };

  // Render a button that calls handleExport when clicked
  return (
    <button onClick={handleExport} className="btn btn-outline-light btn-sm">
      Export to Excel
    </button>
  );
};

// Export the component for use in other parts of the application
export default ExportButton;

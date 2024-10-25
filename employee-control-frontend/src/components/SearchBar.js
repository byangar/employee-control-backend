import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

// Define the SearchBar component, taking searchQuery and handleSearch as props
export default function SearchBar({ searchQuery, handleSearch }) {
  // State to control whether the search icon should be shown or not
  const [showIcon, setShowIcon] = useState(true);

  return (
    <div className="d-flex justify-content-end">
      {/* Container with relative positioning to place the icon inside the input */}
      <div style={{ position: "relative", width: "250px" }}>
        {/* Input field for the search */}
        <input
          type="text"
          className="form-control me-2 mb-3"
          placeholder="Search department..."    // Placeholder text inside the input field
          value={searchQuery}                 // Controlled input value from props
          onChange={handleSearch}             // Trigger the search logic when the input changes
          onBlur={() => setShowIcon(true)}    // Show the search icon when input loses focus
          style={{ width: "100%", paddingLeft: "30px" }}  // Add padding to make space for the icon
        />

        {/* Conditionally render the search icon */}
        {showIcon && (
          <FaSearch
            style={{
              position: "absolute",             // Position the icon inside the input field
              left: "10px",                     // Move the icon 10px from the left edge
              top: "35%",                       // Center the icon vertically
              transform: "translateY(-50%)",    // Adjust to ensure the icon stays centered
              pointerEvents: "none",            // Prevent the icon from interfering with input clicks
              color: "#aaa"                     // Set the color of the icon
            }}
          />
        )}
      </div>
    </div>
  );
}

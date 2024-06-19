import React from "react";

function Display() {
  return (
    <div>
      <div className="search-main">
        <select className="select-field" id="doctorSelect">
          <option value="">Select Doctor</option>
          {/* Add options dynamically */}
        </select>
        <select className="select-field" id="patientSelect">
          <option value="">Select Patient</option>
          {/* Add options dynamically */}
        </select>
      </div>
      <button className="search-btn">Search</button>
      <div></div>
    </div>
  );
}

export default Display;

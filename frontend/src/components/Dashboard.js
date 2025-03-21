// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/Dashboard.css";

// function Dashboard() {
//   const [sections, setSections] = useState(["CS101", "Lab Reports"]);
//   const [newSection, setNewSection] = useState("");

//   const addSection = () => {
//     if (newSection.trim()) {
//       setSections([...sections, newSection.trim()]);
//       setNewSection("");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="add-section">
//         <input
//           type="text"
//           placeholder="Enter Section Name"
//           value={newSection}
//           onChange={(e) => setNewSection(e.target.value)}
//         />
//         <button onClick={addSection}>+ Add Section</button>
//       </div>
      
//       <div className="section-list">
//         {sections.map((section, index) => (
//           <Link key={index} to={`/section/${section}`} className="section">
//             {section}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = ({ onSelectSection }) => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");

  // Load Sections from Backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/sections")
      .then(response => setSections(response.data))
      .catch(error => console.error("Error fetching sections:", error));
  }, []);

  // Add New Section
  const handleAddSection = () => {
    if (!newSection.trim()) return;

    axios.post("http://localhost:5000/api/sections/add", { name: newSection })
      .then(response => {
        setSections([...sections, response.data]);
        setNewSection("");
      })
      .catch(error => console.error("Error adding section:", error));
  };

  const handleDeleteSection = (sectionId) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;
  
    axios.delete(`http://localhost:5000/api/sections/delete/${sectionId}`)
      .then(() => {
        setSections(sections.filter(section => section._id !== sectionId));
        console.log("Section deleted successfully!");
      })
      .catch(error => console.error("Error deleting section:", error));
  };
  
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="add-section">
        <input
          type="text"
          placeholder="Enter Section Name"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
        />
        <button onClick={handleAddSection}>Add Section</button>
      </div>
      <div className="section-list">
  {sections.map(section => (
    <div key={section._id} className="section-item">
      <button className="section" onClick={() => onSelectSection(section)}>
        {section.name}
      </button>
      <FaTrash
        className="delete-icon"
        onClick={() => handleDeleteSection(section._id)}
      />
    </div>
  ))}
</div>


    </div>
  );
};

export default Dashboard;

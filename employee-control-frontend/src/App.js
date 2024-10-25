import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./employee/EmployeeList.js";
import Navigation from "./template/Navigation.js";
import AddEmployee from "./employee/AddEmployee.js";
import EditEmployee from "./employee/EditEmployee.js";
import About from "./template/About.js";


function App() {
  return (
    <div className="container">
      {/* The BrowserRouter component provides the routing context */}
      <BrowserRouter>
        {/* Navigation component for links and menus */}
        <Navigation />

        {/* Define the application routes */}
        <Routes>
          {/* Route for the main URL "/" that renders the EmployeeList component */}
          <Route exact path="/" element={<EmployeeList />} />
          <Route exact path="/add" element={<AddEmployee/>} /> 
          <Route exact path="/edit/:id" element={<EditEmployee/>} /> 
          <Route exact path="/about" element={<About/>} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

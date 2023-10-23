import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Additem from "./component/Additem";
import Edititem from "./component/Edititem";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {
  return (
    <div>
      {
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/additem" element={<Additem />} />
            <Route path="/edititem/:id" element={<Edititem />} />
          </Routes>
        </Router>
      }
    </div>
  );
}

export default App;

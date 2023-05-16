import logo from './logo.svg';
import './App.css';
import Dropdown from './Dropdown.js';
import FaceRec from './Face';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<FaceRec/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

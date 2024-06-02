import "./App.css";
import Signup from "./Component/Signup";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Login from "./Component/Login";
import Notes from "./Component/Notes";
import Createnotes from "./Component/Createnotes";
import Story from "./Pages/Story";
import Navbar from "./Component/Navbar";
import Images from "./Pages/Images";
import Document from "./Pages/Document";
import Private from "./Component/Private";
import { useContext } from "react";
import { Themecontext } from "./Component/privateRoute/Contextapi";
import Uploadimages from "./Pages/Uploadimages";
import Uploadpdf from "./Pages/Uploadpdf";

function App() {
  const { show } = useContext(Themecontext);
  const navigate = useNavigate();

  const getkoen = localStorage.getItem("tokenno");
  return (
    <div className="App">
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notespage" element={<Notes />} />
        <Route path="crnotes" element={<Createnotes />} />
        <Route path="/story" element={getkoen ? <Notes /> : <Login />} />
        <Route path="/document" element={getkoen ? <Document /> : <Login />} />
        <Route path="/images" element={getkoen ? <Images /> : <Login />} />
        <Route path="/addimg" element={<Uploadimages />} />
        <Route path="/addpdf" element={<Uploadpdf />} />

        {/* <Route path="/viewdetails" element={}/> */}
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;

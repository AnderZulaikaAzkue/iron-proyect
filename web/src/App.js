import { Route, Routes } from "react-router-dom";
import ProjectsList from "./components/projects/projects-list/ProjectsList";

import Contact from "./pages/Contact";
import About from "./pages/About";


function App() {
  return (
    <>
    <Routes>
     
      <Route path="/contact" element= {<Contact/>} />
      <Route path="/about" element=  {<About/>} />
      </Routes>
      <ProjectsList />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
{/* import ProjectDetail from "./pages/ProjectDetail"; */}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/project/:slug" element={<ProjectDetail />} /> */}
      </Routes>
    </>
  );
}

export default App;

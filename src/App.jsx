import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Layout from "@/layouts/Layout";
{/* import ProjectDetail from "./pages/ProjectDetail"; */ }

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Landing /></Layout>} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
      {/* <Route path="/project/:slug" element={<ProjectDetail />} /> */}
    </Routes>
  );
}

export default App;

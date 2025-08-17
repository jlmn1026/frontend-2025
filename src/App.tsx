import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "./components/CommonLayout";
import Home from "./pages/Home";
import Tinnitus from "./pages/Tinnitus";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tinnitus-care" element={<Tinnitus />} />

          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

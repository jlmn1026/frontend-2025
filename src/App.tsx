import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "./components/CommonLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route path="/" element={<>Top Page</>} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

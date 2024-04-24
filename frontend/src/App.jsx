import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Componets/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard></AdminDashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

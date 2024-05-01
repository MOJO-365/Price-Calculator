import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Componets/AdminDashboard/AdminDashboard";
import Navbar from "./Componets/Navbar/Navbar";
import ViewQuestions from "./Componets/ViewQuestions/ViewQuestions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path="/new" element={<Navbar />}></Route>
          <Route
            path="/viewquestions"
            element={
              <>
                <Navbar />
                <ViewQuestions />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

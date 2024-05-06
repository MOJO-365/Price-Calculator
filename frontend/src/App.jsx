import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Componets/AdminDashboard/AdminDashboard";
import Navbar from "./Componets/Navbar/Navbar";
import ViewQuestions from "./Componets/ViewQuestions/ViewQuestions";
import Register from "./Componets/Register/Register";
import Signin from "./Componets/Signin/Signin";
import ViewFlow from "./Componets/ViewFlow/ViewFlow";
import SelectFlow from "./Componets/SelectFlow/SelectFlow";
import UserView from "./Componets/UserView/UserView";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          {/* <Route path="/tree" element={<TreeView />}></Route> */}
          <Route
            path="/viewquestions"
            element={
              <>
                <Navbar />
                <ViewQuestions />
              </>
            }
          ></Route>
          <Route
            path="/viewflows"
            element={
              <>
                <Navbar />
                <ViewFlow />
              </>
            }
          ></Route>

          <Route path="/register" element={<Register />}></Route>
          <Route path="/selectflow" element={<SelectFlow />}></Route>
          <Route path="/flowlayout" element={<UserView />}></Route>
          <Route path="/" element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

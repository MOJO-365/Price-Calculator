import "./adminDashboard.css";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddQuestionModal from "./AddQuestionModal/AddQuestionModal";
import AddFlowModal from "./AddFlowModal/AddFlowModal";
import ManageUsers from "./ManageUsers/ManageUsers";
import axios from "../../axiosConfig";
// import zIndex from "@mui/material/styles/zIndex";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = () => {
      const tokenFromCookie = Cookies.get("access_token");
      if (!tokenFromCookie) {
        navigate("/")
      } else {
        setToken(token)
      }
    }
    fetchToken();
  }, []);
  const [questionModal, setQuestionModal] = useState(false);
  const [flowModal, setFlowModal] = useState(false);
  const [usersModal, setUsersModal] = useState(false);
  // const [usersData, setUsersData] = useState([]);
  const openUsersModal = () => {
    setUsersModal(true);
  };

  const closeUsersModal = () => {
    setUsersModal(false);
  };
  const openQuestionModalFunction = () => {
    setQuestionModal(true);
  }

  const closeQuestionModalFunction = () => {
    setQuestionModal(false);
  }

  const openFlowModalFunction = () => {
    setFlowModal(true);
  }

  const closeFlowModalFunction = () => {
    setFlowModal(false);
  }
  
  return (
    <>
      <Navbar sx={{ zIndex: 1 }} />
      <Box sx={{ pt: 12, px: 2, zIndex: 2 }}>
        <div className="allButtons">
          <div className="frontBtns">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F8B31C",
                color: "#1B5180",
                "&:hover": {
                  backgroundColor: "#1B5180",
                  color: "#F8B31C",
                },
                mx: 1,
              }}
              onClick={openQuestionModalFunction}
            >
              Add Question
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F8B31C",
                color: "#1B5180",
                "&:hover": {
                  backgroundColor: "#1B5180",
                  color: "#F8B31C",
                },
                mx: 1,
              }}
              onClick={openFlowModalFunction}
            >
              Add Flow
            </Button>
          </div>
          <div className="backBtns">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F8B31C",
                color: "#1B5180",
                "&:hover": {
                  backgroundColor: "#1B5180",
                  color: "#F8B31C",
                },
                mx: 1,
              }}
              onClick={openUsersModal}
            >
              Manage Users
            </Button>
          </div>
        </div>

        {questionModal && (
          <AddQuestionModal
            isOpen={openQuestionModalFunction}
            onClose={closeQuestionModalFunction}
          />
        )}

        {flowModal && (
          <AddFlowModal
            isOpen={openFlowModalFunction}
            onClose={closeFlowModalFunction}
          />
        )}

        {usersModal && (
          <ManageUsers 
            isOpen={openUsersModal}
            onClose={closeUsersModal}
          />
        )}
      </Box>
    </>
  );
};

export default AdminDashboard;
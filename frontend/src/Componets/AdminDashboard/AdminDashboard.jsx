import "./adminDashboard.css";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddQuestionModal from "./AddQuestionModal/AddQuestionModal";
import AddFlowModal from "./AddFlowModal/AddFlowModal";
// import zIndex from "@mui/material/styles/zIndex";

const AdminDashboard = () => {
  const [questionModal, setQuestionModal] = useState(false);
  const [flowModal, setFlowModal] = useState(false);

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
      </Box>
    </>
  );
};

export default AdminDashboard;
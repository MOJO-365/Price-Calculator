import "./viewFlow.css";
import axios from "../../axiosConfig";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import ViewEditModal from "./ViewEditModal/ViewEditModal";


const ViewFlow = () => {
  const [allFlows, setAllFlows] = useState([
  {
    flowname: "f1"
  },
  {
    flowname: "f2"
  },
  {
    flowname: "f1"
  },
  {
    flowname: "f2"
  }
  ]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [viewFlowIndex, setViewFlowIndex] = useState(0);
  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const openViewEditModal = () => {
    setViewEditModal(true);
  }

  const closeViewEditModal = () => {
    setViewEditModal(false);
  }
  const handleDelete = async () => {

  }

  return (
    <>
      <div className="viewFlows">
        <Grid container spacing={3}>
          {Array.isArray(allFlows) &&
            allFlows?.map((flow, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <div className="flowSectionDiv">
                  <div className="row1">
                    <p>{`${flow.flowname}`}</p>
                  </div>

                  {/* <div className="questionAdd">
                    {`${ques.questionType} Type`}
                  </div> */}

                  <div className="rightBottomDiv">
                    <button
                      onClick={() => {
                        setViewFlowIndex(index);
                        openViewEditModal();
                      }}
                    >
                      View & Edit
                    </button>
                    
                    <button
                      onClick={() => {
                        setDeleteIndex(index);
                        openDeleteDialog();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>


        {viewEditModal && (
          <ViewEditModal
            isOpen={openViewEditModal}
            onClose={closeViewEditModal}
            // flowData={questions[deleteIndex]}
          />
        )} 

        <Dialog
          open={deleteDialog}
          onClose={closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="custom-dialog"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will completely remove the flow & its questions
              from the the database.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>Disagree</Button>
            <Button onClick={handleDelete}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ViewFlow;

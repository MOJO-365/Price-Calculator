import "./viewFlow.css";
import axios from "../../axiosConfig";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ViewEditModal from "./ViewEditModal/ViewEditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFlow = () => {
  const [allFlows, setAllFlows] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [viewFlowIndex, setViewFlowIndex] = useState(0);

  const getAllFlows = async () => {
    await axios.get("/questions-and-flows/get-all-flows").then((resp) => {
      console.log(resp.data.data)
      if (resp.status === 200) {
        
        setAllFlows(resp.data.data);
        // const combinedFlows = resp.data.data.reduce((acc, obj) => {
        //   return acc.concat(obj.flows);
        // }, []);
        // console.log(combinedFlows);
      }
    });
  }

  useEffect(() => {
    getAllFlows();
  }, []);

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
    const flowname = allFlows[deleteIndex]._id;
    console.log(allFlows[deleteIndex]);
    try {
      await axios
      .delete(`/questions-and-flows/delete-flow/${flowname}`)
      .then((resp) => {
        console.log(resp.data.data);
        if (resp.status === 200) {
          toast.success("Flow Deleted Successfully")
          getAllFlows();
          closeDeleteDialog();
        } else {
          toast.error("Delete Error");
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="viewFlows">
        <Grid container spacing={3}>
          {Array.isArray(allFlows) &&
            allFlows?.map((flow, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <div className="flowSectionDiv">
                  <div className="row1">
                    <p>{`${flow._id}`}</p>
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
            flowSelected={allFlows[viewFlowIndex]}
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

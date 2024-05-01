import { useEffect, useState } from "react";
import "./viewQuestions.css";
import axios from "../../axiosConfig";
import Grid from "@mui/material/Grid";
// import ViewItems from "./ViewItems";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ViewAnswerModal from "./ViewAnswerModal";

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  const getAllQuestions = async () => {
    await axios.get("/questions-and-flows/get-all-questions").then((resp) => {
      console.log(resp.data.data[0]);
      setQuestions(resp.data.data);
      
    });
  }
  useEffect(() => {
    getAllQuestions();
  }, []);

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  }

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  }

  const closeAnswerModal = () => {
    setAnswerModal(false);
  }

  const openAnswerModal = () => {
    setAnswerModal(true);
  }
  return (
    <>
      <div className="viewQues">
        <Grid container spacing={3}>
          {Array.isArray(questions) &&
            questions?.map((ques, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <div className="questionSectionDiv">
                  <div className="row1">
                    <p>{`${ques.questionText}`}</p>
                  </div>

                  <div className="questionAdd">
                    {`${ques.questionType} Type`}
                  </div>

                  <div className="rightBottomDiv">
                    <button onClick={openAnswerModal}>View Answers</button>
                    <button onClick={openDeleteDialog}>Delete</button>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>

        {answerModal && (
            <ViewAnswerModal
              isOpen={openAnswerModal}
              onClose={closeAnswerModal}
            />
          )}

          {/* {editSupplierModal && (
            <EditSupplierDetails
              isOpen={openEditSupplierModal}
              onClose={closeEditSupplierModal}
              allRawMaterials={rawMaterials}
              supplierDetails={questions[supplierSelected]}
            />
          )} */}

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
              This will completely remove the question & its possible answers
              from the the database.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
            onClick={closeDeleteDialog}
            >
              Disagree
            </Button>
            <Button
            // onClick={handleDeleteSupplier}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ViewQuestions;
import "./addQuestionModal.css";
// import TextField from "@mui/material/TextField";
import { TextField, RadioGroup, Radio, FormControlLabel, Button, FormControl, FormLabel, Typography, Checkbox } from '@mui/material';
import { useState } from "react";
import axios from "../../../axiosConfig";

const AddQuestionModal = ({ isOpen, onClose }) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState('boolean');
  const [numAnswers, setNumAnswers] = useState(2);
  const [answers, setAnswers] = useState([{ answerValue: '', isQuantifyable: false }]);
  const handleSubmit = async (e) => {
    console.log("Submitted question:", questionText);
    console.log("Question type:", questionType);
    console.log("Number of answers:", numAnswers);
    console.log("Answers:", answers);
    e.preventDefault();

    // await axios.get("/questions-and-flows/get-all-questions").then((resp) => {
    //   console.log(resp.data.data);
    // });
    let ans;
    if (questionType === 'boolean') {
      ans = [
        {
          answerValue: 'yes',
        },
        {
          answerValue: 'no'
        }
      ];

      setAnswers(ans);
    }
    await axios
      .post("/questions-and-flows/create-question", {
        questionText: questionText,
        questionType: questionType,
        noOfPossibleAnswers: numAnswers,
        possibleAnswers: ans,
      })
      .then((resp) => {
        console.log(resp.data.data);
      });
  }

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answerValue = value;
    setAnswers(newAnswers);
  }

  const handleQuantifiableChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[index].isQuantifyable = !newAnswers[index].isQuantifyable;
    setAnswers(newAnswers);
  }
  return (
    <>
      {isOpen && (
        <>
          <div className="addQuestionModal">
            <div className="closingModalDiv" onClick={onClose}>
              <span> &times;</span>
            </div>

            <div className="addQuestionModalContent">
              <div>
                <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 600 }}>
                  ADD NEW QUESTION
                </Typography>
                <form onSubmit={handleSubmit} className="formContent">
                  <TextField
                    label="Enter Question"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    multiline
                    fullWidth
                  />

                  <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">
                      Select Question Type
                    </FormLabel>
                    <RadioGroup
                      row
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                    >
                      <FormControlLabel
                        value="boolean"
                        control={<Radio />}
                        label="Yes/No"
                      />
                      <FormControlLabel
                        value="number"
                        control={<Radio />}
                        label="Integer"
                      />
                      <FormControlLabel
                        value="string"
                        control={<Radio />}
                        label="String"
                      />
                    </RadioGroup>
                  </FormControl>

                  {questionType === "number" && (
                    <div>
                      <TextField
                        type="number"
                        label="Number of Possible Answers"
                        value={numAnswers}
                        onChange={(e) => {
                          const count = parseInt(e.target.value);
                          setNumAnswers(count);
                          setAnswers(
                            Array.from({ length: count }, () => ({
                              answerValue: "",
                              isQuantifyable: false,
                            }))
                          );
                        }}
                        fullWidth
                        margin="normal"
                      />

                      {answers.map((answer, index) => (
                        <div key={index} className="answerAndQuantity">
                          <TextField
                            type="number"
                            label={`Answer ${index + 1}`}
                            value={answer.answerValue}
                            onChange={(e) =>
                              handleAnswerChange(index, e.target.value)
                            }
                            margin="normal"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={answer.isQuantifyable}
                                onChange={() => handleQuantifiableChange(index)}
                              />
                            }
                            label="Quantifiable"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {questionType === "string" && (
                    <div>
                      <TextField
                        type="number"
                        label="Number of Possible Answers"
                        value={numAnswers}
                        onChange={(e) => {
                          const count = parseInt(e.target.value);
                          setNumAnswers(count);
                          setAnswers(
                            Array.from({ length: count }, () => ({
                              answerValue: "",
                              isQuantifyable: false,
                            }))
                          );
                        }}
                        fullWidth
                        margin="normal"
                      />

                      {answers.map((answer, index) => (
                        <div key={index} className="answerAndQuantity">
                          <TextField
                            // type="number"
                            label={`Answer ${index + 1}`}
                            value={answer.answerValue}
                            onChange={(e) =>
                              handleAnswerChange(index, e.target.value)
                            }
                            margin="normal"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={answer.isQuantifyable}
                                onChange={() => handleQuantifiableChange(index)}
                              />
                            }
                            label="Quantifiable"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <br></br>
                  <Button
                    type="submit"
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
                    // onClick={openQuestionModalFunction}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddQuestionModal;
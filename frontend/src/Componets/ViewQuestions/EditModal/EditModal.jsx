import "./editModal.css";
import { TextField, RadioGroup, Radio, FormControlLabel, Button, FormControl, FormLabel, Typography, Checkbox } from '@mui/material';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EditModal = ({ isOpen, onClose, questionData }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [qData, setQData] = useState(questionData);
  const [questionText, setQuestionText] = useState(questionData.questionText);
  const [questionType, setQuestionType] = useState(questionData.questionType === 'integer' ?  'number' : questionData.questionType);
  const [numAnswers, setNumAnswers] = useState(questionData.noOfPossibleAnswers);
  const [answers, setAnswers] = useState(questionData.possibleAnswers);

  // console.log(questionText)
  // console.log(questionType);
  // console.log(numAnswers);
  // console.log(answers);
  const [yesNoAnswer, setYesNoAnswer] = useState([
    {
      answerValue: "yes",
      cost: 0,
      isQuantifyable: false,
    },
    {
      answerValue: "no",
      cost: 0,
      isQuantifyable: false,
    },
  ]);

  useEffect(() => {
    if (questionData.questionType === 'boolean') {
      setYesNoAnswer(questionData.possibleAnswers);
    }

    const fetchToken = () => {
      const tokenFromCookie = Cookies.get("access_token");
      if (!tokenFromCookie) {
        navigate("/");
      } else {
        setToken(tokenFromCookie);
      }
    };
    fetchToken();
  }, [])
  const handleYesNoQuantifiableCheck = (isChecked, label) => {
    const answerData = [...yesNoAnswer];
    const index = label === "yes" ? 0 : 1;
    answerData[index] = {
      ...answerData[index],
      isQuantifyable: isChecked,
    };
    setYesNoAnswer(answerData);
  };

  const handleYesNoCostCheck = (cost, label) => {
    const answerData = [...yesNoAnswer];
    const index = label === "yes" ? 0 : 1;
    answerData[index] = {
      ...answerData[index],
      cost: cost,
    };
    setYesNoAnswer(answerData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questionText === "" || questionType === "") {
      toast.error("Please add the details first.");
      return;
    }

    if (questionType === "boolean") {
      const isCostMissing = yesNoAnswer.some((answer) => {
        return answer.isQuantifyable && answer.cost === 0;
      });

      if (isCostMissing) {
        toast.error("Please specify cost for all quantifiable answers.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      try {
        await axios
          .put(`/questions-and-flows/update-question/${questionData._id}`, {
            questionText: questionText,
            questionType: questionType,
            noOfPossibleAnswers: 2,
            possibleAnswers: yesNoAnswer,
          }, {
            headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
          },
          })
          .then((resp) => {
            console.log(resp.data.data);
            if (resp.status === 200) {
              toast.success("Data edited successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: clearValues(),
              });
              return;
            } 
          });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    } else {
      const isCostMissing = answers.some((answer) => {
        return answer.isQuantifyable && answer.cost === 0;
      });

      if (isCostMissing) {
        toast.error("Please specify cost for all quantifiable answers.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const somethingEmpty = answers.some((answer) => {
        return answer.answerValue == null;
      });

      if (somethingEmpty) {
        toast.error("Please add answers for all the possible options.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      try {
        await axios
          .put(`/questions-and-flows/update-question/${questionData._id}`, {
            questionText: questionText,
            questionType: questionType,
            noOfPossibleAnswers: numAnswers,
            possibleAnswers: answers,
          }, {
            headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
          },
          })
          .then((resp) => {
            console.log(resp.data.data);
            if (resp.status === 200) {
              toast.success("Data edited successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: clearValues(),
              });
              return;
            }
          });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    }
  };

  const clearValues = () => {
    setQuestionType("");
    setQuestionText("");
    setAnswers([{ answerValue: null, cost: 0, isQuantifyable: false }]);
    setNumAnswers(1);
    setYesNoAnswer([
      {
        answerValue: "yes",
        cost: 0,
        isQuantifyable: false,
      },
      {
        answerValue: "no",
        cost: 0,
        isQuantifyable: false,
      },
    ]);
  };
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      answerValue: value,
    };
    // newAnswers[index].answerValue = value;
    setAnswers(newAnswers);
  };

  const handleQuantifiableChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      isQuantifyable: !newAnswers[index].isQuantifyable,
    };
    // newAnswers[index].isQuantifyable = !newAnswers[index].isQuantifyable;
    setAnswers(newAnswers);
  };

  const handleCostChange = (index, cost) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      cost: cost,
    };
    setAnswers(newAnswers);
  };


  return (
    <>
      {isOpen && (
        <>
          <ToastContainer />
          <div className="editModalContent">
            <div className="closingModalDiv" onClick={onClose}>
              <span> &times;</span>
            </div>
            <div className="addQuestionModalContent">
              <div>
                <Typography
                  variant="h5"
                  sx={{ marginTop: 2, fontWeight: 600, color: "#1B5180" }}
                >
                  EDIT QUESTION
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
                  {questionType === "boolean" && (
                    <>
                      <div className="yesNoSection">
                        <div className="answerAndQuantity">
                          <div className="quantifiableSection">
                            <Typography variant="subtitle1">Yes</Typography>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={yesNoAnswer[0].isQuantifyable}
                                  onChange={(e) =>
                                    handleYesNoQuantifiableCheck(
                                      e.target.checked,
                                      "yes"
                                    )
                                  }
                                />
                              }
                              label="Quantifiable"
                            />
                          </div>
                          {/* {yesNoAnswer[0].isQuantifyable && ( */}
                            <TextField
                              type="number"
                              label="Cost for Yes"
                              value={yesNoAnswer[0].cost}
                              onChange={(e) =>
                                handleYesNoCostCheck(e.target.value, "yes")
                              }
                              margin="normal"
                            />
                          {/* )} */}
                        </div>
                        <div className="answerAndQuantity">
                          <div className="quantifiableSection">
                            <Typography variant="subtitle1">
                              No &nbsp;
                            </Typography>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={yesNoAnswer[1].isQuantifyable}
                                  onChange={(e) =>
                                    handleYesNoQuantifiableCheck(
                                      e.target.checked,
                                      "no"
                                    )
                                  }
                                />
                              }
                              label="Quantifiable"
                            />
                          </div>
                          {/* {yesNoAnswer[1].isQuantifyable && ( */}
                            <TextField
                              type="number"
                              label="Cost for No"
                              value={yesNoAnswer[1].cost}
                              onChange={(e) =>
                                handleYesNoCostCheck(e.target.value, "no")
                              }
                              margin="normal"
                            />
                          {/* )} */}
                        </div>
                      </div>
                    </>
                  )}
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
                          {/* {answer.isQuantifyable && ( */}
                            <TextField
                              type="number"
                              label={`Cost for Answer ${index + 1}`}
                              value={answer.cost} // Assuming answer has a cost property
                              onChange={(e) =>
                                handleCostChange(index, e.target.value)
                              }
                              margin="normal"
                            />
                          {/* )} */}
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
                          {/* {answer.isQuantifyable && ( */}
                            <TextField
                              type="number"
                              label={`Cost for Answer ${index + 1}`}
                              value={answer.cost}
                              onChange={(e) =>
                                handleCostChange(index, e.target.value)
                              }
                              margin="normal"
                            />
                          {/* )} */}
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
                    SAVE
                  </Button>
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
                    onClick={() => onClose()}
                  >
                    DISCARD
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

export default EditModal;
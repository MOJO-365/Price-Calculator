import "./viewEditModal.css";
import { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import { Modal, Button, Checkbox, FormControlLabel, TextField, Typography, Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const ViewEditModal = ({ isOpen, onClose, flowSelected }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  // console.log("flow:",flowSelected)
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // this will be received from frontend of view flows
  // const [flowData, setFlowData] = useState([
  //   {
  //     flowName: "demo_flow",
  //     currQuestionId: "6635d7161adf9892e8108d5d",
  //     answerValue: "Yes",
  //     nextQuestionId: "6635d9171adf9892e8108d71",
  //     isRoot: false,
  //     nextQuestion: {
  //       _id: "6635d9171adf9892e8108d71",
  //       questionText: "Question 3",
  //       questionType: "string",
  //       noOfPossibleAnswers: 1,
  //       possibleAnswers: [
  //         {
  //           answerValue: "ghi",
  //           cost: 100,
  //           isQuantifyable: true,
  //         },
  //       ],
  //       createdAt: "2024-05-04T06:43:35.800Z",
  //       updatedAt: "2024-05-04T06:43:35.800Z",
  //       __v: 0,
  //     },
  //   },
  //   {
  //     flowName: "demo_flow",
  //     currQuestionId: "6635d9031adf9892e8108d6f",
  //     answerValue: "No",
  //     nextQuestionId: "663610a21adf9892e8108d7c",
  //     isRoot: true,
  //     nextQuestion: {
  //       _id: "663610a21adf9892e8108d7c",
  //       questionText: "Question added",
  //       questionType: "string",
  //       noOfPossibleAnswers: 1,
  //       possibleAnswers: [
  //         {
  //           answerValue: "ghi",
  //           cost: 100,
  //           isQuantifyable: true,
  //         },
  //       ],
  //       createdAt: "2024-05-04T06:43:35.800Z",
  //       updatedAt: "2024-05-04T06:43:35.800Z",
  //       __v: 0,
  //     },
  //   },
  //   {
  //     flowName: "demo_flow",
  //     currQuestionId: "663610a21adf9892e8108d7c",
  //     answerValue: "No",
  //     nextQuestionId: null,
  //     isRoot: true,
  //     nextQuestion: null,
  //   },
  // ]);

  const [flowData, setFlowData] = useState(flowSelected.flows)

  const [flowname, setFlowname] = useState(flowSelected._id);
  const [rootIndex, setRootIndex] = useState(-1);
  const [leafIndex, setLeafIndex] = useState({
    questionid: null,
    answerValue: null,
  });

  const [editFlow, setEditFlow] = useState([]);
  // let objLeaf = null;
  const getAllQuestions = async () => {
    await axios.get("/questions-and-flows/get-all-questions").then((resp) => {
      if (resp.status === 200) {
        setQuestions(resp.data.data);
        const questionIdsSet = new Set();
        const data = resp.data.data;
        flowData.forEach((item) => {
          questionIdsSet.add(item.currQuestionId);
          questionIdsSet.add(item.nextQuestionId);
        });

        const questionIds = Array.from(questionIdsSet);
        // console.log(questionIds)
        const filteredQuestions = data.filter((question) =>
          questionIds.includes(question._id)
        );
        setSelectedOptions(filteredQuestions);
        // console.error("ff", filteredQuestions)
        const questionIdWithIsRootTrue = flowData.find((item) => item.isRoot);

        const questionIdWithNextNull = flowData.find(
          (item) => item.nextQuestionId === null
        );

        if (questionIdWithIsRootTrue) {
          const questionId = questionIdWithIsRootTrue.currQuestionId;
          const idx = questionIds.findIndex((obj) => obj === questionId);
          setRootIndex(idx);
        }

        if (questionIdWithNextNull) {
          const questionId = questionIdWithNextNull.currQuestionId;
          const answer = questionIdWithNextNull.answerValue;
          const obj = {
            questionid: questionId,
            answerValue: answer,
          };
          // console.log(obj)
          // objLeaf = obj;
          setLeafIndex(obj);
        }
      }
    });
  };

  const getFlowByFlowName = async () => {
    await axios.post(`/questions-and-flows/get-flow/${flowSelected._id}`).then((resp) => {
      if (resp.status === 200) {
        setEditFlow(resp.data.data);
      }
    });
  }
  useEffect(() => {
    const fetchToken = () => {
      const tokenFromCookie = Cookies.get("access_token");
      if (!tokenFromCookie) {
        navigate("/");
      } else {
        setToken(tokenFromCookie);
      }
    };
    fetchToken();
    getAllQuestions();
    getFlowByFlowName();
  }, []);

  const handleNext = () => {
    // if (flowname === "" && selectedOptions.length === 0) {
    //   alert("You'll need to enter the details");
    //   return;
    // }
    // else if (flowname === "") {
    //   alert("Enter the flow name first!");
    //   return;
    // } else if (selectedOptions.length === 0) {
    //   alert("Select the questions First!");
    //   return;
    // }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleStartClick = (index) => {
    if (rootIndex === -1) {
      setRootIndex(index);
      // console.error("here")
      const flowListArray = [...flowData];
      const editFlowArray = [...editFlow];
      flowListArray.map((obj) => {
        // console.error("innnn")
        // console.error(obj.currQuestionId === selectedOptions[index]._id);
        if (obj.currQuestionId === selectedOptions[index]._id) {
          obj.isRoot = true;
        }
      });

      // console.error("edit:", editFlowArray)
      editFlowArray.map((obj) => {
        // console.error(obj.currQuestionId === selectedOptions[index]._id);
        // console.error(obj.currQuestionId);
        // console.error("sel: ",selectedOptions[index]._id);
        
        if (obj.currQuestionId === selectedOptions[index]._id) {
          // console.error(obj)
          obj.isRoot = true;
        }
      });
      setFlowData(flowListArray);
      setEditFlow(editFlowArray);
      // setDisableStart(true)
    } else {
      setRootIndex(-1);
      const flowListArray = [...flowData];
      const editFlowArray = [...editFlow];
      flowListArray.forEach((obj) => {
        if (obj.currQuestionId === selectedOptions[index]._id) {
          // console.error(obj);
          obj.isRoot = false;
        }
      });
      editFlowArray.forEach((obj) => {
        if (obj.currQuestionId === selectedOptions[index]._id) {
          // console.error(obj);
          obj.isRoot = false;
        }
      });
      setFlowData(flowListArray);
      setEditFlow(editFlowArray);
    }
  };

  const handleLeafIndex = (id, answer, indexFromQues) => {
    if (leafIndex.questionid === null && leafIndex.answerValue === null) {
      const obj = {
        questionid: id,
        answerValue: answer,
      };
      setLeafIndex(obj);
      const flowListArray = [...flowData];
      const idx = flowListArray.findIndex((obj) => obj.currQuestionId === id);
      if (idx != -1) {
        flowListArray[idx].nextQuestionId = null;
        setFlowData(flowListArray);
      } else {
        const obj = {
          flowName: flowname,
          currQuestionId: id,
          answerValue: answer,
          nextQuestionId: null,
          isRoot: rootIndex === indexFromQues ? true : false,
        };

        flowListArray.push(obj);
        setFlowData(flowListArray);
      }
    } else {
      const obj = {
        questionid: null,
        answerValue: null,
      };

      setLeafIndex(obj);
    }
  };

  const handleAddFlow = async (index, subIndex, newValue) => {
    // console.error(flowData[0])
    const contains = flowData.findIndex(
      (obj) =>
        obj.currQuestionId === selectedOptions[index]._id &&
        obj.answerValue ===
          selectedOptions[index].possibleAnswers[subIndex].answerValue
    );
    if (contains !== -1) {
      // console.log("Contains: ",contains)
      const flowListArray = [...flowData];
      flowListArray[contains].flowName = flowname;
      flowListArray[contains].nextQuestionId = newValue.value;
      const ques = questions.find((obj) => obj._id === newValue.value)
      flowListArray[contains].nextQuestion = ques;
      flowListArray[contains].isRoot = rootIndex === index ? true : false;
      setFlowData(flowListArray);
      // console.error(flowData);

      // updating in edit flow
      const idx = editFlow.findIndex(
      (obj) =>
        obj.currQuestionId === selectedOptions[index]._id &&
        obj.answerValue ===
          selectedOptions[index].possibleAnswers[subIndex].answerValue
      );
      const editFlowArray = [...editFlow];
      editFlowArray[idx].flowName = flowname;
      editFlowArray[idx].nextQuestionId = newValue.value;
      editFlowArray[idx].isRoot = rootIndex === index ? true : false;
      setEditFlow(editFlowArray);
      // console.error(editFlowArray);
      return;
    } else {
      const ques1 = questions.find(
        (obj) => obj._id === selectedOptions[index]._id
      );
      const ques2 = questions.find((obj) => obj._id === newValue.value);
      const obj = {
        flowName: flowname,
        currQuestionId: selectedOptions[index]._id,
        currQuestion: ques1,
        answerValue:
          selectedOptions[index].possibleAnswers[subIndex].answerValue,
        nextQuestionId: newValue.value,
        nextQuestion: ques2,
        isRoot: rootIndex === index ? true : false,
      };

      // console.error("oo:",obj)
      const flowListArray = [...flowData, obj];
      setFlowData(flowListArray);
      // console.error(flowListArray);

      const obj2 = {
        flowName: flowname,
        currQuestionId: selectedOptions[index]._id,
        answerValue:
          selectedOptions[index].possibleAnswers[subIndex].answerValue,
        nextQuestionId: newValue.value,
        isRoot: rootIndex === index ? true : false,
      }
      const editFlowArray = [...editFlow, obj2];
      setEditFlow(editFlowArray);
      // console.error(editFlowArray)
      return;
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`/questions-and-flows/edit-flow/${flowname}`, {
      listOfFlow: editFlow,
      }, {
      headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
          },
    }).then((resp) => {
      if(resp.status === 200){
        alert("Edited Successfully!")
        onClose();
      } else {
        alert("Error while editing!");
        onClose();
      }
    });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("Something went wrong. Please try again later.");
        onClose();
      }
    }
  }


  const renderOptionsGrid = () => {
    // const optionsAvailable = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    // console.log(questions)
    console.log(selectedOptions);
    return (
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {questions.map((option, index) => (
          <Grid item xs={4} key={index} sx={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
              }
              label={option.questionText}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="firstSlideContent">
            <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 600 }}>
              ADD FLOW FOR QUESTIONS
            </Typography>
            <TextField
              label="Flow Name"
              value={flowname}
              onChange={(e) => setFlowname(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled
            />
            {renderOptionsGrid()}
          </div>
        );
      case 2:
        return (
          <div>
            <Typography
              variant="h6"
              sx={{
                marginTop: 2,
                fontWeight: 600,
                fontSize: "22px",
                color: "#F8B31C",
              }}
            >
              DESIGN FLOW
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#1B5180",
              }}
            >
              Your Flow Name: {flowname}
            </Typography>
            <div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Select Start Question
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Question
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Question Type
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Possible Answers
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Cost
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Select Next Question
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Select End Question
                      </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOptions.flatMap((question, index) =>
                      Array.from({
                        length: question.noOfPossibleAnswers,
                      }).map((_, subIndex) => (
                        <>
                          <TableRow>
                            <TableCell>
                              {subIndex === 0 ? (
                                <button
                                  className={
                                    rootIndex === -1
                                      ? "startEndBtn"
                                      : "startEndBtn startEndBtnSelected"
                                  }
                                  onClick={() => handleStartClick(index)}
                                >
                                  {rootIndex === index
                                    ? "SELECTED"
                                    : "SELECT START"}
                                </button>
                              ) : null}
                            </TableCell>
                            <TableCell>{question.questionText}</TableCell>
                            <TableCell>{question.questionType}</TableCell>
                            <TableCell>
                              {question.possibleAnswers[subIndex].answerValue}
                            </TableCell>
                            <TableCell>
                              {question.possibleAnswers[subIndex].cost}
                            </TableCell>
                            <TableCell>
                              {/* {console.log(
                                flowData
                                  .filter(
                                    (item) =>
                                      item.currQuestionId === question._id &&
                                      item.answerValue.toLowerCase() ===
                                        question.possibleAnswers[
                                          subIndex
                                        ].answerValue.toLowerCase()
                                  )
                                  .map((item) => item.nextQuestion)[0]
                                  ?.questionText || null
                              )} */}
                              {/* {console.error()} */}
                              <FormControl>
                                <Autocomplete
                                  disablePortal
                                  id="combo-box-demo"
                                  options={selectedOptions
                                    .filter((opt) => opt._id !== question._id)
                                    .map((q) => ({
                                      value: q._id,
                                      label: q.questionText,
                                    }))}
                                  sx={{ width: 300 }}
                                  value={
                                    flowData
                                      .filter(
                                        (item) =>
                                          item.currQuestionId ===
                                            question._id &&
                                          item.answerValue.toLowerCase() ===
                                            question.possibleAnswers[
                                              subIndex
                                            ].answerValue.toLowerCase()
                                      )
                                      .map((item) => item.nextQuestion)[0]
                                      ?.questionText || null
                                  }
                                  onChange={(e, newValue) => {
                                    // console.log(newValue)
                                    // setOnChangeHit(true)
                                    
                                    handleAddFlow(index, subIndex, newValue);
                                    // setTheValueSelected(
                                    //   index,
                                    //   subIndex,

                                    //   newValue
                                    // );
                                  }}
                                  
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Question"
                                    />
                                  )}
                                />
                              </FormControl>
                            </TableCell>
                            {/* <TableCell>
                              <button
                                className={
                                  leafIndex === -1
                                    ? "startEndBtn"
                                    : "startEndBtn startEndBtnSelected"
                                }
                                onClick={() =>
                                  handleLeafIndex(
                                    question._id,
                                    question.possibleAnswers[subIndex]
                                      .answerValue,
                                    index
                                  )
                                }
                              >
                                
                                {leafIndex.questionid === question._id &&
                                leafIndex.answerValue.toLowerCase() ==
                                  question.possibleAnswers[
                                    subIndex
                                  ].answerValue.toLowerCase()
                                  ? "SELECTED"
                                  : "SELECT END"}
                              </button>
                            </TableCell> */}
                          </TableRow>
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <>
      {isOpen && (
        <div className="viewEditModal">
          <div className="closingModalDiv" onClick={onClose}>
            <span> &times;</span>
          </div>
          {renderStepContent()}
          <div>
            {step > 1 && (
              <Button
                // type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#F8B31C",
                  color: "#1B5180",
                  "&:hover": {
                    backgroundColor: "#1B5180",
                    color: "#F8B31C",
                  },
                  mx: 1,
                  my: 2,
                }}
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}

            {step < 2 && (
              <>
                <div className="leftBtn">
                  <Button
                // type="submit"
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
                onClick={handleNext}
              >
                Next
              </Button>
              </div>
              </>
            )}

            {step === 2 && (
              <Button
                // type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#F8B31C",
                  color: "#1B5180",
                  "&:hover": {
                    backgroundColor: "#1B5180",
                    color: "#F8B31C",
                  },
                  mx: 1,
                  my: 2,
                }}
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            )}
            {step === 2 && (
              <Button
                // type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#F8B31C",
                  color: "#1B5180",
                  "&:hover": {
                    backgroundColor: "#1B5180",
                    color: "#F8B31C",
                  },
                  mx: 1,
                  my: 2,
                }}
                // onClick={handleFinish}
              >
                Discard
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewEditModal;
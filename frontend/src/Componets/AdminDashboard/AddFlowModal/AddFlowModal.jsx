import "./addFlowModal.css";
import { Modal, Button, Checkbox, FormControlLabel, TextField, Typography, Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../axiosConfig";

const AddFlowModal = ({ isOpen, onClose }) => {

  const [step, setStep] = useState(1);
  const [flowname, setFlowname] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [connections, setConnections] = useState({});
  const [rootIndex, setRootIndex] = useState(-1);
  const [leafIndex, setLeafIndex] = useState({
    questionid: null,
    answerValue: null
  });
  const [disableStart, setDisableStart] = useState(false);
  // const [questions, setQuestions] = useState([
  //   {
  //     id:1,
  //     noOfPossibleAnswers: 3,
  //     possibleAnswers: [
  //       { isQuantifyable: false, answerValue: 50, cost: 35 },
  //       { isQuantifyable: false, answerValue: 30, cost: 20 },
  //       { isQuantifyable: false, answerValue: 10, cost: 5 },
  //     ],
  //     questionText: "Test question1?",
  //     questionType: "integer",
  //   },
  //   {
  //     id:2,
  //     noOfPossibleAnswers: 2,
  //     possibleAnswers: [
  //       { isQuantifyable: true, answerValue: "10st", cost: 0 },
  //       { isQuantifyable: false, answerValue: "20st", cost: 0 },
  //     ],
  //     questionText: "New question to check from frontend string",
  //     questionType: "string",
  //   },
  //   {
  //     id:3,
  //     noOfPossibleAnswers: 2,
  //     possibleAnswers: [
  //       { isQuantifyable: true, answerValue: "yes", cost: 0 },
  //       { isQuantifyable: false, answerValue: "no", cost: 0 },
  //     ],
  //     questionText: "New question to check from frontend string",
  //     questionType: "boolean",
  //   },
  // ]);
  const [questions, setQuestions] = useState([])
  const [flowList, setFlowList] = useState([]);
  
  useEffect(() => {
    const getAllQuestions = async () => {
        await axios
          .get("/questions-and-flows/get-all-questions")
          .then((resp) => {
            console.log(resp.data.data);
            setQuestions(resp.data.data)
          });
  }
    
    getAllQuestions();
  }, [])
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
  }

  const handlePrevious = () => {
    setStep(step - 1);
  }

  const handleFinish = async () => {
    if (flowname === "" && selectedOptions.length === 0) {
      alert("You'll need to start from slide 1")
    }
    if (flowname === "") {
      alert("Enter the flow name first!")
      return;
    }
    console.log(flowList)
    // const arrayOfFlows = Object.values(flowList);
    await axios
      .post("/questions-and-flows/create-flow", {
        listOfFlow: flowList,
      })
      .then((resp) => {
        console.log(resp.data.data);
      });

    onClose();
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

   
  }

  const renderOptionsGrid = () => {
    // const optionsAvailable = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    // console.log(questions)
    return (
      <Grid container spacing={2} sx={{padding: 2}}>
        {questions.map((option, index) => (
          <Grid item xs={4} key={index} sx={{textAlign: "left"}}>
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
  }

  //  const handleConnectionChange = (option, type, value) => {
  //    const updatedConnections = { ...connections };
  //    if (!updatedConnections[option]) {
  //      updatedConnections[option] = {};
  //    }
  //    updatedConnections[option][type] = value;
  //    setConnections(updatedConnections);
  // };
  
  const handleStartClick = (index) => {
    if (rootIndex === -1) {
      setRootIndex(index);
      const flowListArray = [...flowList];
      flowListArray.map(obj => {
        if (obj.currQuestionId === questions[index]._id) {
          obj.isRoot = true;
        }
      })
      setFlowList(flowListArray)
      // setDisableStart(true)
    } else {
      setRootIndex(-1);
      const flowListArray = [...flowList];
      flowListArray.forEach((obj) => {
        if (obj.currQuestionId === questions[index]._id) {
          console.log("here")
          obj.isRoot = false;
        }
      });
      setFlowList(flowListArray);
    }
  }
  
  const handleLeafIndex = (id, answer, indexFromQues) => {
    
    // if (leafIndex === -1) {
    //   setLeafIndex(id)
    // } else {
    //   setLeafIndex(-1);
    // }

    if (leafIndex.questionid === null && leafIndex.answerValue === null) {
      const obj = {
        questionid: id,
        answerValue: answer
      }
      setLeafIndex(obj);
      const flowListArray = [...flowList];
      const idx = flowListArray.findIndex((obj) => obj.currQuestionId === id);
      if (idx != -1) {
        flowListArray[idx].nextQuestionId = null;
        setFlowList(flowListArray);
      } else {
        const obj = {
          flowName: flowname,
          currQuestionId: id,
          answerValue: answer,
          nextQuestionId: null,
          isRoot: rootIndex === indexFromQues ? true : false,
        };

        flowListArray.push(obj);
        setFlowList(flowListArray);
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

    const contains = flowList.findIndex(
      (obj) =>
        obj.currQuestionId === questions[index]._id &&
        obj.answerValue.toLowerCase() ===
          questions[index].possibleAnswers[subIndex].answerValue.toLowerCase()
    );
    if (contains !== -1) {
      // console.log("Contains: ",contains)
      const flowListArray = [...flowList];
      flowListArray[contains].flowName = flowname;
      flowListArray[contains].nextQuestionId = newValue.value;
      flowListArray[contains].isRoot = rootIndex === index ? true : false;
      setFlowList(flowListArray);

      // if (newValue.value === null) return;

      // jjjjjjj

      // const indexOfNext = flowList.findIndex(
      //   (obj) =>
      //     obj.currQuestionId === newValue.value);
      
      // if (indexOfNext !== -1) {
      //   const flowListArray = [...flowList];
      //   flowListArray[indexOfNext].flowName = flowname;
      //   flowListArray[indexOfNext].nextQuestionId = null;
      //   // not added answer value here!
      //   flowListArray[indexOfNext].isRoot = rootIndex === index ? true : false;
      //   setFlowList(flowListArray);
      // }

      // jjjjjj

      console.log(flowList)
      return;
    } else {
      const obj = {
        flowName: flowname,
        currQuestionId: questions[index]._id,
        answerValue: questions[index].possibleAnswers[subIndex].answerValue,
        nextQuestionId: newValue.value,
        isRoot: rootIndex === index ? true : false,
      };
      const flowListArray = [...flowList, obj];
      setFlowList(flowListArray);
      console.log(flowList);
      return;
      // if (newValue.value === null) return;
      // const obj2 = {
      //   flowName: flowname,
      //   currQuestionId: newValue.value,
      //   answerValue: null,
      //   nextQuestionId: null,
      //   isRoot: rootIndex === index ? true : false,
      // };

      // const flowListArray2 = [...flowList, obj2];
      // setFlowList(flowListArray2);
      // console.log(flowList);
    }

    
    // flowList.push()
    // console.log("FLow obj: ",flowListArray)
  }
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
                      <TableCell
                        sx={{
                          fontSize: "15px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Select End Question
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {selectedOptions.map((option) => [
                      <TableRow key={`${option}-yes`}>
                        <TableCell rowSpan={2}>{option}</TableCell>
                        <TableCell>
                          <FormControl>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={selectedOptions.filter(
                                (opt) => opt !== option
                              )}
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Movie" />
                              )}
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>,
                      <TableRow key={`${option}-no`}>
                        <TableCell>
                          <FormControl>
                            <InputLabel>No</InputLabel>
                            <Select
                              value={connections[option]?.no || ""}
                              onChange={(e) =>
                                handleConnectionChange(
                                  option,
                                  "no",
                                  e.target.value
                                )
                              }
                            >
                              {selectedOptions
                                .filter((opt) => opt !== option)
                                .map((opt) => (
                                  <MenuItem key={opt} value={opt}>
                                    {opt}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>,
                    ])}
                  </TableBody> */}
                  <TableBody>
                    {selectedOptions.flatMap(
                      (question, index) =>
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
                                {
                                  <FormControl>
                                    <Autocomplete
                                      disablePortal
                                      id="combo-box-demo"
                                      options={selectedOptions
                                        .filter(
                                          (opt) => opt._id !== question._id
                                        )
                                        .map((q) => ({
                                          value: q._id,
                                          label: q.questionText,
                                        }))}
                                      sx={{ width: 300 }}
                                      onChange={(e, newValue) => {
                                        // console.log(newValue)
                                        handleAddFlow(
                                          index,
                                          subIndex,
                                          newValue
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Select Question"
                                        />
                                      )}
                                    />
                                  </FormControl>
                                }
                                {/* <Select
                                  value={`Select question`}
                                  onChange={(e) =>
                                    handleConnectionChange(
                                      option,
                                      "no",
                                      e.target.value
                                    )
                                  }
                                >
                                  {questions
                                    .filter(
                                      (opt) => opt !== questions.questionText
                                    )
                                    .map((opt) => (
                                      <MenuItem key={opt} value={opt}>
                                        {opt.questionText}
                                      </MenuItem>
                                    ))}
                                </Select> */}
                              </TableCell>
                              <TableCell>
                                <button
                                  className={
                                    leafIndex === -1
                                      ? "startEndBtn"
                                      : "startEndBtn startEndBtnSelected"
                                  }
                                  onClick={() => handleLeafIndex(question._id, question.possibleAnswers[subIndex].answerValue, index)}
                                >
                                  {leafIndex.questionid === question._id && leafIndex.answerValue === question.possibleAnswers[subIndex].answerValue 
                                    ? "SELECTED"
                                    : "SELECT END"}
                                </button>
                              </TableCell>
                            </TableRow>
                          </>
                        ))
                      // <>
                      //   {question.noOfPossibleAnswers.map((answer, index) => (
                      //     <TableRow key={index}>
                      //       <TableCell>{question.questionText}</TableCell>
                      //       <TableCell>{question.questionType}</TableCell>
                      //     </TableRow>
                      //   ))}
                      // </>
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
  }
  return (
    <>
      {isOpen && (
        <>
          <div className="addFlowModal">
            <div className="closingModalDiv" onClick={onClose}>
              <span> &times;</span>
            </div>
            <div>
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
                    onClick={handleFinish}
                  >
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddFlowModal;
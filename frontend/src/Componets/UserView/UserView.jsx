import "./userView.css";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import QuantityModal from "./QuantityModal/QuantityModal";

const UserView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // if (location.state.selectedId) {
    const data = location.state.selectedId;
  // }

  console.log(data)

  const [flowData, setFlowData] = useState(data.flows);
  const [rootIdx, setRootIdx] = useState(data.flows.findIndex(obj => obj.isRoot))
  const [currentIdx, setCurrentIdx] = useState(rootIdx);
  const [ans, setAns] = useState(flowData[rootIdx].currQuestion.possibleAnswers);
  const [ques, setQues] = useState(flowData[rootIdx].currQuestion.questionText);
  // const [nextQues, setNextQues] = useState(flowData[rootIdx].nextQuestion);
  const [answer, setAnswer] = useState([
    {
      answerValue:
        "lorem",
      cost: 1000,
      isQuantifyable: false,
    },
    { answerValue: "no", cost: 1000, isQuantifyable: false },
    // { answerValue: "no", cost: 1000, isQuantifyable: false },
    // { answerValue: "no", cost: 1000, isQuantifyable: false },
    // { answerValue: "no", cost: 1000, isQuantifyable: false },
    // { answerValue: "no", cost: 1000, isQuantifyable: false },
  ]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [openMsg, setOpenMsg] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [qtyModal, setQtyModal] = useState(false)
  // const handleAnswerClick = (selectedAnswer) => {
  //   const updatedSelectedAnswers = [...selectedAnswers, selectedAnswer];
  //   setSelectedAnswers(updatedSelectedAnswers);
  // };

  const openQtyModal = () => {
    setQtyModal(true);
  }

  const closeQtyModal = (qty) => {
    setQuantity(qty)
    setQtyModal(false);
  };

  const handleAnswerClick = (selectedAnswer) => {
    // console.log(selectedAnswer)
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer.isQuantifyable) {
      openQtyModal();
    }
  };

  const handleSaveClick = () => {
    // console.log(selectedAnswer);
    if (selectedAnswer) {
      setSelectedAnswers([
        ...selectedAnswers,
        { ques: ques, answerValue: selectedAnswer.answerValue, quantity: quantity, cost: selectedAnswer.cost },
      ]);
      setTotalCost(totalCost + selectedAnswer.cost*quantity);
      setSelectedAnswer(null);

      if (currentIdx === -1) {
        setOpenMsg(true);
        return;
      }
      const nextQues = flowData[currentIdx].nextQuestion;
      // if (nextQues === null) {
      //   setOpenMsg(true);
      //   return;
      // }
      if (nextQues) {
        console.log("yeha", nextQues)
        setQues(nextQues.questionText)
        setAns(nextQues.possibleAnswers);
        
        const index = flowData.findIndex((obj) => obj.currQuestionId === nextQues._id);
        // if (index != -1) {
          setCurrentIdx(index)
        // }
        // /console.log(index)
        // if (index != -1) {
          // setNextQues(flowData[index]);
      // }
      // else {
      //     setOpenMsg(true);
      //   }
      }
      else {
        setOpenMsg(true);
      }
      
    }
  };

  return (
    <>
      <div className="centerFlowName">FLOW1</div>
      {openMsg ? (
        <>
          <div className="finalMsg">
            <p>
              Thank you for visiting! <br />
              Your total cost calculated is : {totalCost}
            </p>

            <button onClick={() => navigate("/selectflow")}>Go Back</button>
          </div>
        </>
      ) : (
        <div className="userView">
          {/* {data} */}

          <div className="leftView">
            <div className="questionBox">{ques}</div>
            <div
              className={`${ans.length === 2 ? "answerGrid2" : "answerGrid"}`}
            >
              {ans.map((item, index) => (
                <div
                  key={index}
                  className="grid-item"
                  onClick={() => handleAnswerClick(item)}
                >
                  {item.answerValue}
                </div>
              ))}
            </div>
            <div className="bottomBtn">
              <button onClick={handleSaveClick} className="">
                Save & Next
              </button>
            </div>
          </div>
          <div className="rightView">
            {/* <div className="rightCostTable"> */}
            <p>Total Cost</p>
            <table className="totalCostTable">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {selectedAnswers.map((selected, index) => (
                  <tr key={index}>
                    {/* <td>{selected.question}</td> */}
                    <td>{selected.ques}</td>
                    <td>{selected.quantity}</td>
                    <td>{selected.cost}</td>
                  </tr>
                ))}

                {selectedAnswer && (
                  <>
                    <tr>
                      {/* <td>{selected.question}</td> */}
                      <td>{ques}</td>
                      <td>{quantity}</td>
                      <td className="forDisplayingCost">
                        {selectedAnswer.cost * quantity}
                      </td>
                    </tr>
                  </>
                )}

                {selectedAnswer || selectedAnswers.length > 0 ? (
                  <>
                    <tr>
                      <td>Total Cost: </td>
                      {selectedAnswer ? (
                        <>
                          <td>-</td>
                          <td>{totalCost + selectedAnswer.cost * quantity}</td>
                        </>
                      ) : (
                        <>
                          <td>-</td>
                          <td>{totalCost}</td>
                        </>
                      )}
                    </tr>
                  </>
                ) : (
                  ""
                )}
              </tbody>
              {qtyModal && (
                <QuantityModal isOpen={openQtyModal} onClose={closeQtyModal} />
              )}
            </table>
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default UserView;
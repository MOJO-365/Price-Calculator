import "./userView.css";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState } from "react";
const UserView = () => {
  const location = useLocation();
  // if (location.state.selectedId) {
  //    const data = location.state.selectedId;
  // }
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
  // const handleAnswerClick = (selectedAnswer) => {
  //   const updatedSelectedAnswers = [...selectedAnswers, selectedAnswer];
  //   setSelectedAnswers(updatedSelectedAnswers);
  // };

  const handleAnswerClick = (selectedAnswer) => {
    // console.log(selectedAnswer)
    setSelectedAnswer(selectedAnswer);
  };

  const handleSaveClick = () => {
    console.log(selectedAnswer.answerValue);
    if (selectedAnswer) {
      setSelectedAnswers([
        ...selectedAnswers,
        { answerValue: selectedAnswer.answerValue, cost: selectedAnswer.cost },
      ]);
      setTotalCost(totalCost + selectedAnswer.cost);

      setSelectedAnswer(null);
    }
  };

  return (
    <>
      <div className="centerFlowName">
          FLOW1
        </div>
      <div className="userView">
        {/* {data} */}
        
        <div className="leftView">
          <div className="questionBox">How are you?</div>
          <div
            className={`${answer.length === 2 ? "answerGrid2" : "answerGrid"}`}
          >
            {answer.map((item, index) => (
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
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {selectedAnswers.map((selected, index) => (
                  <tr key={index}>
                    {/* <td>{selected.question}</td> */}
                    <td>{selected.answerValue}</td>
                    <td>{selected.cost}</td>
                  </tr>
                ))}

                {selectedAnswer && (
                  <>
                    <tr>
                      {/* <td>{selected.question}</td> */}
                      <td>{selectedAnswer.answerValue}</td>
                      <td className="forDisplayingCost">
                        {selectedAnswer.cost}
                      </td>
                    </tr>
                  </>
                )}

                {selectedAnswer || selectedAnswers.length > 0 ? (
                  <>
                    <tr>
                      <td>Total Cost: </td>
                      {selectedAnswer ? (
                        <td>{totalCost + selectedAnswer.cost}</td>
                      ) : (
                        <td>{totalCost}</td>
                      )}
                    </tr>
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default UserView;
import { useState } from "react";
import "./viewAnswerModal.css";
import Grid from "@mui/material/Grid";
const ViewAnswerModal = ({ isOpen, onClose, answers }) => {
  console.log(answers)
  const [answerList, setAnswerList] = useState(answers);
  return (
    <>
      {isOpen && (
        <div className="viewAnsModal">
          <div className="closingModalDiv" onClick={onClose}>
            <span> &times;</span>
          </div>
          <div className="answertitle">
            Possible Answers
          </div>
          <div className="answerSection">
            <table className="answerContentTable">
              <thead>
                <tr>
                  <th>Answer Value</th>
                  <th>Is Quantifiable</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {answerList.map((ans, index) => (
                  <tr key={index}>
                    <td>{ans.answerValue}</td>
                    <td>{`${ans.isQuantifyable}`}</td>
                    <td>{ans.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAnswerModal;

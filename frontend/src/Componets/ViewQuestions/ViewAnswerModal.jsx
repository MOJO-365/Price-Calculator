import "./viewAnswerModal.css";

const ViewAnswerModal = ({isOpen, onClose}) => {
  return (
    <>
      {isOpen && (
        <div className="viewAnsModal">
          <div className="closingModalDiv" onClick={onClose}>
            <span> &times;</span>
          </div>
          ANS
        </div>
      )}
    </>
  );
};

export default ViewAnswerModal;

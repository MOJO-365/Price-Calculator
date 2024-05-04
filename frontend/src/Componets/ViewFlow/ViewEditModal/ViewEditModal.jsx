import "./viewEditModal.css";

const ViewEditModal = ({isOpen, onClose}) => {
  return (
    <>
      {isOpen && (
        <div className="viewEditModal">
          <div className="closingModalDiv" onClick={onClose}>
            <span> &times;</span>
          </div>
          here
        </div>
      )}
    </>
  );
}

export default ViewEditModal;
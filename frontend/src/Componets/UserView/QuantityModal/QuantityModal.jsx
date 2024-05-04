import { useState } from "react";
import "./quantityModal.css";

const QuantityModal = ({ isOpen, onClose }) => {
  const [qty, setQty] = useState(1);

  const handleSubmit = () => {
    if (qty == 0 || qty == "") {
      onClose(1);
    } else {
      onClose(qty);
    }
  }
  return (
    <>
      {isOpen && (
        <>
          <div className="addQtyModal">
            <div className="closingModalDiv" onClick={() => onClose(qty)}>
              <span> &times;</span>
            </div>
            <div className="addUserDiv">
              <h4>Specify Quantity</h4>

              <div className="addUserSection">
                <input
                  type="number"
                  name=""
                  id=""
                  value={qty}
                  placeholder="quantity"
                  onChange={(e) => setQty(parseInt(e.target.value))}
                />
              </div>

              <div className="submitAddUserBtn">
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuantityModal;

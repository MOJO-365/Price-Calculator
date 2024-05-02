import "./addUserModal.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    if (username === "" || password === "") {
      toast.error("Please fill the details first.", {
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
        .post("/auth/register", {
          username: username,
          password: password,
        })
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("User added successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                onClose();
              },
            });
          } else {
            toast.error("ERROR! Try Again", {
              position: "top-right",
              autoClose: 2000, // Auto close the notification after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                onClose();
              },
            });
          }
        });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Internal server error. Please try again later.");
      }
    }
  };
  return (
    <>
      {isOpen && (
        <>
          <div className="addUserModal">
            <div className="closingModalDiv" onClick={onClose}>
              <span> &times;</span>
            </div>
            <div className="addUserDiv">
              <h4>User Registration</h4>

              <div className="addUserSection">
                <input
                  type="text"
                  name=""
                  id=""
                  value={username}
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  name=""
                  id=""
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
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

export default AddUserModal;
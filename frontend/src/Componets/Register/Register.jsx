import "./register.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      toast.error("Please fill the details first.", {
      position: "top-right",
      autoClose: 2000, // Auto close the notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
      return;
    }
    try{
          await axios
      .post("/auth/register", {
        username: username,
        password: password,
        isAdmin: isAdmin,
      })
      .then((resp) => {
        if (resp.status === 200) {
          toast.success("User registered successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              navigate("/signin");
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
              navigate("/register");
            },
          });
         
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
          toast.error("Internal server error. Please try again later.");
      }
    }

  }

  return (
    <>
      <ToastContainer />
      <div className="centalBar">
        <p>Pricing Calculator</p>
        <div>
          <button onClick={() => navigate("/signin")}>
            Already have an account?
          </button>
        </div>
      </div>
      <div className="centralContent">
        <div className="registerDiv">
          <h4>User Registration</h4>

          <div className="signinSection">
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
            <FormControlLabel
              control={<Checkbox />}
              label="Admin Registeration"
              checked={isAdmin}
              onChange={() => {
                setIsAdmin(!isAdmin);
              }}
            />
          </div>

          <div className="submitBtn">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
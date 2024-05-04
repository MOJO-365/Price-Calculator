import "./signin.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../axiosConfig";

const Signin = () => {
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
      return
    }
    try {
      await axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((resp) => {
        console.log(resp)
        if (resp.status === 200) {
          const token = resp.data.access_token;
          const cookieName = "access_token";
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 1); 
          expiryDate.setMinutes(expiryDate.getMinutes() + 50); 
          const expires = expiryDate.toUTCString();
          document.cookie = `${cookieName}=${token}; expires=${expires} path=/`;
          toast.success("Logging in...", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              navigate("/dashboard");
            },
          });
        } else {
          toast.error("ERROR! Try Again", {
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
        }
      });
    }
    catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Unauthorized access");
      } else if (error.response && error.response.status === 404) {
        toast.error("User not found");
      }
        if (error.response && error.response.status === 500) {
          toast.error("Something went wrong. Please try again later.");
        }
    }
  };
  return (
    <>
      
      <ToastContainer />
      <div className="centalBar">
        <p>Pricing Calculator</p>
        {/* <div>
          <button onClick={() => navigate("/register")}>
            Create a new account?
          </button>
        </div> */}
      </div>
      <div className="centralContent">
        <div className="signinDiv">
          <h4>Sign-in</h4>

          <div className="signinSection2">
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
            {/* <FormControlLabel
              control={<Checkbox />}
              label="Admin Registeration"
            /> */}
          </div>
          <div className="submitBtn">
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

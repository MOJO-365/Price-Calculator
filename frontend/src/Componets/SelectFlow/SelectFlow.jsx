import { useState } from "react";
import "./selectFlow.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const SelectFlow = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("heyy");
  const [selectedId, setSelectedId] = useState(null); 

  const [obj, setObj] = useState([
    {
      flowname: "f1",
      id: 1
    },
    {
      flowname: "f2",
      id: 2
    },
  ])

  const handleOnChange = (event, newValue) => {
    if (newValue) {
      setSelectedId(newValue.id);
    } else {
      setSelectedId(null);
    }
  };
  const handleSelect = () => {
    navigate("/flowlayout",
      {state: { selectedId }},
  );
  }
  return (
    <>
      <div className="centalBar">
        <p>Pricing Calculator</p>
      </div>
      <div className="centralContent">
        <div className="signinDiv">
          <h4>Select Flow</h4>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={obj}
            getOptionLabel={(option) => option.flowname}
            onChange={handleOnChange}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Select Flow" />}
          />
          <div className="submitBtn">
            <button type="submit" onClick={handleSelect}>
              Go Ahead!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectFlow;
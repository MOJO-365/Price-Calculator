import "./manageUser.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../../axiosConfig";
import { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "./AddUserModal";

const ManageUsers = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState([]);
  const [editableRows, setEditableRows] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [addUser, setAddUser] = useState(false);
  
  
  
  const handleClickShowPassword = (index) => {
    const newShowPassword = [...showPassword];
    newShowPassword[index] = !newShowPassword[index];
    setShowPassword(newShowPassword);
  }
  
  const toggleEditRow = (index) => {
    const newEditableRows = [...editableRows];
    newEditableRows[index] = !newEditableRows[index];
    setEditableRows(newEditableRows);
  };

  const handleEditChange = (index, field, value) => {
    console.log(index)
    console.log(field)
    console.log(value);
    const edited = [...editData];
    edited[index] = { ...edited[index], [field]: value };
    setEditData(edited);
  }

  const handleSaveChanges = async (index) => {
    // console.log(usersData[index])
    const idx = usersData[index]._id;
    try {
      await axios.put(`/users/edit-user/${idx}`, {
      username: editData[index].username,
      password: editData[index].password
    }).then((resp) => {
      if (resp.status === 200) {
        toast.success("Data edited successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            getAllUsers();
          },
        });
      }
      setUsersData(editData);
    });
    } catch (error) {
      toast.error("Unable to edit the data. Try again.");
      getAllUsers();
    }
    
    toggleEditRow(index);
  }

  const handleDiscardChanges = (index) => {
    setEditData(usersData);
    toggleEditRow(index)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const openAddUserModal = () => {
    setAddUser(true);
  }

  const closeAddUserModal = () => {
    getAllUsers();
    setAddUser(false);
  }

  const handleDelete = async () => {
    const idx = usersData[deleteIndex]._id;
    try {
      await axios.delete(`/users/delete-user/${idx}`).then((resp) => {
        if (resp.status === 200) {
        toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            getAllUsers();
          },
        });
      }
      
    });
    } catch (error) {
      toast.error("Unable to delete the user. Try again.");
    }
    closeDeleteDialog();
  }
  const getAllUsers = async () => {
    await axios.get("/users/get-users/").then((resp) => {
      if (resp.status === 200) {
        const data = resp.data;
        const nonAdminUsers = data.filter((user) => !user.isAdmin);
        setUsersData(nonAdminUsers);
        setEditData(nonAdminUsers);
      }
    });
  };


  useEffect(() => {
    getAllUsers();
  }, []);
  
  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="manageUsersContentMain">
          <div className="closingModalDiv" onClick={onClose}>
            <span> &times;</span>
          </div>

          <div className="manageUserContent">
            <p>Manage Users</p>
            <table className="manageUsersTable">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {editData.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <FormControl
                        sx={{ m: 1, width: "30ch" }}
                        variant="standard"
                      >
                        <Input
                          id={`username-${index}`}
                          // type={showPassword ? "text" : "password"}
                          value={user.username}
                          onChange={(e) =>
                            handleEditChange(index, "username", e.target.value)
                          }
                          readOnly={!editableRows[index]}
                          endAdornment={
                            <InputAdornment position="end"></InputAdornment>
                          }
                        />
                      </FormControl>
                    </td>
                    <td>
                      <FormControl
                        sx={{ m: 1, width: "30ch" }}
                        variant="standard"
                      >
                        <Input
                          id={`password-${index}`}
                          type={showPassword[index] ? "text" : "password"}
                          value={user.password}
                          onChange={(e) =>
                            handleEditChange(index, "password", e.target.value)
                          }
                          readOnly={!editableRows[index]}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword(index)}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword[index] ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </td>
                    <td>
                      <DeleteIcon
                        sx={{
                          color: "#F8B31C",
                          fontSize: "20px",
                          mx: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setDeleteIndex(index);
                          openDeleteDialog();
                        }}
                      />
                      {editableRows[index] ? (
                        <>
                          <CheckIcon
                            onClick={() => handleSaveChanges(index)}
                            sx={{
                              color: "#F8B31C",
                              fontSize: "20px",
                              mx: 1,
                              cursor: "pointer",
                            }}
                          />

                          <CloseIcon
                            onClick={() => handleDiscardChanges(index)}
                            sx={{
                              color: "#F8B31C",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                          />
                        </>
                      ) : (
                        <EditIcon
                          onClick={() => {
                            toggleEditRow(index);
                            console.log(editData);
                          }}
                          sx={{
                            color: "#F8B31C",
                            fontSize: "20px",
                            mx: 1,
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="addBtn">
            <button onClick={openAddUserModal}>
              + Add User
            </button>
          </div>
          {addUser && <AddUserModal
            isOpen={openAddUserModal}
            onClose={closeAddUserModal}
          />}
          <Dialog
            open={deleteDialog}
            onClose={closeDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="custom-dialog"
            sx={{ zIndex: 2000 }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={closeDeleteDialog}>Disagree</Button>
              <Button onClick={handleDelete}>Agree</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default ManageUsers;
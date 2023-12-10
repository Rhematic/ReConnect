import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ContainedButton from "@mui/material/Button";

function RegisterForm() {
  const [memberDetail, setMemberDetail] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    city: "",
    state: "",
    username: "",
    password: "",
    accessLevel: "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setMemberDetail({
      ...memberDetail,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirm = () => {
    setShowDialog(true);
  };

  const addMemberToFamily = (e) => {
    e.preventDefault();

    const newFamilyMembers = [...familyMembers, memberDetail];
    setFamilyMembers(newFamilyMembers);

    console.log("familyMembers", newFamilyMembers);

    handleConfirm();
  };

  const handleYes = () => {
    setMemberDetail({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      city: "",
      state: "",
      username: "",
      password: "",
      accessLevel: "",
    });
    setShowDialog(false);
  };

  const handleNo = () => {
    dispatch({
      type: "REGISTER",
      payload: familyMembers,
    });
    setShowDialog(false);
  };

  return (
    <form
      className="formPanel"
      onSubmit={addMemberToFamily}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Register User</h2>

      {errors.registrationMessage && (
        <h3 className="alert" accessLevel="alert">
          {errors.registrationMessage}
        </h3>
      )}

      {showDialog && (
        <div className="dialog" style={{ position: "fixed", zIndex: 9999 }}>
          <div className="dialog-content">
            <h2>Register another family member?</h2>
            <button style={{ marginRight: "10px" }} onClick={handleYes}>
              Yes
            </button>
            <button onClick={handleNo}>No</button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          value={memberDetail.firstName}
          required
          onChange={handleChange}
        />

        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          value={memberDetail.lastName}
          required
          onChange={handleChange}
        />

        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="Date of Birth"
          variant="outlined"
          type="text"
          name="dateOfBirth"
          value={memberDetail.dateOfBirth}
          required
          onChange={handleChange}
        />

        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="City"
          variant="outlined"
          type="text"
          name="city"
          value={memberDetail.city}
          required
          onChange={handleChange}
        />

        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="State"
          variant="outlined"
          type="text"
          name="state"
          value={memberDetail.state}
          required
          onChange={handleChange}
        />

        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="Email"
          variant="outlined"
          type="text"
          name="username"
          value={memberDetail.username}
          required
          onChange={handleChange}
        />

        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            },
          }}
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={memberDetail.password}
          required
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="accessLevel">
          <Select
            value={memberDetail.accessLevel}
            onChange={handleChange}
            style={{
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            }}
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label", name: "accessLevel" }}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
            <MenuItem value="child">Child</MenuItem>
          </Select>
        </label>
      </div>

      <div>
        <ContainedButton
          variant="contained"
          style={{
            backgroundColor: "#049BAA",
            borderRadius: "40px",
            width: "150px",
          }}
          type="submit"
        >
          Register
        </ContainedButton>
      </div>
    </form>
  );
}

export default RegisterForm;

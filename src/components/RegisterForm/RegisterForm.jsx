import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ContainedButton from "@mui/material/Button";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        city: city,
        state: state,
        email: email,
        username: username,
        password: password,
        accessLevel: accessLevel,
      },
    });
  };

  return (
    <form
      className="formPanel"
      onSubmit={registerUser}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Register User</h2>

      {errors.registrationMessage && (
        <h3 className="alert" accessLevel="alert">
          {errors.registrationMessage}
        </h3>
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
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
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
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
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
          value={dateOfBirth}
          required
          onChange={(event) => setDateOfBirth(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
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
          value={city}
          required
          onChange={(event) => setCity(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
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
          value={state}
          required
          onChange={(event) => setState(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
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
          name="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          InputProps={{
            style: {
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            }
          }}
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
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
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="accessLevel">
          <Select
            value={accessLevel}
            onChange={(event) => setAccessLevel(event.target.value)}
            style={{
              borderRadius: "40px",
              width: "250px",
              backgroundColor: "white",
            }}
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
            <MenuItem value="child">Child</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
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

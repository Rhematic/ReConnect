import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./AdminConsole.css";
function AdminConsoleView() {
  const history = useHistory();

  // const buttons = [
  //   <Button key="one">USER DATA</Button>,
  //   <Button key="two">EDIT RESOURCES</Button>,
  //   <Button key="three">EDIT JOURNAL PROMPTS</Button>,
  //   <Button key="three">EDIT SURVEY QUESTIONS</Button>
  // ];

  return (
    <div className="container">
      <h2 className="admin-header">ADMIN HOME</h2>
      {/* <button
        // useHistory to push to admin search view
        onClick={() => history.push("/admin/search")}
      >
        View User Data
      </button> */}
      {/* <ul>Survey Responses</ul>
      <ul>Journals</ul> */}
      {/* <button onClick={() => history.push("/admin/resources")}>
        Edit Resources
      </button>
      <button onClick={() => history.push("/admin/prompts")}>
        Edit Prompts (Journal)
      </button>
      <button onClick={() => history.push("/admin/questions")}>
        Edit Questions (Survey)
      </button>
       <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        onClick={() => history.push("/admin/search")}
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
        onClick={() => history.push("/admin/resources")}
      >
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        onClick={() => history.push("/admin/prompts")}
      >
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        onClick={() => history.push("/admin/questions")}
      >
      </ButtonGroup>
    </Box> */}

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <button
              className="button-style"
              // useHistory to push to admin search view
              onClick={() => history.push("/admin/search")}
            >
              VIEW USER DATA
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              className="button-style"
              onClick={() => history.push("/admin/resources")}
            >
              EDIT RESOURCES
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              className="button-style"
              onClick={() => history.push("/admin/prompts")}
            >
              EDIT JOURNAL PROMPTS
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              className="button-style"
              onClick={() => history.push("/admin/questions")}
            >
              EDIT SURVEY QUESTIONS
            </button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AdminConsoleView;

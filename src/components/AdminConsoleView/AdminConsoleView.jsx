import React from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './AdminConsole.css';
function AdminConsoleView() {
  const history = useHistory();


  return (
    <div className="container">
      <h2 className="admin-header">ADMIN HOME</h2>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <button className="button-style"
              // useHistory to push to admin search view
              onClick={() => history.push("/admin/search")}
            >
              VIEW USER DATA
            </button>
          </Grid>
          <Grid item xs={6}>
            <button className="button-style"
            onClick={() => history.push("/admin/resources")}>
              EDIT RESOURCES
            </button>
          </Grid>
          <Grid item xs={6}>
            <button className="button-style"
            onClick={() => history.push("/admin/prompts")}>
              EDIT JOURNAL PROMPTS
            </button>
          </Grid>
          <Grid item xs={6}>
            <button className="button-style"
            onClick={() => history.push("/admin/questions")}>
              EDIT SURVEY QUESTIONS
            </button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AdminConsoleView;

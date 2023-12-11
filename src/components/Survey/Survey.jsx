import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import LikertForm from '../LikertForm/LikertForm';
import FreeForm from '../FreeForm/FreeForm';
// import BooleanForm from '../BooleanForm/BooleanForm';
import './Survey.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Survey() {
  const dispatch = useDispatch();

  const [likertFormData, setLikertFormData] = useState({});
  const [freeFormData, setFreeFormData] = useState({});
  // const [booleanFormData, setBooleanFormData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const clearForm = () => {
    setLikertFormData({});
    setFreeFormData({});
    // setBooleanFormData({});
  };

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_ALL_FORMS',
      payload: {
        likertFormData,
        freeFormData,
        // booleanFormData,
      },
    });

    clearForm();

    // Show the success message
    handleClick();
  };

  return (
    <div className="survey">
      <h2 className="survey-title">SURVEY</h2>

      <LikertForm formData={likertFormData} setFormData={setLikertFormData} clearForm={clearForm} />

      <FreeForm formData={freeFormData} setFormData={setFreeFormData} clearForm={clearForm} />

      {/* <BooleanForm formData={booleanFormData} setFormData={setBooleanFormData} clearForm={clearForm} /> */}
      <div className='center-button-submit'>
        <button className="submit-button" onClick={handleSubmit}>
          SUBMIT ANSWERS
        </button>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <MuiAlert onClose={handleClose} sx={{ width: '100%', backgroundColor: '#12646a', color: 'white'}}>
            Thank you for filling out your survey!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Survey;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import LikertForm from '../LikertForm/LikertForm';
import FreeForm from '../FreeForm/FreeForm';
// import BooleanForm from '../BooleanForm/BooleanForm';
import './Survey.css';

function Survey() {
  const dispatch = useDispatch();

  const [likertFormData, setLikertFormData] = useState({});
  const [freeFormData, setFreeFormData] = useState({});
  // const [booleanFormData, setBooleanFormData] = useState({});

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_ALL_FORMS',
      payload: {
        likertFormData,
        freeFormData,
        // booleanFormData,
      },
    });

    // Clear the form data
    setLikertFormData({});
    setFreeFormData({});
    // setBooleanFormData({});

    // Show alert
    alert('Your answers have been submitted!');
  };

  return (
    <div>
      <h2 className="survey-title">SURVEY</h2>
      
      <LikertForm formData={likertFormData} setFormData={setLikertFormData} />

      
      <FreeForm formData={freeFormData} setFormData={setFreeFormData} />

      
      {/* <BooleanForm formData={booleanFormData} setFormData={setBooleanFormData} /> */}

      
      <button className="submit-button" onClick={handleSubmit}>
        Submit All Answers
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
    
  );
}

export default Survey;


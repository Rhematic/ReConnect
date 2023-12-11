import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import './BooleanForm.css';

function BooleanForm({ formData, setFormData }) {
  const dispatch = useDispatch();
  const surveyList = useSelector((store) => store.survey.surveyList);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userId, setUserId] = useState(0);
  const [score, setScore] = useState(0);
  const currentDate = dayjs();

  useEffect(() => {
    getSurveyList();
  }, []);

  const getSurveyList = () => {
    dispatch({ type: 'FETCH_SURVEY' });
  };

  const addSurveyReply = (response) => {
    if (selectedQuestion) {
      dispatch({
        type: 'FETCH_REPLY',
        payload: {
          response: response.toString(),
          question_id: selectedQuestion.id,
          score: score,
          user_id: userId,
          date: currentDate,
        },
      });
    } else {
      alert('Please select a question before submitting.');
    }
  };

  const handleBooleanClick = (selectedBoolean) => {
    addSurveyReply(selectedBoolean);
  };

  useEffect(() => {
    if (selectedQuestion) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [selectedQuestion.id]: score,
      }));
    }
  }, [selectedQuestion, setFormData, score]);

  return (
    <div>
      {/* <h2
        className='title'
        style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
      >
        Response Yes or No
      </h2> */}
      <div>
        {surveyList.map((survey) => (
          <div
            className='entry'
            key={survey.id}
            onClick={() => setSelectedQuestion(survey)}
            style={{
              padding: '10px',
              margin: '10px',
              borderRadius: '10px',
              border: `2px solid ${selectedQuestion === survey ? 'blue' : 'gray'}`,
            }}
          >
            <h3>{survey.id}. {survey.detail}</h3>
            <button onClick={() => handleBooleanClick(true)}>Yes</button>
            <button onClick={() => handleBooleanClick(false)}>No</button>
          </div>
        ))}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default BooleanForm;

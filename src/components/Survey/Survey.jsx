import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import LikertForm from '../LikertForm/LikertForm';
import FreeForm from '../FreeForm/FreeForm';
import BooleanForm from '../BooleanForm/BooleanForm';
import './Survey.css';

const likertOptionStyle = {
  padding: '5px',
  cursor: 'pointer',
  margin: '0 5px',
};

function Survey() {
  // const dispatch = useDispatch();
  // const surveyList = useSelector((store) => store.survey.surveyList);
  // const [selectedQuestion, setSelectedQuestion] = useState(null);
  // const [replyBody, setReplyBody] = useState('');
  // const [userId, setUserId] = useState(0);
  // const [score, setScore] = useState(0);
  // const currentDate = dayjs();
  // const likertFormRef = useRef(null);

  // useEffect(() => {
  //   getSurveyList();
  // }, []);

  // const getSurveyList = () => {
  //   dispatch({ type: 'FETCH_SURVEY' });
  // };

  // const addSurveyReply = (event) => {
  //   event.preventDefault();

  //   if (selectedQuestion) {
  //     dispatch({
  //       type: 'FETCH_REPLY',
  //       payload: {
  //         response: replyBody,
  //         question_id: selectedQuestion.id,
  //         score: score,
  //         user_id: userId,
  //         date: currentDate,
  //       },
  //     });
  //   } else {
  //     alert('Please select a question before submitting.');
  //   }
  // };

  // const handleLikertClick = (selectedScore) => {
  //   setScore(selectedScore);
  //   if (likertFormRef.current) {
  //     likertFormRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
  //   }
  // };

  // const handleBooleanClick = (selectedBoolean) => {
  // };

  return (
    <div>
      <h2 className="survey-title">SURVEY</h2>
    
    <LikertForm />
    <FreeForm />
    <BooleanForm />
      {/* <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Welcome to the Survey
      </h2>
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
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <h2
        className='title'
        style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
      >
        Response 1-5
      </h2>
      <form
        ref={likertFormRef}
        className='likert form'
        onSubmit={(e) => addSurveyReply(e)}
        style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
      >
        <div style={{ display: 'flex' }}>
          <span onClick={() => handleLikertClick(1)} style={likertOptionStyle}>
            1
          </span>
          <span onClick={() => handleLikertClick(2)} style={likertOptionStyle}>
            2
          </span>
          <span onClick={() => handleLikertClick(3)} style={likertOptionStyle}>
            3
          </span>
          <span onClick={() => handleLikertClick(4)} style={likertOptionStyle}>
            4
          </span>
          <span onClick={() => handleLikertClick(5)} style={likertOptionStyle}>
            5
          </span>
        </div>
      </form>
      <br></br>
      <br></br>
      <h2
        className='title'
        style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
      >
        Response Free Writing
      </h2>
      <form
        className='free write form'
        onSubmit={(e) => addSurveyReply(e)}
        style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
      >
        <input type='text' placeholder='' value={replyBody} onChange={(e) => setReplyBody(e.target.value)} />
        <br />
        <button type='submit'>Submit</button>
      </form>
      <br></br>
      <br></br>
      <h2
        className='title'
        style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
      >
        Response Form
      </h2>
      {selectedQuestion && (
        <>
          {selectedQuestion.type === 'likert' && (
            <LikertForm handleLikertClick={handleLikertClick} />
          )}
          {selectedQuestion.type === 'free form' && (
            <FreeForm replyBody={replyBody} setReplyBody={setReplyBody} />
          )}
          {selectedQuestion.type === 'boolean' && (
            <BooleanForm handleBooleanClick={handleBooleanClick} />
          )}
        </>
      )} */}
    </div>
  );
}

export default Survey;

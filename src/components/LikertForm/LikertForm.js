import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import './LikertForm.css';

const likertOptionStyle = {
  padding: '5px',
  cursor: 'pointer',
  margin: '0 5px',
};

const selectedOptionStyle = {
  color: 'green',
  fontWeight: 'bold',
};

function LikertForm({ formData, setFormData, clearForm }) {
  const dispatch = useDispatch();
  const likertList = useSelector((store) => store.likertReducer.likertList);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [replyBody, setReplyBody] = useState('');
  const [userId, setUserId] = useState(0);
  const [currentScore, setCurrentScore] = useState({});
  const currentDate = dayjs();
  const likertFormRef = useRef(null);

  useEffect(() => {
    getLikertList();
  }, []);

  const getLikertList = () => {
    dispatch({ type: 'FETCH_LIKERT' });
  };

  const addLikertReply = (event) => {
    event.preventDefault();
  
    if (selectedQuestion) {
      dispatch({
          type: 'FETCH_REPLY_LIKERT',
          payload: {
              response: currentScore[selectedQuestion.id].toString(),
              user_id: userId,
              date: currentDate.format(),
              question_id: selectedQuestion.id,
          },
      })
      .then((result) => {
        if (result && result.status === 201) {
          clearForm();
        } else {
          console.error('Failed to submit likert reply:', result);
          alert('Failed to submit likert reply!');
        }
      })
      .catch((error) => {
        console.error('Error submitting likert reply:', error);
        alert('Failed to submit likert reply!');
      });
    } else {
      alert('Please select a question before submitting.');
    }
  };
  

  const handleLikertClick = (questionId, selectedScore) => {
    setCurrentScore((prevScore) => ({ ...prevScore, [questionId]: selectedScore }));
    if (likertFormRef.current) {
      likertFormRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  };

  useEffect(() => {
    if (selectedQuestion) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [selectedQuestion.id]: currentScore[selectedQuestion.id],
      }));
    }
  }, [currentScore, selectedQuestion, setFormData]);

  return (
    <div className='survey-background'>
      <div>
        {likertList.map((likert) => (
          <div
            className='entry'
            key={likert.id}
            onClick={() => setSelectedQuestion(likert)}
            style={{
              padding: '10px',
              margin: '10px',
              borderRadius: '10px',
              border: `2px solid ${selectedQuestion === likert ? 'blue' : '#efcd3e'}`,
            }}
          >
            <h3> {likert.detail}</h3>
            <form ref={likertFormRef} className='likert form' onSubmit={(e) => addLikertReply(e)}>
              <div style={{ display: 'flex' }}>
                <span
                  onClick={() => handleLikertClick(likert.id, 1)}
                  style={{ ...likertOptionStyle, ...(currentScore[likert.id] === 1 && selectedOptionStyle) }}
                >
                  1 Strongly Disagree
                </span>
                <span
                  onClick={() => handleLikertClick(likert.id, 2)}
                  style={{ ...likertOptionStyle, ...(currentScore[likert.id] === 2 && selectedOptionStyle) }}
                >
                  2 Disagree
                </span>
                <span
                  onClick={() => handleLikertClick(likert.id, 3)}
                  style={{ ...likertOptionStyle, ...(currentScore[likert.id] === 3 && selectedOptionStyle) }}
                >
                  3 Neutral
                </span>
                <span
                  onClick={() => handleLikertClick(likert.id, 4)}
                  style={{ ...likertOptionStyle, ...(currentScore[likert.id] === 4 && selectedOptionStyle) }}
                >
                  4 Agree
                </span>
                <span
                  onClick={() => handleLikertClick(likert.id, 5)}
                  style={{ ...likertOptionStyle, ...(currentScore[likert.id] === 5 && selectedOptionStyle) }}
                >
                  5 Strongly Agree
                </span>
              </div>
            </form>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default LikertForm;

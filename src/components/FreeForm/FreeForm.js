import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FormControl } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import './FreeForm.css';

function FreeForm({ formData, setFormData, clearForm }) {
    const dispatch = useDispatch();
    const freeformList = useSelector((store) => store.freeformReducer.freeformList);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [responseState, setResponseState] = useState({});
    const [userId, setUserId] = useState(0);
    const currentDate = dayjs();

    useEffect(() => {
        getFreeformList();
    }, []);

    const getFreeformList = () => {
        dispatch({ type: 'FETCH_FREEFORM' });
    };

    const addFreeformReply = (event) => {
        event.preventDefault();
      
        if (selectedQuestion) {
          dispatch({
              type: 'FETCH_REPLY_FREEFORM',
              payload: {
                  response: responseState[selectedQuestion.id] || '',
                  question_id: selectedQuestion.id,   
                  user_id: userId,
                  date: currentDate.format(),
              },
          })
          .then((result) => {
            if (result && result.status === 201) {
              clearForm();
            } else {
              console.error('Failed to submit freeform reply:', result);
              alert('Failed to submit freeform reply!');
            }
          })
          .catch((error) => {
            console.error('Error submitting freeform reply:', error);
            alert('Failed to submit freeform reply!');
          });
        } else {
          alert('Please select a question before submitting.');
        }
      };
      

    const handleInputChange = (e) => {
        const { value } = e.target;
        setResponseState((prevState) => ({
            ...prevState,
            [selectedQuestion.id]: value,
        }));
    };

    useEffect(() => {
        if (selectedQuestion) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [selectedQuestion.id]: responseState[selectedQuestion.id],
            }));
        }
    }, [responseState, selectedQuestion, setFormData]);

    return (
        <div className='survey-background'>
            <div>
                {freeformList.map((freeform) => (
                    <div
                        className='entry'
                        key={freeform.id}
                        onClick={() => setSelectedQuestion(freeform)}
                        style={{
                            padding: '10px',
                            margin: '10px',
                            paddingBottom: '20px',
                            borderBottom: `1px solid ${selectedQuestion === freeform ? 'blue' : '#efcd3e'}`,
                        }}>
                        <h3> {freeform.detail}</h3>
                        <form
                            className='free write form'
                            onSubmit={addFreeformReply}
                        >
                            <textarea className="inputfield" type='text' placeholder='     Write your thoughts' value={responseState[freeform.id] || ''} onChange={handleInputChange} />
                            <br />
                        </form>
                    </div>
                ))}
            </div>
        
        </div>
    );
}

export default FreeForm;

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import './FreeForm.css';

function FreeForm() {
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
            });
        } else {
            alert('Please select a question before submitting.');
        }
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setResponseState(prevState => ({
            ...prevState,
            [selectedQuestion.id]: value,
        }));
    };

    return (
        <div className='survey-backgorund'>
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
                            borderBottom: `1px solid ${selectedQuestion === freeform ? 'blue' : 'gray'}`,
                        }}>
                        <h3>{freeform.id}. {freeform.detail}</h3>
                        <form
                            className='free write form'
                            onSubmit={addFreeformReply}
                        >
                            <input className="inputfield" type='text' placeholder='' value={responseState[freeform.id] || ''} onChange={handleInputChange} />
                            <br />
                            <button className='submit-button' type='submit'>Submit</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FreeForm;

import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import './FreeForm.css';

function FreeForm() {

    const dispatch = useDispatch();
    const freeformList = useSelector((store) => store.freeformReducer.freeformList);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [replyBody, setReplyBody] = useState('');
    const [userId, setUserId] = useState(0);
    const [score, setScore] = useState(0);
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
                    response: replyBody,
                    question_id: selectedQuestion.id,   
                    user_id: userId,
                    date: currentDate,
                },
            });
        } else {
            alert('Please select a question before submitting.');
        }
    };

    return (
        <div className='survey-backgorund'>
            {/* <h2
                className='title'
                style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
            >
                Response Free Writing
            </h2> */}
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
                            onSubmit={(e) => addFreeformReply(e)}
                        // style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}
                        >
                            <input className="inputfield" type='text' placeholder='' value={replyBody} onChange={(e) => setReplyBody(e.target.value)} />
                            <br />
                            <button className='submit-button' type='submit'>Submit</button>
                        </form>
                    </div>
                ))}
             
               
            </div>
        </div>
    )
}

export default FreeForm;

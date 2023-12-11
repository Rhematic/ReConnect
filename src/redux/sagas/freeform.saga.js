// freeform.saga.js
import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* getFreeformList() {
  try {
    const freeformQuestion = yield axios.get('/api/freeform');
    yield put({ type: 'SET_FREEFORM', payload: freeformQuestion.data });
  } catch (error) {
    console.log('ERROR in getFreeformList', error);
    alert('Something went wrong!');
  }
}

function* addFreeformReply(action) {
  try {
    const freeformReply = yield axios.post('/api/freeform', {
      response: action.payload.response,
      user_id: action.payload.user_id,
      question_id: action.payload.question_id,
      score: action.payload.score,
      date: action.payload.date,
    });
    yield put({ type: 'SET_REPLY_FREEFORM', payload: freeformReply.data });

    // Dispatch action to indicate successful submission of all forms
    // yield put({ type: 'SUBMIT_ALL_FORMS_SUCCESS', payload: freeformReply.data });
  } catch (error) {
    console.log('ERROR in addfreeFormReply', error);
    alert('Something went wrong!');
  }
}

function* freeformSaga() {
  yield takeLatest('FETCH_FREEFORM', getFreeformList);
  yield takeLatest('FETCH_REPLY_FREEFORM', addFreeformReply);
}

export default freeformSaga;

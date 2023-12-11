// likert.saga.js
import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* getLikertList() {
  try {
    const likertQuestion = yield axios.get('/api/likert');
    yield put({ type: 'SET_LIKERT', payload: likertQuestion.data });
  } catch (error) {
    console.log('ERROR in getLikertList', error);
    alert('Something went wrong!');
  }
}

function* addLikertReply(action) {
  try {
    const likertReply = yield axios.post('/api/likert', {
      response: action.payload.response,
      user_id: action.payload.user_id,
      question_id: action.payload.question_id,
      score: action.payload.score,
      date: action.payload.date,
    });
    yield put({ type: 'SET_REPLY_LIKERT', payload: likertReply.data });

    // Dispatch action to indicate successful submission of all forms
    // yield put({ type: 'SUBMIT_ALL_FORMS_SUCCESS', payload: likertReply.data });
  } catch (error) {
    console.log('ERROR in addLikertReply', error);
    alert('Something went wrong!');
  }
}

function* likertSaga() {
  yield takeLatest('FETCH_LIKERT', getLikertList);
  yield takeLatest('FETCH_REPLY_LIKERT', addLikertReply);
}

export default likertSaga;

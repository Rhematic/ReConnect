// survey.saga.js
import axios from 'axios';
import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import dayjs from 'dayjs';

function* getSurveyList() {
  try {
    const surveyQuestion = yield axios.get('/api/survey');
    yield put({ type: 'SET_SURVEY', payload: surveyQuestion.data });
  } catch (error) {
    console.log('ERROR in getSurveyList', error);
    alert('Something went wrong!');
  }
}

function* submitLikertForm(action) {
  try {
    const { likertFormData } = action.payload;
    const userId = yield select(state => state.user.id); // Assuming you store user details in the Redux store
    const currentDate = dayjs().format(); // Format the date before sending

    yield axios.post('/api/likert', {
      response: likertFormData,
      user_id: userId,
      date: currentDate,
    });

    // No specific success action
  } catch (error) {
    console.log('ERROR in submitLikertForm', error);
    alert('Failed to submit likert form!');
  }
}

function* submitFreeForm(action) {
  try {
    const { freeFormData } = action.payload;
    const userId = yield select(state => state.user.id); // Assuming you store user details in the Redux store
    const currentDate = dayjs().format(); // Format the date before sending

    yield axios.post('/api/freeform', {
      response: freeFormData,
      user_id: userId,
      date: currentDate,
    });

    // No specific success action
  } catch (error) {
    console.log('ERROR in submitFreeForm', error);
    alert('Failed to submit freeform!');
  }
}

function* submitAllForms(action) {
  try {
    const { likertFormData, freeFormData } = action.payload;

    yield all([
      call(submitLikertForm, { payload: { likertFormData } }),
      call(submitFreeForm, { payload: { freeFormData } }),
    ]);

    // No specific success action for all forms
  } catch (error) {
    console.log('ERROR in submitAllForms', error);
    alert('Failed to submit all forms!');
  }
}


function* surveySaga() {
  yield takeLatest('FETCH_SURVEY', getSurveyList);
  yield takeLatest('SUBMIT_ALL_FORMS', submitAllForms);
}

export default surveySaga;

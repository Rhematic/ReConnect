// survey.reducer.js
import { combineReducers } from 'redux';

const surveyList = (state = [], action) => {
  switch (action.type) {
    case 'SET_SURVEY':
      return action.payload;
    default:
      return state;
  }
};

const surveyReply = (state = [], action) => {
  switch (action.type) {
    case 'SUBMIT_ALL_FORMS_SUCCESS':
      return {
        ...state,
        likertFormData: action.payload.likertFormData,
        freeFormData: action.payload.freeFormData,
      };
    default:
      return state;
  }
};

export default combineReducers({
  surveyList,
  surveyReply,
});

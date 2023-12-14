import { combineReducers } from 'redux';

const likertList = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIKERT':
      return action.payload;
    default:
      return state;
  }
};

const likertReply = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPLY_LIKERT':
      return action.payload;
    case 'SUBMIT_ALL_FORMS_SUCCESS':
      return {
        ...state,
        likertFormData: action.payload.likertFormData,
      };
    default:
      return state;
  }
};

export default combineReducers({
  likertList,
  likertReply,
});

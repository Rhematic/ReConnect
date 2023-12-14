import { combineReducers } from 'redux';

const freeformList = (state = [], action) => {
  switch (action.type) {
    case 'SET_FREEFORM':
      return action.payload;
    default:
      return state;
  }
};

const freeformReply = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPLY_FREEFORM':
      return action.payload;
    case 'SUBMIT_ALL_FORMS_SUCCESS':
      return {
        ...state,
        freeFormData: action.payload.freeFormData,
      };
    default:
      return state;
  }
};

export default combineReducers({
  freeformList,
  freeformReply,
});

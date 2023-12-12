import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEvent() {
  try {
    const response = yield axios.get("/api/event");
    yield put({ type: "SET_EVENT", payload: response.data });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* postEvent(action) {
  try {
    yield axios.post("/api/event", action.payload);
    yield put({ type: "FETCH_EVENT" });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}


function* editEventSaga(action) {
  try {
      const { eventId, eventData } = action.payload;
      yield axios.put(`/api/event/${eventId}`, eventData);
      yield put({ type: 'FETCH_EVENT' }); 
  } catch (error) {
      console.error('Error in editEventSaga', error);
  }
}

function* deleteEventSaga(action) {
  try {
      const eventId = action.payload;
      yield axios.delete(`/api/event/${eventId}`);
      yield put({ type: 'FETCH_EVENT' }); 
  } catch (error) {
      console.error('Error in deleteEventSaga', error);
  }
}

function* eventSaga() {
  yield takeLatest("FETCH_EVENT", fetchEvent);
  yield takeLatest("POST_EVENT", postEvent);
  yield takeLatest("EDIT_EVENT", editEventSaga);  
  yield takeLatest("DELETE_EVENT", deleteEventSaga);  
}


export default eventSaga;

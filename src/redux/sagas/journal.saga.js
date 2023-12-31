import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchJournal() {
  try {
    const response = yield axios.get("/api/journal");
    yield put({ type: "SET_JOURNAL", payload: response.data });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* journalSaga() {
  yield takeLatest("FETCH_JOURNAL", fetchJournal);
}

export default journalSaga;

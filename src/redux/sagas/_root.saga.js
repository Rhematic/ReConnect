import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import familySaga from "./family.saga";
import eventSaga from "./event.saga";
import resourceSaga from "./resource.saga";
import questionSaga from "./question.saga";
import responseSaga from "./response.saga";
import promptSaga from "./prompt.saga";
import journalSaga from "./journal.saga";
import surveySaga from './survey.saga';
import freeformSaga from "./freeform.saga";
import likertSaga from "./likert.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    surveySaga(),
    familySaga(),
    eventSaga(),
    questionSaga(),
    responseSaga(),
    promptSaga(),
    journalSaga(),
    freeformSaga(),
    likertSaga(),
  ]);
}

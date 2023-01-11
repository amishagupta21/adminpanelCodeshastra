import { takeEvery, put, call } from "redux-saga/effects";

// Login Redux States
import { GET_LEARNER } from "./actionTypes";

import {
  getLearnerSuccess,
  getLearnerFail,
  getLearnerCountFail,
  getLearnerCountSuccess,
} from "./actions";
import { getLearnerList } from "helpers/fakebackend_helper";
import tosterMsg from "components/Common/toster";

function* fetchDemoData({ payload: data }) {
  try {
    const response = yield call(getLearnerList, data);
    tosterMsg(response?.message);
    yield put(getLearnerSuccess(response?.data?.docs));
    yield put(getLearnerCountSuccess(response?.data?.totalDocs));
  } catch (error) {
    tosterMsg(error?.message);
    yield put(getLearnerFail(error));
    yield put(getLearnerCountFail(error));
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_LEARNER, fetchDemoData);
}

export default usersManageSaga;

import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_LEARNER,
  DELETE_LEARNER,
  FILTER_STATUS_LEARNER,
  GET_ALL_LEARNER,
} from "./actionTypes"

import {
  getLearnerSuccess,
  getLearnerFail,
  getLearnerCountFail,
  getLearnerCountSuccess,
  getAllLearnerSuccess,
  getAllLearnerFail,
  deleteLearnerSuccess,
  deleteLearnerFail,
} from "./actions"
import {
  getLearnerList,
  getDeleteData,
  getStatusFilter,
  getAllLearnerList,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchDemoData({ payload: data }) {
  try {
    const response = yield call(getLearnerList, data)
    tosterMsg(response?.message)
    yield put(getLearnerSuccess(response?.data?.docs))
    yield put(getLearnerCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getLearnerFail(error))
    yield put(getLearnerCountFail(error))
  }
}

// function* fetchAllDemoData({ payload: data }) {
//   try {
//     const response = yield call(getAllLearnerList, data)
//     tosterMsg(response?.message)
//     yield put(getAllLearnerSuccess(response?.data?.docs))
//     yield put(getLearnerCountSuccess(response?.data?.totalDocs))
//   } catch (error) {
//     tosterMsg(error?.message)
//     yield put(getAllLearnerFail(error))
//     yield put(getLearnerCountFail(error))
//   }
// }

function* onDeleteLearner({ payload: event }) {
  try {
    const response = yield call(getDeleteData, event)
    yield put({ type: GET_LEARNER, payload: { search: "" } })
    yield put(deleteLearnerSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(deleteLearnerFail(error))
  }
}

function* onFilterLearner({ payload: data }) {
  try {
    const response = yield call(getStatusFilter, data)
    tosterMsg(response?.message)
    yield put(getLearnerSuccess(response?.data?.docs))
    yield put(getLearnerCountSuccess(response?.data?.totalDocs))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getLearnerFail(error))
    yield put(getLearnerCountFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_LEARNER, fetchDemoData)
  // yield takeEvery(GET_ALL_LEARNER, fetchAllDemoData)
  yield takeEvery(DELETE_LEARNER, onDeleteLearner)
  yield takeEvery(FILTER_STATUS_LEARNER, onFilterLearner)
}

export default usersManageSaga

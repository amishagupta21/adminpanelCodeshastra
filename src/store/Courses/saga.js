import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_COURSES,
  DELETE_LEARNER,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

import {
  getCoursesSuccess,
  getCoursesFail,
  getCoursesCountFail,
  getCoursesCountSuccess,
  deleteLearnerSuccess,
  deleteLearnerFail,
} from "./actions"
import {
  getCoursesList,
  getDeleteData,
  getStatusFilter,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchCoursesList({ payload: data }) {
  try {
    const response = yield call(getCoursesList, data)
    tosterMsg(response?.message)
    yield put(getCoursesSuccess(response?.data?.result))
    yield put(getCoursesCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getCoursesFail(error))
    yield put(getCoursesCountFail(error))
  }
}

// function* onDeleteLearner({ payload: event }) {
//   try {
//     const response = yield call(getDeleteData, event)
//     yield put({ type: GET_LEARNER, payload: { search: "" } })
//     yield put(deleteLearnerSuccess(response))
//   } catch (error) {
//     toasterMsg(error?.message)
//     yield put(deleteLearnerFail(error))
//   }
// }

// function* onFilterLearner({ payload: data }) {
//   try {
//     const response = yield call(getStatusFilter, data)
//     tosterMsg(response?.message)
//     yield put(getLearnerSuccess(response?.data?.docs))
//     yield put(getLearnerCountSuccess(response?.data?.totalDocs))
//   } catch (error) {
//     tosterMsg(error?.message)
//     yield put(getLearnerFail(error))
//     yield put(getLearnerCountFail(error))
//   }
// }

function* usersManageSaga() {
  yield takeEvery(GET_COURSES, fetchCoursesList)
  // yield takeEvery(DELETE_LEARNER, onDeleteLearner)
  // yield takeEvery(FILTER_STATUS_LEARNER, onFilterLearner)
}

export default usersManageSaga

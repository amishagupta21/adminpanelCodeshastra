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

function* usersManageSaga() {
  yield takeEvery(GET_COURSES, fetchCoursesList)
}

export default usersManageSaga

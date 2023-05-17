import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_COURSE_INFORMATION,
  EDIT_COURSE_INFORMATION,
  EDIT_CARD_CONFIGURATION,
} from "./actionTypes"

import {
  getCourseInformationSuccess,
  getCourseInformationFail,
  editCourseInformationSuccess,
  editCourseInformationFail,
  editCardConfigurationSuccess,
  editCardConfigurationFail,
} from "./actions"
import { getCourse, editCourse, editCard } from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* getCourseInformation({ payload: data }) {
  try {
    const response = yield call(getCourse, data)
    tosterMsg(response?.message)
    yield put(getCourseInformationSuccess(response))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getCourseInformationFail(error))
  }
}

function* editCourseInformation({ payload: data }) {
  try {
    const response = yield call(editCourse, data)
    tosterMsg(response?.message)
    yield put(editCourseInformationSuccess(response))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(editCourseInformationFail(error))
  }
}

function* editCardConfiguration({ payload: data }) {
  try {
    const response = yield call(editCard, data)
    tosterMsg(response?.message)
    yield put(editCardConfigurationSuccess(response))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(editCardConfigurationFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_COURSE_INFORMATION, getCourseInformation)
  yield takeEvery(EDIT_COURSE_INFORMATION, editCourseInformation)
  yield takeEvery(EDIT_CARD_CONFIGURATION, editCardConfiguration)
}

export default usersManageSaga

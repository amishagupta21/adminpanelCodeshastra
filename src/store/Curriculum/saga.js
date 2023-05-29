import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_CURRICULUM,
  DELETE_LEARNER,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

import {
  getCurriculumSuccess,
  getCurriculumFail,
  getCurriculumCountFail,
  getCurriculumCountSuccess,
  deleteLearnerSuccess,
  deleteLearnerFail,
} from "./actions"
import {
  getCurriculumList,
  getDeleteData,
  getStatusFilter,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchCurriculumList({ payload: data }) {
  try {
    const response = yield call(getCurriculumList, data)
    tosterMsg(response?.message)
    yield put(getCurriculumSuccess(response?.data?.result))
    yield put(getCurriculumCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getCurriculumFail(error))
    yield put(getCurriculumCountFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_CURRICULUM, fetchCurriculumList)
}

export default usersManageSaga

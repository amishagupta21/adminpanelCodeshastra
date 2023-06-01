import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_BATCHES,
  GET_BATCHES_LIST,
  GET_BATCHES_LEARNER,
  GET_GRADE_BOOK,
  GET_NEW_BATCHES,
  CREATE_NEW_BATCH,
  GET_DASHBOARD,
  DELETE_LEARNER,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

import {
  getBatchesSuccess,
  getBatchesFail,
  getBatchesCountFail,
  getBatchesCountSuccess,
  getBatchesListSuccess,
  getBatchesListFail,
  getBatchesListCountFail,
  getBatchesListCountSuccess,
  deleteLearnerSuccess,
  deleteLearnerFail,
  getBatchesLearnerSuccess,
  getBatchesLearnerCountSuccess,
  getBatchesLearnerCountFail,
  getGradeBookSuccess,
  getGradeBookCountSuccess,
  getGradeBookCountFail,
  getNewBatchesSuccess,
  getNewBatchesCountSuccess,
  getNewBatchesCountFail,
  createNewBatchSuccess,
  createNewBatchFail,
  getDashboardSuccess,
  getDashboardCountSuccess,
  getDashboardCountFail,
} from "./actions"
import {
  getBatchesList,
  getBatches,
  getBatchesLearner,
  getBatchesGrade,
  createNewBatchesData,
  getDashboardApi,
  getNewBatches,
  getDeleteData,
  getStatusFilter,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchBatchesList({ payload: data }) {
  try {
    const response = yield call(getBatchesList, data)
    tosterMsg(response?.message)
    yield put(getBatchesSuccess(response?.data?.result))
    yield put(getBatchesCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getBatchesFail(error))
    yield put(getBatchesCountFail(error))
  }
}

// MAIN BATCHES

function* fetchBatches({ payload: data }) {
  try {
    const response = yield call(getBatches, data)
    tosterMsg(response?.message)
    yield put(getBatchesListSuccess(response?.data?.result))
    yield put(getBatchesListCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getBatchesListCountFail(error))
    yield put(getBatchesCountFail(error))
  }
}

// MAIN LEARNER

function* fetchBatchesLearner({ payload: data }) {
  try {
    const response = yield call(getBatchesLearner, data)
    tosterMsg(response?.message)
    yield put(getBatchesLearnerSuccess(response?.data[0]))
    yield put(getBatchesLearnerCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getBatchesLearnerCountFail(error))
    yield put(getBatchesLearnerCountFail(error))
  }
}

// GRADE BOOK

function* fetchGradeBook({ payload: data }) {
  try {
    const response = yield call(getBatchesGrade, data)
    tosterMsg(response?.message)
    yield put(getGradeBookSuccess(response?.data[0]))
    yield put(getGradeBookCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getGradeBookCountFail(error))
    // yield put(getGradeBookCountFail(error))
  }
}

// NEW BATCHES

function* fetchNewBatches({ payload: data }) {
  try {
    const response = yield call(getNewBatches, data)
    tosterMsg(response?.message)
    yield put(getNewBatchesSuccess(response?.data))
    yield put(getNewBatchesCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getNewBatchesCountFail(error))
    // yield put(getGradeBookCountFail(error))
  }
}

// CREATE NEW BATCH

function* createBatch({ payload: data }) {
  try {
    const response = yield call(createNewBatchesData, data)
    tosterMsg(response?.message)
    yield put(createNewBatchSuccess(response))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(createNewBatchFail(error))
  }
}

// DASHBOARD

function* fetchNewDashboard({ payload: data }) {
  try {
    const response = yield call(getDashboardApi, data)
    tosterMsg(response?.message)
    yield put(getDashboardSuccess(response?.data))
    yield put(getDashboardCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getDashboardCountFail(error))
    // yield put(getGradeBookCountFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_BATCHES, fetchBatchesList)
  yield takeEvery(GET_BATCHES_LIST, fetchBatches)
  yield takeEvery(GET_BATCHES_LEARNER, fetchBatchesLearner)
  yield takeEvery(GET_GRADE_BOOK, fetchGradeBook)
  yield takeEvery(GET_NEW_BATCHES, fetchNewBatches)
  yield takeEvery(GET_DASHBOARD, fetchNewDashboard)
  yield takeEvery(CREATE_NEW_BATCH, createBatch)
}

export default usersManageSaga
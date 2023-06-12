import { takeEvery, put, call, fork } from "redux-saga/effects"

// Login Redux States
import {
  GET_BATCHES,
  GET_BATCHES_LIST,
  GET_BATCHES_LEARNER,
  GET_GRADE_BOOK,
  GET_NEW_BATCHES,
  EDIT_NEW_BATCH,
  GET_DASHBOARD,
  GET_MENTOR,
  DELETE_LEARNER,
  DELETE_BATCHES,
  GET_BATCH_API,
  FILTER_STATUS_LEARNER,
  CREATE_NEW_BATCH,
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
  getBatchApiSuccess,
  getBatchApiCountSuccess,
  getBatchApiCountFail,
  getNewBatchesSuccess,
  getNewBatchesCountSuccess,
  getNewBatchesCountFail,
  editNewBatchSuccess,
  editNewBatchFail,
  getDashboardSuccess,
  getDashboardCountSuccess,
  getDashboardCountFail,
  deleteBatchesSuccess,
  deleteBatchesFail,
  getMentorSuccess,
  getMentorCountSuccess,
  getMentorCountFail,
  createNewBatchSuccess,
  createNewBatchFail,
} from "./actions"
import {
  getBatchesList,
  getBatches,
  getBatchesLearner,
  getBatchesGrade,
  getBatchesApi,
  editNewBatchesData,
  getDashboardApi,
  getNewBatches,
  getMentorApi,
  getDeleteData,
  getDeleteBatches,
  getStatusFilter,
  createNewBatchesData,
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

// GET EDIT BATCH API

function* fetchBatchApi({ payload: data }) {
  try {
    const response = yield call(getBatchesApi, data)
    tosterMsg(response?.message)
    yield put(getBatchApiSuccess(response?.data))
    yield put(getBatchApiCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getBatchApiCountFail(error))
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
//create batch
function* createBatch({ payload: data }) {
  try {
    const response = yield call(createNewBatchesData, data)
    tosterMsg(response?.message)
    yield put(createNewBatchSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(createNewBatchFail(error))
  }
}

// EDIT BATCH

function* editBatch({ payload: data }) {
  try {
    const id = data.id
    delete data?.id
    const response = yield call(editNewBatchesData, data, id)
    tosterMsg(response?.message)
    yield call(fetchBatches, {})
    yield put(editNewBatchSuccess(response))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(editNewBatchFail(error))
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

function* onDeleteBatches({ payload: event }) {
  try {
    const response = yield call(getDeleteBatches, event)
    yield put({ type: GET_BATCHES, payload: { search: "" } })
    yield put(deleteBatchesSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(deleteBatchesFail(error))
  }
}
// MENTOR

function* fetchNewMentor({ payload: data }) {
  try {
    const response = yield call(getMentorApi, data)
    tosterMsg(response?.message)
    yield put(getMentorSuccess(response?.data))
    yield put(getMentorCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getMentorCountFail(error))
    // yield put(getGradeBookCountFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_BATCHES, fetchBatchesList)
  yield takeEvery(GET_BATCHES_LIST, fetchBatches)
  yield takeEvery(GET_BATCHES_LEARNER, fetchBatchesLearner)
  yield takeEvery(GET_GRADE_BOOK, fetchGradeBook)
  yield takeEvery(GET_BATCH_API, fetchBatchApi)
  yield takeEvery(GET_NEW_BATCHES, fetchNewBatches)
  yield takeEvery(GET_DASHBOARD, fetchNewDashboard)
  yield takeEvery(GET_MENTOR, fetchNewMentor)
  yield takeEvery(EDIT_NEW_BATCH, editBatch)
  yield takeEvery(CREATE_NEW_BATCH, createBatch)
  yield takeEvery(DELETE_BATCHES, onDeleteBatches)
}

export default usersManageSaga

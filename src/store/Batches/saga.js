import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_BATCHES,
  GET_BATCHES_LIST,
  GET_BATCHES_LEARNER,
  GET_GRADE_BOOK,
  CREATE_NEW_BATCH,
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
} from "./actions"
import {
  getBatchesList,
  getBatches,
  getBatchesLearner,
  getBatchesGrade,
  createNewBatchesData,
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
  console.log(data,"working")
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
  yield takeEvery(GET_BATCHES, fetchBatchesList)
  yield takeEvery(GET_BATCHES_LIST, fetchBatches)
  yield takeEvery(GET_BATCHES_LEARNER, fetchBatchesLearner)
  yield takeEvery(GET_GRADE_BOOK, fetchGradeBook)
  yield takeEvery(GET_BATCHES_LIST, fetchNewBatches)
  yield takeEvery(CREATE_NEW_BATCH, createBatch)

  // yield takeEvery(DELETE_LEARNER, onDeleteLearner)
  // yield takeEvery(FILTER_STATUS_LEARNER, onFilterLearner)
}

export default usersManageSaga

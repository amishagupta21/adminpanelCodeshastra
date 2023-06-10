import {
  GET_BATCHES,
  GET_BATCHES_SUCCESS,
  GET_BATCHES_FAIL,
  GET_BATCHES_COUNT_FAIL,
  GET_BATCHES_COUNT_SUCCESS,
  GET_BATCHES_LIST,
  GET_BATCHES_LIST_SUCCESS,
  GET_BATCHES_LIST_FAIL,
  GET_BATCHES_LIST_COUNT_FAIL,
  GET_BATCHES_LIST_COUNT_SUCCESS,
  GET_BATCHES_LEARNER,
  GET_BATCHES_LEARNER_SUCCESS,
  GET_BATCHES_LEARNER_FAIL,
  GET_BATCHES_LEARNER_COUNT_SUCCESS,
  GET_BATCHES_LEARNER_COUNT_FAIL,
  GET_GRADE_BOOK,
  GET_GRADE_BOOK_SUCCESS,
  GET_GRADE_BOOK_FAIL,
  GET_GRADE_BOOK_COUNT_SUCCESS,
  GET_GRADE_BOOK_COUNT_FAIL,
  GET_NEW_BATCHES,
  GET_NEW_BATCHES_SUCCESS,
  GET_NEW_BATCHES_FAIL,
  GET_NEW_BATCHES_COUNT_SUCCESS,
  GET_NEW_BATCHES_COUNT_FAIL,
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
  GET_DASHBOARD_COUNT_SUCCESS,
  GET_DASHBOARD_COUNT_FAIL,
  DELETE_BATCHES,
  DELETE_BATCHES_SUCCESS,
  DELETE_BATCHES_FAIL,
  GET_MENTOR,
  GET_MENTOR_SUCCESS,
  GET_MENTOR_FAIL,
  GET_MENTOR_COUNT_SUCCESS,
  GET_MENTOR_COUNT_FAIL,
  GET_LECTURE,
  GET_LECTURE_SUCCESS,
  GET_LECTURE_FAIL,
  GET_LECTURE_COUNT_SUCCESS,
  GET_LECTURE_COUNT_FAIL,
  GET_BATCH_API,
  GET_BATCH_API_SUCCESS,
  GET_BATCH_API_FAIL,
  GET_BATCH_API_COUNT_SUCCESS,
  GET_BATCH_API_COUNT_FAIL,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  EDIT_NEW_BATCH,
  EDIT_NEW_BATCH_SUCCESS,
  EDIT_NEW_BATCH_FAIL,
  FILTER_STATUS_LEARNER,
  CREATE_NEW_BATCH,
  CREATE_NEW_BATCH_SUCCESS,
  CREATE_NEW_BATCH_FAIL,

} from "./actionTypes"

export const getBatches = data => ({
  type: GET_BATCHES,
  payload: data,
})

export const getBatchesSuccess = data => ({
  type: GET_BATCHES_SUCCESS,
  payload: data,
})

export const getBatchesFail = error => ({
  type: GET_BATCHES_FAIL,
  payload: error,
})

export const getBatchesCountSuccess = data => ({
  type: GET_BATCHES_COUNT_SUCCESS,
  payload: data,
})

export const getBatchesCountFail = error => ({
  type: GET_BATCHES_COUNT_FAIL,
  payload: error,
})

// MAIN BATCHES

export const getBatchesList = data => ({
  type: GET_BATCHES_LIST,
  payload: data,
})

export const getBatchesListSuccess = data => ({
  type: GET_BATCHES_LIST_SUCCESS,
  payload: data,
})

export const getBatchesListFail = error => ({
  type: GET_BATCHES_LIST_FAIL,
  payload: error,
})

export const getBatchesListCountSuccess = data => ({
  type: GET_BATCHES_LIST_COUNT_SUCCESS,
  payload: data,
})

export const getBatchesListCountFail = error => ({
  type: GET_BATCHES_LIST_COUNT_FAIL,
  payload: error,
})

// LEARNERS

export const getBatchesLearner = data => ({
  type: GET_BATCHES_LEARNER,
  payload: data,
})

export const getBatchesLearnerSuccess = data => ({
  type: GET_BATCHES_LEARNER_SUCCESS,
  payload: data,
})

export const getBatchesLearnerFail = error => ({
  type: GET_BATCHES_LEARNER_FAIL,
  payload: error,
})

export const getBatchesLearnerCountSuccess = data => ({
  type: GET_BATCHES_LEARNER_COUNT_SUCCESS,
  payload: data,
})

export const getBatchesLearnerCountFail = error => ({
  type: GET_BATCHES_LEARNER_COUNT_FAIL,
  payload: error,
})

// GRADE BOOK

export const getGradeBook = data => ({
  type: GET_GRADE_BOOK,
  payload: data,
})


export const getGradeBookSuccess = data => ({
  type: GET_GRADE_BOOK_SUCCESS,
  payload: data,
})

export const getGradeBookFail = error => ({
  type: GET_GRADE_BOOK_FAIL,
  payload: error,
})

export const getGradeBookCountSuccess = data => ({
  type: GET_GRADE_BOOK_COUNT_SUCCESS,
  payload: data,
})

export const getGradeBookCountFail = error => ({
  type: GET_GRADE_BOOK_COUNT_FAIL,
  payload: error,
})

// CREATE NEW BATCHES

export const getNewBatches = data => ({
  type: GET_NEW_BATCHES,
  payload: data,
})

export const getNewBatchesSuccess = data => ({
  type: GET_NEW_BATCHES_SUCCESS,
  payload: data,
})

export const getNewBatchesFail = error => ({
  type: GET_NEW_BATCHES_FAIL,
  payload: error,
})

export const getNewBatchesCountSuccess = data => ({
  type: GET_NEW_BATCHES_COUNT_SUCCESS,
  payload: data,
})

export const getNewBatchesCountFail = error => ({
  type: GET_NEW_BATCHES_COUNT_FAIL,
  payload: error,
})

// Edit New Batches

export const editNewBatch = data => {
  return {
    type: EDIT_NEW_BATCH,
    payload: data,
  }
}

export const editNewBatchSuccess = data => ({
  type: EDIT_NEW_BATCH_SUCCESS,
  payload: data,
})

export const editNewBatchFail = error => ({
  type: EDIT_NEW_BATCH_FAIL,
  payload: error,
})

//create batch

export const createNewBatch = data => {
  return {
    type: CREATE_NEW_BATCH,
    payload: data,
  }
}

export const createNewBatchSuccess = data => ({
  type:   CREATE_NEW_BATCH_SUCCESS,
  payload: data,
})

export const createNewBatchFail = error => ({
  type:   CREATE_NEW_BATCH_FAIL,
  payload: error,
})

// DASHBOARD API

export const getDashboard = data => ({
  type: GET_DASHBOARD,
  payload: data,
})

export const getDashboardSuccess = data => ({
  type: GET_DASHBOARD_SUCCESS,
  payload: data,
})

export const getDashboardFail = error => ({
  type: GET_DASHBOARD_FAIL,
  payload: error,
})

export const getDashboardCountSuccess = data => ({
  type: GET_DASHBOARD_COUNT_SUCCESS,
  payload: data,
})

export const getDashboardCountFail = error => ({
  type: GET_DASHBOARD_COUNT_FAIL,
  payload: error,
})

export const deleteBatches = id => ({
  type: DELETE_BATCHES,
  payload: id,
})
// MENTOR API

export const getMentor = data => ({
  type: GET_MENTOR,
  payload: data,
})

export const getMentorSuccess = data => ({
  type: GET_MENTOR_SUCCESS,
  payload: data,
})

export const getMentorFail = error => ({
  type: GET_MENTOR_FAIL,
  payload: error,
})

export const getMentorCountSuccess = data => ({
  type: GET_MENTOR_COUNT_SUCCESS,
  payload: data,
})

export const getMentorCountFail = error => ({
  type: GET_MENTOR_COUNT_FAIL,
  payload: error,
})

// LECTURE API

export const getLecture = data => ({
  type: GET_LECTURE,
  payload: data,
})

export const getLectureSuccess = data => ({
  type: GET_LECTURE_SUCCESS,
  payload: data,
})

export const getLectureFail = error => ({
  type: GET_LECTURE_FAIL,
  payload: error,
})

export const getLectureCountSuccess = data => ({
  type: GET_LECTURE_COUNT_SUCCESS,
  payload: data,
})

export const getLectureCountFail = error => ({
  type: GET_LECTURE_COUNT_FAIL,
  payload: error,
})

// EDIT API

export const getBatchApi = data => ({
  type: GET_BATCH_API,
  payload: data,
})

export const getBatchApiSuccess = data => ({
  type: GET_BATCH_API_SUCCESS,
  payload: data,
})

export const getBatchApiFail = error => ({
  type: GET_BATCH_API_FAIL,
  payload: error,
})

export const getBatchApiCountSuccess = data => ({
  type: GET_BATCH_API_COUNT_SUCCESS,
  payload: data,
})

export const getBatchApiCountFail = error => ({
  type: GET_BATCH_API_COUNT_FAIL,
  payload: error,
})

// export const deleteLearner = id => ({
//   type: DELETE_LEARNER,
//   payload: id,
// })

export const deleteBatchesSuccess = event => ({
  type: DELETE_BATCHES_SUCCESS,
  payload: event,
})

export const deleteBatchesFail = error => ({
  type: DELETE_BATCHES_FAIL,
  payload: error,
})

// export const getStatusFilter = data => ({
//   type: FILTER_STATUS_LEARNER,
//   payload: data,
// })

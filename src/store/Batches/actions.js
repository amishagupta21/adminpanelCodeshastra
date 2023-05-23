import {
  GET_BATCHES,
  GET_BATCHES_SUCCESS,
  GET_BATCHES_FAIL,
  GET_BATCHES_COUNT_FAIL,
  GET_BATCHES_COUNT_SUCCESS,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
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

// export const deleteLearner = id => ({
//   type: DELETE_LEARNER,
//   payload: id,
// })

// export const deleteLearnerSuccess = event => ({
//   type: DELETE_LEARNER_SUCCESS,
//   payload: event,
// })

// export const deleteLearnerFail = error => ({
//   type: DELETE_LEARNER_FAIL,
//   payload: error,
// })

// export const getStatusFilter = data => ({
//   type: FILTER_STATUS_LEARNER,
//   payload: data,
// })

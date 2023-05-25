import {
  GET_VARIANT,
  GET_VARIANT_SUCCESS,
  GET_VARIANT_FAIL,
  GET_VARIANT_COUNT_FAIL,
  GET_VARIANT_COUNT_SUCCESS,
  EDIT_VARIANT,
  EDIT_VARIANT_SUCCESS,
  EDIT_VARIANT_FAIL,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

export const getVariant = data => ({
  type: GET_VARIANT,
  payload: data,
})

export const getVariantSuccess = data => ({
  type: GET_VARIANT_SUCCESS,
  payload: data,
})

export const getVariantFail = error => ({
  type: GET_VARIANT_FAIL,
  payload: error,
})

export const getVariantCountSuccess = data => ({
  type: GET_VARIANT_COUNT_SUCCESS,
  payload: data,
})

export const getVariantCountFail = error => ({
  type: GET_VARIANT_COUNT_FAIL,
  payload: error,
})

export const editVariant = data => ({
  type: EDIT_VARIANT,
  payload: data,
})

export const editVariantSuccess = data => ({
  type: EDIT_VARIANT_SUCCESS,
  payload: data,
})

export const editVariantFail = error => ({
  type: EDIT_VARIANT_FAIL,
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

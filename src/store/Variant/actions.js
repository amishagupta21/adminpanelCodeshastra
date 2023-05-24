import {
  GET_VARIANT,
  GET_VARIANT_SUCCESS,
  GET_VARIANT_FAIL,
  GET_VARIANT_COUNT_FAIL,
  GET_VARIANT_COUNT_SUCCESS,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

export const getVariant = data => (
  console.log(data, "//////////data"),
  {
    type: GET_VARIANT,
    payload: data,
  }
)

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

import {
  GET_LEARNER,
  GET_LEARNER_SUCCESS,
  GET_LEARNER_FAIL,
  GET_LEARNER_COUNT_FAIL,
  GET_LEARNER_COUNT_SUCCESS,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
} from "./actionTypes"

export const getLearner = data => ({
  type: GET_LEARNER,
  payload: data,
})

export const getLearnerSuccess = data => ({
  type: GET_LEARNER_SUCCESS,
  payload: data,
})

export const getLearnerFail = error => ({
  type: GET_LEARNER_FAIL,
  payload: error,
})

export const getLearnerCountSuccess = data => ({
  type: GET_LEARNER_COUNT_SUCCESS,
  payload: data,
})

export const getLearnerCountFail = error => ({
  type: GET_LEARNER_COUNT_FAIL,
  payload: error,
})

export const deleteLearner = id => ({
  type: DELETE_LEARNER,
  payload: id,
})

export const deleteLearnerSuccess = event => ({
  type: DELETE_LEARNER_SUCCESS,
  payload: event,
})

export const deleteLearnerFail = error => ({
  type: DELETE_LEARNER_FAIL,
  payload: error,
})

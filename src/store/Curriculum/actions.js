import {
  GET_CURRICULUM,
  GET_CURRICULUM_SUCCESS,
  GET_CURRICULUM_FAIL,
  GET_CURRICULUM_COUNT_FAIL,
  GET_CURRICULUM_COUNT_SUCCESS,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

export const getCurriculum = data => ({
  type: GET_CURRICULUM,
  payload: data,
})

export const getCurriculumSuccess = data => ({
  type: GET_CURRICULUM_SUCCESS,
  payload: data,
})

export const getCurriculumFail = error => ({
  type: GET_CURRICULUM_FAIL,
  payload: error,
})

export const getCurriculumCountSuccess = data => ({
  type: GET_CURRICULUM_COUNT_SUCCESS,
  payload: data,
})

export const getCurriculumCountFail = error => ({
  type: GET_CURRICULUM_COUNT_FAIL,
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

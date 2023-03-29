import {
  GET_COURSES,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  GET_COURSES_COUNT_FAIL,
  GET_COURSES_COUNT_SUCCESS,
  DELETE_LEARNER,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

export const getCourses = data => ({
  type: GET_COURSES,
  payload: data,
})

export const getCoursesSuccess = data => ({
  type: GET_COURSES_SUCCESS,
  payload: data,
})

export const getCoursesFail = error => ({
  type: GET_COURSES_FAIL,
  payload: error,
})

export const getCoursesCountSuccess = data => ({
  type: GET_COURSES_COUNT_SUCCESS,
  payload: data,
})

export const getCoursesCountFail = error => ({
  type: GET_COURSES_COUNT_FAIL,
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

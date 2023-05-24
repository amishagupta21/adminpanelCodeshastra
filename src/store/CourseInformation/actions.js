import {
  GET_COURSE_INFORMATION,
  GET_COURSE_INFORMATION_SUCCESS,
  GET_COURSE_INFORMATION_FAIL,
  EDIT_COURSE_INFORMATION,
  EDIT_COURSE_INFORMATION_SUCCESS,
  EDIT_COURSE_INFORMATION_FAIL,
  EDIT_CARD_CONFIGURATION,
  EDIT_CARD_CONFIGURATION_SUCCESS,
  EDIT_CARD_CONFIGURATION_FAIL,
  EDIT_COURSE_DETAIL,
  EDIT_COURSE_DETAIL_SUCCESS,
  EDIT_COURSE_DETAIL_FAIL,
} from "./actionTypes"

export const getCourseInformation = data => ({
  type: GET_COURSE_INFORMATION,
  payload: data,
})

export const getCourseInformationSuccess = data => ({
  type: GET_COURSE_INFORMATION_SUCCESS,
  payload: data,
})

export const getCourseInformationFail = error => ({
  type: GET_COURSE_INFORMATION_FAIL,
  payload: error,
})

export const editCourseInformation = data => ({
  type: EDIT_COURSE_INFORMATION,
  payload: data,
})

export const editCourseInformationSuccess = data => ({
  type: EDIT_COURSE_INFORMATION_SUCCESS,
  payload: data,
})

export const editCourseInformationFail = error => ({
  type: EDIT_COURSE_INFORMATION_FAIL,
  payload: error,
})
export const editCardConfiguration = data => ({
  type: EDIT_CARD_CONFIGURATION,
  payload: data,
})

export const editCardConfigurationSuccess = data => ({
  type: EDIT_CARD_CONFIGURATION_SUCCESS,
  payload: data,
})

export const editCardConfigurationFail = error => ({
  type: EDIT_CARD_CONFIGURATION_FAIL,
  payload: error,
})

export const editCourseDetail = data => ({
  type: EDIT_COURSE_DETAIL,
  payload: data,
})

export const editCourseDetailSuccess = data => ({
  type: EDIT_COURSE_DETAIL_SUCCESS,
  payload: data,
})

export const editCourseDetailFail = error => ({
  type: EDIT_COURSE_DETAIL_FAIL,
  payload: error,
})

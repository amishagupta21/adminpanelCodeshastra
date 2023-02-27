import {
  EDIT_EDUCATION_DETAIL,
  EDIT_EDUCATION_DETAIL_SUCCESS,
  EDIT_EDUCATION_DETAIL_FAIL,
} from "./actionTypes"

export const editEducationDetail = data => ({
  type: EDIT_EDUCATION_DETAIL,
  payload: data,
})

export const editEducationDetailSuccess = data => ({
  type: EDIT_EDUCATION_DETAIL_SUCCESS,
  payload: data,
})

export const editEducationDetailFail = error => ({
  type: EDIT_EDUCATION_DETAIL_FAIL,
  payload: error,
})

import {
  EDIT_WORK_DETAIL,
  EDIT_WORK_DETAIL_SUCCESS,
  EDIT_WORK_DETAIL_FAIL,
} from "./actionTypes"

export const editWorkDetail = data => ({
  type: EDIT_WORK_DETAIL,
  payload: data,
})

export const editWorkDetailSuccess = data => ({
  type: EDIT_WORK_DETAIL_SUCCESS,
  payload: data,
})

export const editWorkDetailFail = error => ({
  type: EDIT_WORK_DETAIL_FAIL,
  payload: error,
})

import {
  API_SUCCESS,
  API_FETCH,
  API_FAIL,
  GET_CHARTS_DATA,
} from "./actionTypes"

export const apiSuccess = data => ({
  type: API_SUCCESS,
  payload: data,
})

export const apiFetch = data => {
  return {
    type: API_FETCH,
    payload: data,
  }
}

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
})

// charts data
export const getChartsData = periodType => ({
  type: GET_CHARTS_DATA,
  payload: periodType,
})

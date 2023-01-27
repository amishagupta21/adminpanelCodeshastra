import {
  GET_APPLICATION_LISTING,
  GET_APPLICATION_LISTING_SUCCESS,
  GET_APPLICATION_LISTING_FAIL,
  GET_APPLICATION_LISTING_COUNT_FAIL,
  GET_APPLICATION_LISTING_COUNT_SUCCESS,
  DELETE_APPLICATION_LISTING,
  DELETE_APPLICATION_LISTING_SUCCESS,
  DELETE_APPLICATION_LISTING_FAIL,
} from "./actionTypes"

export const getApplicationListing = data => ({
  type: GET_APPLICATION_LISTING,
  payload: data,
})

export const getApplicationListingSuccess = data => ({
  type: GET_APPLICATION_LISTING_SUCCESS,
  payload: data,
})

export const getApplicationListingFail = error => ({
  type: GET_APPLICATION_LISTING_FAIL,
  payload: error,
})

export const getApplicationListingCountSuccess = (data, count) => ({
  type: GET_APPLICATION_LISTING_COUNT_SUCCESS,
  payload: data,
  count: count,
})

export const getApplicationListingCountFail = error => ({
  type: GET_APPLICATION_LISTING_COUNT_FAIL,
  payload: error,
})

export const deleteApplicationListing = id => ({
  type: DELETE_APPLICATION_LISTING,
  payload: id,
})

export const deleteApplicationListingSuccess = event => ({
  type: DELETE_APPLICATION_LISTING_SUCCESS,
  payload: event,
})

export const deleteApplicationListingFail = error => ({
  type: DELETE_APPLICATION_LISTING_FAIL,
  payload: error,
})

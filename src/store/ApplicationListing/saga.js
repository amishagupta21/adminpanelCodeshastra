import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_APPLICATION_LISTING,
  DELETE_APPLICATION_LISTING,
} from "./actionTypes"

import {
  getApplicationListingSuccess,
  getApplicationListingFail,
  getApplicationListingCountFail,
  getApplicationListingCountSuccess,
  deleteApplicationListingSuccess,
  deleteApplicationListingFail,
} from "./actions"
import {
  getApplicationListing,
  getDeleteData,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchDemoData({ payload: data }) {
  try {
    const response = yield call(getApplicationListing, data)
    tosterMsg(response?.message)
    yield put(
      getApplicationListingSuccess(response?.data?.applicationsData?.docs)
    )
    yield put(
      getApplicationListingCountSuccess(
        response?.data?.applicationsData?.docs,
        response?.data?.count
      )
    )
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getApplicationListingFail(error))
    yield put(getApplicationListingCountFail(error))
  }
}

function* onDeleteApplicationListing({ payload: event }) {
  try {
    const response = yield call(getDeleteData, event)
    console.log(response, "/////////response")
    yield put(deleteApplicationListingSuccess(response))
  } catch (error) {
    yield put(deleteApplicationListingFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_APPLICATION_LISTING, fetchDemoData)
  yield takeEvery(DELETE_APPLICATION_LISTING, onDeleteApplicationListing)
}

export default usersManageSaga

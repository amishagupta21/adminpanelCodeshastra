import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import { GET_APPLICATION_LISTING } from "./actionTypes"

import {
  getApplicationListingSuccess,
  getApplicationListingFail,
  getApplicationListingCountFail,
  getApplicationListingCountSuccess,
} from "./actions"
import { getApplicationListing } from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchDemoData({ payload: data }) {
  try {
    const response = yield call(getApplicationListing, data)
    tosterMsg(response?.message)
    yield put(getApplicationListingSuccess(response?.data?.applicationsData))
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

function* usersManageSaga() {
  yield takeEvery(GET_APPLICATION_LISTING, fetchDemoData)
}

export default usersManageSaga

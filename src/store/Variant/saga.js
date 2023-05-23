import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_VARIANT,
  DELETE_LEARNER,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

import {
  getVariantSuccess,
  getVariantFail,
  getVariantCountFail,
  getVariantCountSuccess,
} from "./actions"
import { getVariantList } from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchVariantList({ payload: data }) {
  try {
    const response = yield call(getVariantList, data)
    tosterMsg(response?.message)
    yield put(getVariantSuccess(response?.data))
    yield put(getVariantCountSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getVariantFail(error))
    yield put(getVariantCountFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_VARIANT, fetchVariantList)
}

export default usersManageSaga

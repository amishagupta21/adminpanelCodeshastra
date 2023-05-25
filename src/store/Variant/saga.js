import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  GET_VARIANT,
  EDIT_VARIANT,
  DELETE_LEARNER,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

import {
  getVariantSuccess,
  getVariantFail,
  getVariantCountFail,
  getVariantCountSuccess,
  editVariantSuccess,
  editVariantFail,
} from "./actions"
import { getVariantList, editVariant } from "helpers/fakebackend_helper"
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

function* editVariantCourse({ payload: data }) {
  try {
    const response = yield call(editVariant, data)
    tosterMsg(response?.message)
    yield put(editVariantSuccess(response))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(editVariantFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_VARIANT, fetchVariantList)
  yield takeEvery(EDIT_VARIANT, editVariantCourse)
}

export default usersManageSaga

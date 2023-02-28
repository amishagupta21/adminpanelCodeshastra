import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_EDUCATION_DETAIL } from "./actionTypes"

import { editEducationDetailSuccess, editEducationDetailFail } from "./actions"
import { editEducationDetail } from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* editData({ payload: data }) {
  try {
    const response = yield call(editEducationDetail, data)
    tosterMsg(response?.message)
    yield put(editEducationDetailSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(editEducationDetailFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(EDIT_EDUCATION_DETAIL, editData)
}

export default usersManageSaga

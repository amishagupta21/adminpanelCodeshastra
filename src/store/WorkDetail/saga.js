import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_WORK_DETAIL } from "./actionTypes"

import { editWorkDetailSuccess, editWorkDetailFail } from "./actions"
import { getEditWorkDetail } from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* editWorkData({ payload: data }) {
  try {
    const response = yield call(getEditWorkDetail, data)
    tosterMsg(response?.message)
    yield put(editWorkDetailSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(editWorkDetailFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(EDIT_WORK_DETAIL, editWorkData)
}

export default usersManageSaga

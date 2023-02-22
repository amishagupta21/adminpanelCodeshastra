import { call, put, takeEvery, all, fork } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CHARTS_DATA,
  API_SUCCESS,
  API_FETCH,
  API_FAIL,
} from "./actionTypes"
import { apiSuccess, apiFail, getChartsData } from "./actions"

//Include Both Helper File with needed methods
import { getDashboardData } from "../../helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchDashboardData({ payload: data }) {
  try {
    const response = yield call(getDashboardData, data)
    // debugger
    tosterMsg("Update Data Success")
    yield put(apiSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(apiFail(error))
  }
}

export function* watchGetDashboardData() {
  yield takeEvery(API_FETCH, fetchDashboardData)
}

function* dashboardSaga() {
  yield all([fork(watchGetDashboardData)])
}

export default dashboardSaga

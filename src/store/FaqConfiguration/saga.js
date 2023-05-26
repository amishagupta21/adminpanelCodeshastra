import { takeEvery, put, call } from "redux-saga/effects"
// import{
//     GET_FAQS
// } from "./actionTypes"

// import{
//     getFaqs
// }from "./action"

import {
    GET_FAQS,
  } from "./actionTypes"

  import {
    getFaqsSuccess,
    getFaqsFail,
    getFaqsCountSuccess,
    getFaqsCountFail,
  } from "./action"
  import {
    getFaqList,
    
  } from "helpers/fakebackend_helper"

  import tosterMsg from "components/Common/toster"

  function* fetchFaqsList({ payload: data }) {
    try {
      const response = yield call(getFaqList, data)
      tosterMsg(response?.message)
      yield put(getFaqsSuccess(response?.data?.result))
      yield put(getFaqsCountSuccess(response?.data))
    } catch (error) {
      tosterMsg(error?.message)
      yield put(getFaqsFail(error))
      yield put(getFaqsCountFail(error))
    }
  }

  function* usersManageSagaFaq() {
    yield takeEvery(GET_FAQS, fetchFaqsList)
    // yield takeEvery(DELETE_LEARNER, onDeleteLearner)
    // yield takeEvery(FILTER_STATUS_LEARNER, onFilterLearner)
  }
  
  export default usersManageSagaFaq
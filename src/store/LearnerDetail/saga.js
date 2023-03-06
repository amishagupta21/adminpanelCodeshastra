import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  DELETE_PROFILE_PICTURE,
  GET_LEARNER_DETAILS,
  PROFILE_PICTURE,
  EDIT_LEARNER_DETAIL,
  UPLOAD_PROFILE_PICTURE,
} from "./actionTypes"

import {
  getLearnerDetailsSuccess,
  getLearnerDetailsFail,
  profilePictureSuccess,
  profilePictureFail,
  deleteProfilePictureSuccess,
  deleteProfilePictureFail,
  uploadProfilePictureSuccess,
  uploadProfilePictureFail,
  uploadProfilePictureSuccessUrl,
  uploadProfilePictureFailUrl,
  profilePicture,
  editLearnerDetailSuccess,
  editLearnerDetailFail,
} from "./actions"
import {
  getLearnerDetailsList,
  getProfilePicture,
  getDeleteProfilePicture,
  getUploadProfilePicture,
  uploadProfilePictureUrl,
  editLearnerDetail,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* fetchDemoData({ payload: data }) {
  try {
    const response = yield call(getLearnerDetailsList, data)
    tosterMsg(response?.message)
    yield put(getLearnerDetailsSuccess(response?.data))
  } catch (error) {
    tosterMsg(error?.message)
    yield put(getLearnerDetailsFail(error))
  }
}

function* profilePictureApi({ payload: data }) {
  try {
    const response = yield call(getProfilePicture, data)
    // tosterMsg(response?.message)
    yield put(profilePictureSuccess(response?.data))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(profilePictureFail(error))
  }
}

function* deleteProfilePicture({ payload: uid }) {
  try {
    const response = yield call(getDeleteProfilePicture, uid)
    tosterMsg(response?.message)
    fetchDemoData()
    yield put(deleteProfilePictureSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(deleteProfilePictureFail(error))
  }
}

function* uploadProfilePicture({ payload: data }) {
  try {
    const response = yield call(getUploadProfilePicture, data?.data)
    const uploadResponse = yield call(uploadProfilePictureUrl, {
      url: response?.data?.signedUrl,
      data: data?.img,
    })
    yield put(
      profilePicture({ uid: data?.data?.uid, document_type: "profile_picture" })
    )
    // tosterMsg(response?.message)
    yield put(uploadProfilePictureSuccess(response?.data?.signedUrl))
  } catch (error) {
    // toasterMsg(error?.message)
    yield put(uploadProfilePictureFail(error))
  }
}

function* editData({ payload: data }) {
  try {
    const response = yield call(editLearnerDetail, data)
    tosterMsg(response?.message)
    yield put(editLearnerDetailSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(editLearnerDetailFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_LEARNER_DETAILS, fetchDemoData)
  yield takeEvery(PROFILE_PICTURE, profilePictureApi)
  yield takeEvery(DELETE_PROFILE_PICTURE, deleteProfilePicture)
  yield takeEvery(UPLOAD_PROFILE_PICTURE, uploadProfilePicture)
  yield takeEvery(EDIT_LEARNER_DETAIL, editData)
}

export default usersManageSaga

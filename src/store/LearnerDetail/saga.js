import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  DELETE_PROFILE_PICTURE,
  GET_LEARNER_DETAILS,
  PROFILE_PICTURE,
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
} from "./actions"
import {
  getLearnerDetailsList,
  getProfilePicture,
  getDeleteProfilePicture,
  getUploadProfilePicture,
  uploadProfilePictureUrl,
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

function* profilePicture({ payload: data }) {
  try {
    const response = yield call(getProfilePicture, data)
    // tosterMsg(response?.message)
    yield put(profilePictureSuccess(response?.data))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(profilePictureFail(error))
  }
}

function* deleteProfilePicture({ payload: event }) {
  try {
    const response = yield call(getDeleteProfilePicture, event)
    tosterMsg(response?.message)
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

    // tosterMsg(response?.message)
    yield put(uploadProfilePictureSuccess(response?.data?.signedUrl))
  } catch (error) {
    // toasterMsg(error?.message)
    yield put(uploadProfilePictureFail(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(GET_LEARNER_DETAILS, fetchDemoData)
  yield takeEvery(PROFILE_PICTURE, profilePicture)
  yield takeEvery(DELETE_PROFILE_PICTURE, deleteProfilePicture)
  yield takeEvery(UPLOAD_PROFILE_PICTURE, uploadProfilePicture)
  // yield takeEvery(UPLOAD_PROFILE_PICTURE_URL, uploadProfilePictureUrl)
}

export default usersManageSaga

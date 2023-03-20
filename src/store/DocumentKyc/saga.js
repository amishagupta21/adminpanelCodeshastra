import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
  DELETE_DOCUMENT_KYC,
  DOCUMENT_PICTURE,
  UPLOAD_DOCUMENT_PICTURE,
  DOCUMENT_PREVIEW,
} from "./actionTypes"

import {
  documentPictureSuccess,
  documentPictureFail,
  deleteDocumentKycSuccess,
  deleteDocumentKycFail,
  uploadDocumentPictureSuccess,
  uploadDocumentPictureFail,
  uploadDocumentPictureSuccessUrl,
  uploadDocumentPictureFailUrl,
  documentPicture,
  documentPreviewSuccess,
  documentPreviewFail,
} from "./actions"
import {
  getUploadDocument,
  getdeleteDocumentKyc,
  getUploadDocumentPicture,
  uploadDocumentPictureUrl,
} from "helpers/fakebackend_helper"
import tosterMsg from "components/Common/toster"

function* documentPictureApi({ payload: data }) {
  try {
    const response = yield call(getUploadDocument, data)
    // yield put(
    //   documentPicture({
    //     uid: data?.data?.uid,
    //     document_type: data?.file_name,
    //   })
    // )
    // tosterMsg(response?.message)
    yield put(documentPictureSuccess(response?.data?.signedUrl))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(documentPictureFail(error))
  }
}

function* documentPreviewApi({ payload: data }) {
  try {
    const response = yield call(getUploadDocument, data)

    yield put(documentPreviewSuccess(response?.data?.signedUrl))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(documentPreviewFail(error))
  }
}

function* deleteDocumentKyc({ payload: data }) {
  try {
    const response = yield call(getdeleteDocumentKyc, data)
    tosterMsg(response?.message)
    yield put(deleteDocumentKycSuccess(response))
  } catch (error) {
    toasterMsg(error?.message)
    yield put(deleteDocumentKycFail(error))
  }
}

function* uploadDocumentPicture({ payload: data }) {
  try {
    const response = yield call(getUploadDocumentPicture, data?.data)
    const uploadResponse = yield call(uploadDocumentPictureUrl, {
      url: response?.data?.signedUrl,
      data: data?.img,
    })

    tosterMsg(response?.message)
    yield put(uploadDocumentPictureSuccess(response?.data?.signedUrl))
  } catch (error) {
    // toasterMsg(error?.message)
    yield put(uploadDocumentPictureFaildata(error))
  }
}

function* usersManageSaga() {
  yield takeEvery(DOCUMENT_PICTURE, documentPictureApi)
  yield takeEvery(DOCUMENT_PREVIEW, documentPreviewApi)
  yield takeEvery(DELETE_DOCUMENT_KYC, deleteDocumentKyc)
  yield takeEvery(UPLOAD_DOCUMENT_PICTURE, uploadDocumentPicture)
}

export default usersManageSaga

import {
  DOCUMENT_PICTURE,
  DOCUMENT_PICTURE_SUCCESS,
  DOCUMENT_PICTURE_FAIL,
  DELETE_DOCUMENT_KYC,
  DELETE_DOCUMENT_KYC_SUCCESS,
  DELETE_DOCUMENT_KYC_FAIL,
  UPLOAD_DOCUMENT_PICTURE,
  UPLOAD_DOCUMENT_PICTURE_SUCCESS,
  UPLOAD_DOCUMENT_PICTURE_FAIL,
  UPLOAD_DOCUMENT_PICTURE_URL,
  UPLOAD_DOCUMENT_PICTURE_SUCCESS_URL,
  UPLOAD_DOCUMENT_PICTURE_FAIL_URL,
  DOWNLOAD_IMAGE,
  DOCUMENT_PREVIEW,
  DOCUMENT_PREVIEW_SUCCESS,
  DOCUMENT_PREVIEW_FAIL,
  PREVIEW_IMAGE_RESET,
} from "./actionTypes"

export const documentPicture = data => ({
  type: DOCUMENT_PICTURE,
  payload: data,
})

export const documentPictureSuccess = data => ({
  type: DOCUMENT_PICTURE_SUCCESS,
  payload: data,
})

export const documentPictureFail = error => ({
  type: DOCUMENT_PICTURE_FAIL,
  payload: error,
})

export const documentPreview = data => ({
  type: DOCUMENT_PREVIEW,
  payload: data,
})

export const documentPreviewSuccess = data => ({
  type: DOCUMENT_PREVIEW_SUCCESS,
  payload: data,
})

export const documentPreviewFail = error => ({
  type: DOCUMENT_PREVIEW_FAIL,
  payload: error,
})

export const deleteDocumentKyc = uid => ({
  type: DELETE_DOCUMENT_KYC,
  payload: uid,
})

export const deleteDocumentKycSuccess = event => ({
  type: DELETE_DOCUMENT_KYC_SUCCESS,
  payload: event,
})

export const deleteDocumentKycFail = error => ({
  type: DELETE_DOCUMENT_KYC_FAIL,
  payload: error,
})

export const uploadDocumentPicture = id => ({
  type: UPLOAD_DOCUMENT_PICTURE,
  payload: id,
})

export const uploadDocumentPictureSuccess = data => ({
  type: UPLOAD_DOCUMENT_PICTURE_SUCCESS,
  payload: data,
})

export const uploadDocumentPictureFail = error => ({
  type: UPLOAD_DOCUMENT_PICTURE_FAIL,
  payload: error,
})

export const uploadDocumentPictureUrl = data => ({
  type: UPLOAD_DOCUMENT_PICTURE_URL,
  payload: data,
})

export const uploadDocumentPictureSuccessUrl = data => ({
  type: UPLOAD_DOCUMENT_PICTURE_SUCCESS_URL,
  payload: data,
})

export const uploadDocumentPictureFailUrl = error => ({
  type: UPLOAD_DOCUMENT_PICTURE_FAIL_URL,
  payload: error,
})

export const downloadAllImage = () => ({
  type: DOWNLOAD_IMAGE,
})

export const resetPreviewImage = () => ({
  type: PREVIEW_IMAGE_RESET,
})

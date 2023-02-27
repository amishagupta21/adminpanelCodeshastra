import {
  GET_LEARNER_DETAILS,
  GET_LEARNER_DETAILS_SUCCESS,
  GET_LEARNER_DETAILS_FAIL,
  GET_LEARNER_DETAILS_COUNT_FAIL,
  GET_LEARNER_DETAILS_COUNT_SUCCESS,
  PROFILE_PICTURE,
  PROFILE_PICTURE_SUCCESS,
  PROFILE_PICTURE_FAIL,
  DELETE_DOCUMENT_KYC,
  DELETE_DOCUMENT_KYC_SUCCESS,
  DELETE_DOCUMENT_KYC_FAIL,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_FAIL,
  UPLOAD_PROFILE_PICTURE_URL,
  UPLOAD_PROFILE_PICTURE_SUCCESS_URL,
  UPLOAD_PROFILE_PICTURE_FAIL_URL,
} from "./actionTypes"

export const getLearnerDetails = data => {
  return {
    type: GET_LEARNER_DETAILS,
    payload: data,
  }
}

export const getLearnerDetailsSuccess = data => ({
  type: GET_LEARNER_DETAILS_SUCCESS,
  payload: data,
})

export const getLearnerDetailsFail = error => ({
  type: GET_LEARNER_DETAILS_FAIL,
  payload: error,
})

export const getLearnerDetailsCountSuccess = data => ({
  type: GET_LEARNER_DETAILS_COUNT_SUCCESS,
  payload: data,
})

export const getLearnerDetailsCountFail = error => ({
  type: GET_LEARNER_DETAILS_COUNT_FAIL,
  payload: error,
})

export const profilePicture = data => ({
  type: PROFILE_PICTURE,
  payload: data,
})

export const profilePictureSuccess = data => ({
  type: PROFILE_PICTURE_SUCCESS,
  payload: data,
})

export const profilePictureFail = error => ({
  type: PROFILE_PICTURE_FAIL,
  payload: error,
})

export const deletedDocument = uid => ({
  type: DELETE_DOCUMENT_KYC,
  payload: uid,
})

export const deletedDocumentSuccess = event => ({
  type: DELETE_DOCUMENT_KYC_SUCCESS,
  payload: event,
})

export const deletedDocumentFail = error => ({
  type: DELETE_DOCUMENT_KYC_FAIL,
  payload: error,
})

export const uploadProfilePicture = id => ({
  type: UPLOAD_DOCUMENT_KYC,
  payload: id,
})

export const uploadProfilePictureSuccess = data => ({
  type: UPLOAD_PROFILE_PICTURE_SUCCESS,
  payload: data,
})

export const uploadProfilePictureFail = error => ({
  type: UPLOAD_PROFILE_PICTURE_FAIL,
  payload: error,
})

export const uploadProfilePictureUrl = data => ({
  type: UPLOAD_PROFILE_PICTURE_URL,
  payload: data,
})

export const uploadProfilePictureSuccessUrl = data => ({
  type: UPLOAD_PROFILE_PICTURE_SUCCESS_URL,
  payload: data,
})

export const uploadProfilePictureFailUrl = error => ({
  type: UPLOAD_PROFILE_PICTURE_FAIL_URL,
  payload: error,
})

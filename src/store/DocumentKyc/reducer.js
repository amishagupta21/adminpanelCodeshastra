import {
  DOCUMENT_PICTURE,
  DOCUMENT_PICTURE_SUCCESS,
  DOCUMENT_PICTURE_FAIL,
  DELETE_DOCUMENT_KYC_FAIL,
  DELETE_DOCUMENT_KYC_SUCCESS,
  UPLOAD_DOCUMENT_PICTURE,
  UPLOAD_DOCUMENT_PICTURE_SUCCESS,
  UPLOAD_DOCUMENT_PICTURE_FAIL,
  UPLOAD_DOCUMENT_PICTURE_URL,
  UPLOAD_DOCUMENT_PICTURE_SUCCESS_URL,
  UPLOAD_DOCUMENT_PICTURE_FAIL_URL,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
  data: [],
  profilePictureUrl: "",
  uploadProfilePicture: "",
}

const DocumentKyc = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DOCUMENT_PICTURE:
      return {
        ...state,
        data: action.payload,
      }
    case DOCUMENT_PICTURE_SUCCESS:
      return {
        ...state,
        profilePictureUrl: action.payload,
      }

    case DOCUMENT_PICTURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_DOCUMENT_KYC_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_DOCUMENT_KYC_SUCCESS:
      return {
        ...state,
        profilePictureUrl: "",
      }

    case UPLOAD_DOCUMENT_PICTURE:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }
    case UPLOAD_DOCUMENT_PICTURE_SUCCESS:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }

    case UPLOAD_DOCUMENT_PICTURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPLOAD_DOCUMENT_PICTURE_URL:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }
    case UPLOAD_DOCUMENT_PICTURE_SUCCESS_URL:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }

    case UPLOAD_DOCUMENT_PICTURE_FAIL_URL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default DocumentKyc

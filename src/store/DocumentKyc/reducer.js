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
  DOWNLOAD_IMAGE,
  DOCUMENT_PREVIEW,
  DOCUMENT_PREVIEW_SUCCESS,
  DOCUMENT_PREVIEW_FAIL,
  PREVIEW_IMAGE_RESET,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
  data: [],
  profilePictureUrl: "",
  uploadProfilePicture: "",
  documentUrl: "",
  downloadImage: false,
  previewImageUrl: null,
  previewImage: false,
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
        documentUrl: action.payload,
        downloadImage: true,
      }

    case DOCUMENT_PICTURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DOCUMENT_PREVIEW:
      return {
        ...state,
        data: action.payload,
      }
    case DOCUMENT_PREVIEW_SUCCESS:
      return {
        ...state,
        previewImageUrl: action.payload,
        previewImage: true,
      }

    case DOCUMENT_PREVIEW_FAIL:
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

    case DOWNLOAD_IMAGE:
      return {
        ...state,
        downloadImage: false,
      }

    case PREVIEW_IMAGE_RESET:
      return {
        ...state,
        previewImage: false,
      }

    default:
      return state
  }
}

export default DocumentKyc

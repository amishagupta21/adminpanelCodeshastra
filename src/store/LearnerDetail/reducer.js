import {
  GET_LEARNER_DETAILS,
  GET_LEARNER_DETAILS_SUCCESS,
  GET_LEARNER_DETAILS_FAIL,
  GET_LEARNER_DETAILS_COUNT_SUCCESS,
  GET_LEARNER_DETAILS_COUNT_FAIL,
  PROFILE_PICTURE,
  PROFILE_PICTURE_SUCCESS,
  PROFILE_PICTURE_FAIL,
  DELETE_PROFILE_PICTURE_FAIL,
  DELETE_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_FAIL,
  UPLOAD_PROFILE_PICTURE_URL,
  UPLOAD_PROFILE_PICTURE_SUCCESS_URL,
  UPLOAD_PROFILE_PICTURE_FAIL_URL,
  EDIT_LEARNER_DETAIL_SUCCESS,
  EDIT_LEARNER_DETAIL_FAIL,
  EDIT_LEARNER_DETAIL,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
  data: [],
  profilePictureUrl: "",
  uploadProfilePicture: "",
}

const LearnerDetails = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEARNER_DETAILS:
      return {
        ...state,
        data: action.payload,
      }
    case GET_LEARNER_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case GET_LEARNER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_LEARNER_DETAILS_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_LEARNER_DETAILS_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // case PROFILE_PICTURE:
    //   return {
    //     ...state,
    //     data: action.payload,
    //   }
    case PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePictureUrl: action.payload,
      }

    case PROFILE_PICTURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PROFILE_PICTURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePictureUrl: "",
      }

    case UPLOAD_PROFILE_PICTURE:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }

    case UPLOAD_PROFILE_PICTURE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPLOAD_PROFILE_PICTURE_URL:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }
    case UPLOAD_PROFILE_PICTURE_SUCCESS_URL:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }

    case UPLOAD_PROFILE_PICTURE_FAIL_URL:
      return {
        ...state,
        error: action.payload,
      }

    case EDIT_LEARNER_DETAIL:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }
    case EDIT_LEARNER_DETAIL_SUCCESS:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }

    case EDIT_LEARNER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default LearnerDetails

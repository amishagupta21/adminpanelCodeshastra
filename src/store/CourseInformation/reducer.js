import {
  GET_COURSE_INFORMATION_SUCCESS,
  GET_COURSE_INFORMATION_FAIL,
  GET_COURSE_INFORMATION,
  EDIT_COURSE_INFORMATION_SUCCESS,
  EDIT_COURSE_INFORMATION_FAIL,
  EDIT_COURSE_INFORMATION,
  EDIT_CARD_CONFIGURATION_SUCCESS,
  EDIT_CARD_CONFIGURATION_FAIL,
  EDIT_CARD_CONFIGURATION,
} from "./actionTypes"

const INIT_STATE = {
  profilePictureUrl: "",
  uploadProfilePicture: "",
  editCourseInformation: "",
  editCardConfiguration: "",
}

const WorkDetails = (state = INIT_STATE, action) => {
  switch (action.type) {
    // case GET_COURSE_INFORMATION:
    //   return {
    //     ...state,
    //     getCourseInformation: action.payload,
    //   }
    case GET_COURSE_INFORMATION_SUCCESS:
      return {
        ...state,
        getCourseInformation: action.payload,
      }

    case GET_COURSE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case EDIT_COURSE_INFORMATION:
      return {
        ...state,
        editCourseInformation: action.payload,
      }
    case EDIT_COURSE_INFORMATION_SUCCESS:
      return {
        ...state,
        editCourseInformation: action.payload,
      }

    case EDIT_COURSE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case EDIT_CARD_CONFIGURATION:
      return {
        ...state,
        editCardConfiguration: action.payload,
      }
    case EDIT_CARD_CONFIGURATION_SUCCESS:
      return {
        ...state,
        editCardConfiguration: action.payload,
      }

    case EDIT_CARD_CONFIGURATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default WorkDetails

import {
  EDIT_EDUCATION_DETAIL_SUCCESS,
  EDIT_EDUCATION_DETAIL_FAIL,
  EDIT_EDUCATION_DETAIL,
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
    case EDIT_EDUCATION_DETAIL:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }
    case EDIT_EDUCATION_DETAIL_SUCCESS:
      return {
        ...state,
        uploadProfilePicture: action.payload,
      }

    case EDIT_EDUCATION_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default LearnerDetails

import {
  EDIT_WORK_DETAIL_SUCCESS,
  EDIT_WORK_DETAIL_FAIL,
  EDIT_WORK_DETAIL,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
  data: [],
  profilePictureUrl: "",
  uploadProfilePicture: "",
  editWorkDetail: "",
}

const WorkDetails = (state = INIT_STATE, action) => {
  switch (action.type) {
    case EDIT_WORK_DETAIL:
      return {
        ...state,
        editWorkDetail: action.payload,
      }
    case EDIT_WORK_DETAIL_SUCCESS:
      return {
        ...state,
        editWorkDetail: action.payload,
      }

    case EDIT_WORK_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default WorkDetails

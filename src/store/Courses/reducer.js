import {
  GET_COURSES,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  GET_COURSES_COUNT_SUCCESS,
  GET_COURSES_COUNT_FAIL,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
}

const Courses = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        data: action.payload,
      }
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_COURSES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COURSES_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_COURSES_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // case DELETE_LEARNER_SUCCESS:
    //   return {
    //     ...state,
    //   }

    // case DELETE_LEARNER_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }
    // case FILTER_STATUS_LEARNER:
    //   return {
    //     ...state,
    //     data: action.payload,
    //   }
    default:
      return state
  }
}

export default Courses

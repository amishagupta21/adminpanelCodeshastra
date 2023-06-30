import {
  GET_LEARNER,
  GET_LEARNER_SUCCESS,
  GET_LEARNER_FAIL,
  GET_LEARNER_COUNT_SUCCESS,
  GET_LEARNER_COUNT_FAIL,
  GET_ALL_LEARNER,
  GET_ALL_LEARNER_SUCCESS,
  GET_ALL_LEARNER_FAIL,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
  manageUserLoader: true,
}

const Learner = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEARNER:
      return {
        ...state,
        data: action.payload,
        manageUserLoader: true,
      }
    case GET_LEARNER_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
        manageUserLoader: false,
      }

    case GET_LEARNER_FAIL:
      return {
        ...state,
        error: action.payload,
        manageUserLoader: true,
      }

    case GET_LEARNER_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_LEARNER_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // ALL LEARNER
    case GET_ALL_LEARNER:
      return {
        ...state,
        data: action.payload,
        manageUserLoader: true,
      }
    case GET_ALL_LEARNER_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
        manageUserLoader: false,
      }

    case GET_ALL_LEARNER_FAIL:
      return {
        ...state,
        error: action.payload,
        manageUserLoader: false,
      }

    case DELETE_LEARNER_SUCCESS:
      return {
        ...state,
      }

    case DELETE_LEARNER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case FILTER_STATUS_LEARNER:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}

export default Learner

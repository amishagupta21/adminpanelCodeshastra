import {
  GET_LEARNER,
  GET_LEARNER_SUCCESS,
  GET_LEARNER_FAIL,
  GET_LEARNER_COUNT_SUCCESS,
  GET_LEARNER_COUNT_FAIL,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
}

const Learner = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEARNER:
      return {
        ...state,
        data: action.payload,
      }
    case GET_LEARNER_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_LEARNER_FAIL:
      return {
        ...state,
        error: action.payload,
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
    case DELETE_LEARNER_SUCCESS:
      return {
        ...state,
        // events: state.events.filter(
        //   event => event.id.toString() !== action.payload.id.toString()
        // ),
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

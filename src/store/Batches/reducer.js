import {
  GET_BATCHES,
  GET_BATCHES_SUCCESS,
  GET_BATCHES_FAIL,
  GET_BATCHES_COUNT_SUCCESS,
  GET_BATCHES_COUNT_FAIL,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
}

const Batches = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BATCHES:
      return {
        ...state,
        data: action.payload,
      }
    case GET_BATCHES_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_BATCHES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BATCHES_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_BATCHES_COUNT_FAIL:
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

export default Batches

import {
  GET_BATCHES,
  GET_BATCHES_SUCCESS,
  GET_BATCHES_FAIL,
  GET_BATCHES_COUNT_SUCCESS,
  GET_BATCHES_COUNT_FAIL,
  GET_BATCHES_LIST,
  GET_BATCHES_LIST_SUCCESS,
  GET_BATCHES_LIST_FAIL,
  GET_BATCHES_LIST_COUNT_SUCCESS,
  GET_BATCHES_LIST_COUNT_FAIL,
  GET_BATCHES_LEARNER,
  GET_BATCHES_LEARNER_SUCCESS,
  GET_BATCHES_LEARNER_FAIL,
  GET_BATCHES_LEARNER_COUNT_SUCCESS,
  GET_BATCHES_LEARNER_COUNT_FAIL,
  GET_GRADE_BOOK,
  GET_GRADE_BOOK_SUCCESS,
  GET_GRADE_BOOK_COUNT_SUCCESS,
  GET_GRADE_BOOK_FAIL,
  GET_GRADE_BOOK_COUNT_FAIL,
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

    // MAIN BATCHES

    case GET_BATCHES_LIST:
      return {
        ...state,
        data: action.payload,
      }
    case GET_BATCHES_LIST_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_BATCHES_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BATCHES_LIST_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_BATCHES_LIST_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // LEARNER

    case GET_BATCHES_LEARNER:
      return {
        ...state,
        data: action.payload,
      }
    case GET_BATCHES_LEARNER_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_BATCHES_LEARNER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BATCHES_LEARNER_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_BATCHES_LEARNER_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // GRADE BOOK

    case GET_GRADE_BOOK:
      return {
        ...state,
        data: action.payload,
      }
    case GET_GRADE_BOOK_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_GRADE_BOOK_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_GRADE_BOOK_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_GRADE_BOOK_COUNT_FAIL:
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

import {
  GET_BATCHES,
  GET_BATCHES_SUCCESS,
  GET_BATCHES_FAIL,
  GET_BATCHES_COUNT_SUCCESS,
  GET_BATCHES_COUNT_FAIL,
  GET_BATCHES_LIST,
  GET_BATCHES_LIST_SUCCESS,
  GET_BATCHES_LIST_FAIL,
  GET_ALL_BATCHES_LIST,
  GET_ALL_BATCHES_LIST_SUCCESS,
  GET_ALL_BATCHES_LIST_FAIL,
  GET_BATCHES_LIST_COUNT_SUCCESS,
  GET_BATCHES_LIST_COUNT_FAIL,
  GET_BATCHES_LEARNER_SUCCESS,
  GET_BATCHES_LEARNER_FAIL,
  GET_BATCHES_LEARNER_COUNT_SUCCESS,
  GET_BATCHES_LEARNER_COUNT_FAIL,
  GET_GRADE_BOOK,
  GET_GRADE_BOOK_SUCCESS,
  GET_GRADE_BOOK_COUNT_SUCCESS,
  GET_GRADE_BOOK_FAIL,
  GET_GRADE_BOOK_COUNT_FAIL,
  FILTER_STATUS_LEARNER,
  GET_NEW_BATCHES,
  GET_NEW_BATCHES_SUCCESS,
  GET_NEW_BATCHES_FAIL,
  GET_NEW_BATCHES_COUNT_SUCCESS,
  GET_NEW_BATCHES_COUNT_FAIL,
  GET_BATCH_API,
  GET_BATCH_API_SUCCESS,
  GET_BATCH_API_FAIL,
  GET_BATCH_API_COUNT_SUCCESS,
  GET_BATCH_API_COUNT_FAIL,
  EDIT_NEW_BATCH_SUCCESS,
  EDIT_NEW_BATCH_FAIL,
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
  GET_DASHBOARD_COUNT_SUCCESS,
  GET_DASHBOARD_COUNT_FAIL,
  GET_MENTOR,
  GET_MENTOR_SUCCESS,
  GET_MENTOR_FAIL,
  GET_MENTOR_COUNT_SUCCESS,
  GET_MENTOR_COUNT_FAIL,
  CREATE_NEW_BATCH,
  CREATE_NEW_BATCH_SUCCESS,
  CREATE_NEW_BATCH_FAIL,
  DELETE_BATCHES_SUCCESS,
  DELETE_BATCHES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
  createNewBatch: "",
  dashboard: [],
  batchesLearner: [],
  totalBatchesLearner: [],
  lecture: [],
  manageUserLoader: true,
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
        manageUserLoader: true,
      }
    case GET_BATCHES_LIST_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
        manageUserLoader: false,
      }

    case GET_BATCHES_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        manageUserLoader: false,
      }

    case GET_ALL_BATCHES_LIST:
      return {
        ...state,
        manageUserLoader: true,
      }
    case GET_ALL_BATCHES_LIST_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
        manageUserLoader: false,
      }

    case GET_ALL_BATCHES_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        manageUserLoader: false,
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

    case GET_BATCHES_LEARNER_SUCCESS:
      return {
        ...state,
        batchesLearner: action.payload[0],
        totalBatchesLearner: action.payload[1],
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
        gradeBook: action.payload,
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

    // GET EDIT BATCH API

    case GET_BATCH_API:
      return {
        ...state,
        data: action.payload,
      }
    case GET_BATCH_API_SUCCESS:
      return {
        ...state,
        batchApi: action.payload,
      }

    case GET_BATCH_API_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BATCH_API_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_BATCH_API_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // CREATE NEW BATCH

    case GET_NEW_BATCHES:
      return {
        ...state,
        newBatch: action.payload,
      }
    case GET_NEW_BATCHES_SUCCESS:
      return {
        ...state,
        newBatch: action.payload,
      }

    case GET_NEW_BATCHES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_NEW_BATCHES_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_NEW_BATCHES_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // EDIT NEW BATCHES

    case EDIT_NEW_BATCH_SUCCESS:
      return {
        ...state,
        createNewBatch: action.payload,
      }

    case EDIT_NEW_BATCH_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    //CREATE  BATCH
    case CREATE_NEW_BATCH:
      return {
        ...state,
        createNewBatch: action.payload,
      }

    case CREATE_NEW_BATCH_SUCCESS:
      return {
        ...state,
        createNewBatch: action.payload,
      }

    case CREATE_NEW_BATCH_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // DASHBOARD

    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      }
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
      }

    case GET_DASHBOARD_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_DASHBOARD_COUNT_SUCCESS:
      return {
        ...state,
        countDashboard: action.payload,
      }

    case GET_DASHBOARD_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_BATCHES_SUCCESS:
      return {
        ...state,
      }
    // MENTOR

    case GET_MENTOR:
      return {
        ...state,
        mentor: action.payload,
      }
    case GET_MENTOR_SUCCESS:
      return {
        ...state,
        mentor: action.payload,
      }

    case GET_MENTOR_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MENTOR_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_MENTOR_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_BATCHES_SUCCESS:
      return {
        ...state,
      }

    case DELETE_BATCHES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
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

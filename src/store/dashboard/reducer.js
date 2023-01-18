import { API_SUCCESS, API_FAIL, GET_CHARTS_DATA } from "./actionTypes"

const INIT_STATE = {
  // data: [],
  // roles: [],
  learnerCount: 0,
  applicationCount: 0,
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      return {
        ...state,
        learnerCount: action.payload.learnerCount,
        applicationCount: action.payload.applicationCount,
      }
    case GET_CHARTS_DATA:
      return {
        ...state,
        learnersData: action.payload,
        count: action.payload,
      }
    // switch (action.payload.actionType) {
    //   case GET_CHARTS_DATA:
    //     return {
    //       ...state,
    //       manageUser: action.payload.data,
    //       count: action.payload,
    //     }
    //   default:
    //     return state
    // }
    case API_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    // switch (action.payload.actionType) {
    //   case GET_CHARTS_DATA:
    //     return {
    //       ...state,
    //       chartsDataError: action.payload.error,
    //     }

    //   default:
    //     return state
    // }
    default:
      return state
  }
}

export default Dashboard

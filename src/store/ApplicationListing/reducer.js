import {
  GET_APPLICATION_LISTING,
  GET_APPLICATION_LISTING_SUCCESS,
  GET_APPLICATION_LISTING_FAIL,
  GET_APPLICATION_LISTING_COUNT_SUCCESS,
  GET_APPLICATION_LISTING_COUNT_FAIL,
  DELETE_APPLICATION_LISTING_SUCCESS,
  DELETE_APPLICATION_LISTING_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
}

const ApplicationListing = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_APPLICATION_LISTING:
      return {
        ...state,
        data: action.payload,
      }
    case GET_APPLICATION_LISTING_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_APPLICATION_LISTING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_APPLICATION_LISTING_COUNT_SUCCESS:
      return {
        ...state,
        count: action.count,
      }

    case GET_APPLICATION_LISTING_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_APPLICATION_LISTING_SUCCESS:
      console.log(
        DELETE_APPLICATION_LISTING_SUCCESS,
        "///////DELETE_LEARNER_SUCCESS"
      )
      return {
        ...state,
        events: state.events.filter(
          event => event.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_APPLICATION_LISTING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default ApplicationListing

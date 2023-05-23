import {
  GET_VARIANT,
  GET_VARIANT_SUCCESS,
  GET_VARIANT_FAIL,
  GET_VARIANT_COUNT_SUCCESS,
  GET_VARIANT_COUNT_FAIL,
  DELETE_LEARNER_SUCCESS,
  DELETE_LEARNER_FAIL,
  FILTER_STATUS_LEARNER,
} from "./actionTypes"

const INIT_STATE = {
  getVariant: [],
  roles: [],
  count: 0,
}

const Variant = (state = INIT_STATE, action) => {
  switch (action.type) {
    // case GET_VARIANT:
    //   return {
    //     ...state,
    //     data: action.payload,
    //   }
    case GET_VARIANT_SUCCESS:
      return {
        ...state,
        getVariant: action.payload,
      }

    case GET_VARIANT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_VARIANT_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_VARIANT_COUNT_FAIL:
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

export default Variant

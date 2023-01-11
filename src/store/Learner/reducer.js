import {
  GET_LEARNER,
  GET_LEARNER_SUCCESS,
  GET_LEARNER_FAIL,
  GET_LEARNER_COUNT_SUCCESS,
  GET_LEARNER_COUNT_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  manageUser: [],
  roles: [],
  count: 0,
};

const Learner = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEARNER:
      return {
        ...state,
        data: action.payload,
      };
    case GET_LEARNER_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      };

    case GET_LEARNER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LEARNER_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      };

    case GET_LEARNER_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Learner;

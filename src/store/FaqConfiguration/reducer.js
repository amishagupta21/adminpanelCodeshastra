// import{
//     GET_FAQS
// }from "./actionTypes"

import {
    GET_FAQS,
    GET_FAQS_SUCCESS,
    GET_FAQS_FAIL,
    GET_FAQS_COUNT_FAIL,
    GET_FAQS_COUNT_SUCCESS,
  } from "./actionTypes"

const INIT_STATE = {
    manageUser: [],
    roles: [],
    count: 0,
  } 

const Faq=(state=INIT_STATE,action)=>{
 switch (action.type) {
    case GET_FAQS:
      return {
        ...state,
        data: action.payload,
      }
    case GET_FAQS_SUCCESS:
      return {
        ...state,
        manageUser: action.payload,
      }

    case GET_FAQS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_FAQS_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      }

    case GET_FAQS_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    
    default:
      return state
  }
}
export default Faq

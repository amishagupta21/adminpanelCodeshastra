// import {
//     GET_FAQS
// } from "./actionTypes"


// export const getFaqs = (data) => ({
//     type: GET_FAQS,
//     payload: data,
// })

import {
    GET_FAQS,
    GET_FAQS_SUCCESS,
    GET_FAQS_FAIL,
    GET_FAQS_COUNT_FAIL,
    GET_FAQS_COUNT_SUCCESS,
  } from "./actionTypes"
  
  export const getFaqs = data => ({
    type: GET_FAQS,
    payload: data,
  })
  
  export const getFaqsSuccess = data => ({
    type: GET_FAQS_SUCCESS,
    payload: data,
  })
  
  export const getFaqsFail = error => ({
    type: GET_FAQS_FAIL,
    payload: error,
  })
  
  export const getFaqsCountSuccess = data => ({
    type: GET_FAQS_COUNT_SUCCESS,
    payload: data,
  })
  
  export const getFaqsCountFail = error => ({
    type: GET_FAQS_COUNT_FAIL,
    payload: error,
  })
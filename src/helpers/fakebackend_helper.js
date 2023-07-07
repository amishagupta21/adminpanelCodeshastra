import axios from "axios"
import {
  del,
  get,
  post,
  put,
  getData,
  deleteData,
  deleteProfilePicture,
  postImage,
  putImage,
  putDetail,
  deleteDocumentKyc,
  getCourseData,
  patch,
} from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

//BATCHES API

const getBatchesList = async data => {
  const resp = await getCourseData(
    url.GET_BATCHES_LIST +
      `?pageSize=${data?.pageSize || 12}&page=${data?.page || 1}&sortOrder=${
        data?.sortOrder || "asc"
      }&sortBy=${data?.sortBy || "created_at"}&startDate=${
        data?.startDate || ""
      }&endDate=${data?.endDate || ""}&keyword=${data?.search || ""}`
  )
  return resp
}

// MAIN BATCHES API

const AllBatches = async data => {
  const allResp = await getCourseData(url.GET_BATCHES)
  return getBatches({ pageSize: allResp?.data?.count })
}

const getBatches = async data => {
  const resp = await getCourseData(
    url.GET_BATCHES +
      `?pageSize=${data?.pageSize || 10}&page=${data?.page || 1}&keyword=${
        data?.search || ""
      }&courseName=${data?.courseName || ""}`
  )

  return resp
}

const getBatchesLearner = async data => {
  const resp = await getCourseData(
    url.GET_BATCHES_LEARNER_LIST +
      `/${data?.id}?pageSize=${data?.pageSize || 28}&page=${
        data?.page || 1
      }&sortBy=${data?.sortBy || "created_at"}&?sortOrder=${
        data?.sortOrder || "DESC"
      }`
  )
  return resp
}

// const getBatchesAllGrade = async data => {
//   const resp1 = await getCourseData(url.GET_GRADE_BOOK + `/${data}`)
//   return getBatchesGrade({ pageSize: resp1?.data[1] })
// }

const getBatchesGrade = async (data, id) => {
  const resp = await getCourseData(
    url.GET_GRADE_BOOK +
      `/${data}?pageSize=${data?.pageSize || 5}&page=${
        data?.page || 1
      }&sortBy=${data?.sortBy || "created_at"}&?sortOrder=${
        data?.sortOrder || "DESC"
      }`
  )
  return resp
}

const getBatchesApi = async data => {
  const resp = await getCourseData(url.GET_BATCHES_API + `/${data}`)
  return resp
}

// NEW BATCHES
const getNewBatches = async data => {
  const resp = await getCourseData(url.GET_NEW_BATCHES + `/${data}`)
  return resp
}

// EDIT NEW BATCHES

const editNewBatchesData = async (data, id) => {
  const resp = await patch(url.EDIT_NEW_BATCHES + `/${id}`, data)
  return resp
}

const createNewBatchesData = async data => {
  const resp = await post(url.CREATE_NEW_BATCHES)
  return resp
}

// DASHBOARD
const getDashboardApi = async data => {
  const resp = await getCourseData(url.GET_DASHBOARD + "/dashboard")
  return resp
}

// MENTOR
const getMentorApi = async data => {
  const resp = await getCourseData(url.GET_MENTOR + "/mentors")
  return resp
}

//VARIANT API

const getVariantList = async data => {
  const resp = await getCourseData(url.GET_VARIANT_LIST + `/${data}`)
  return resp
}

// CURRICULUM API

const getCurriculumList = async data => {
  const resp = await getCourseData(url.GET_CURRICULUM_LIST + `/${data}`)
  return resp
}

//COURSES API

const getCoursesList = async data => {
  const resp = await getCourseData(
    url.GET_COURSELIST +
      `?sortOrder=${data?.sortOrder || "asc"}&sortBy=${
        data?.sortBy || "created_at"
      }&pageSize=${data?.pageSize || 5}&page=${data?.page || 1}&keyword=${
        data?.search || ""
      }`
  )
  return resp
}

const getFaqList = async data => {
  const resp = await getCourseData(
    url.GET_FAQS +
      `?sortOrder=${data?.sortOrder || "asc"}&sortBy=${
        data?.sortBy || "created_at"
      }&pageSize=${data?.pageSize || 5}&page=${data?.page || 1}&keyword=${
        data?.search || ""
      }`
  )
  return resp
}
const getCourse = async id => {
  const resp = await getCourseData(url.GET_COURSES + `/${id}`)
  return resp
}

const editCourse = async data => {
  // Deleting id from data
  const deleteId = { ...data }
  delete deleteId.id
  const resp = await patch(
    url.EDIT_COURSE_INFORMATION + `/${data?.id}`,
    deleteId
  )
  return resp
}

const editVariant = async data => {
  const deleteId = { ...data }
  delete deleteId.id
  const resp = await patch(url.EDIT_VARIANT + `/${data?.id}`, deleteId)
  return resp
}

const editCard = async data => {
  const deleteId = { ...data }
  delete deleteId.id
  const resp = await patch(
    url.EDIT_CARD_CONFIGURATION + `/card-configuration/${data?.id}`,
    deleteId
  )
  return resp
}

const editCourseDetail = async data => {
  const deleteId = { ...data }
  delete deleteId.id
  const resp = await patch(
    url.EDIT_COURSE_DETAIL + `/course-detail-page/${data?.id}`,
    deleteId
  )
  return resp
}

const getAllLearnerList = async data => {
  const res = await getData(url.GET_LEARNER)
  return getLearnerList({ perPage: res?.data?.count })
}

const getLearnerList = async data => {
  const res = await getData(
    url.GET_LEARNER +
      `?page=${data?.currentPage || 1}&perPage=${data?.perPage || 10}&search=${
        data?.search || ""
      }`
  )

  return res
}

const getLearnerDetailsList = async uid =>
  getData(url.GET_LEARNER_DETAIL + `/${uid}/detail`)

const getProfilePicture = async data => {
  const resp = await postImage(
    url.GET_PROFILE_PICTURE + `/get-profile-picture`,
    data
  )
  return resp
}

const getUploadDocument = async data => {
  const resp = await postImage(
    url.GET_UPLOAD_DOCUMENT + `/get-kyc-singed-doc`,
    data
  )
  return resp
}

const getUploadProfilePicture = async data => {
  const resp = await postImage(
    url.UPLOAD_PROFILE_PICTURE + `/profile-picture`,
    data
  )
  return resp
}

const getUploadDocumentPicture = async data => {
  const resp = await postImage(
    url.UPLOAD_DOCUMENT_PICTURE + `/upload-document`,
    data
  )
  return resp
}

const getDeleteProfilePicture = uid => {
  deleteProfilePicture(url?.GET_DELETE_PROFILE_PICTURE, uid)
}

const getdeleteDocumentKyc = data => {
  deleteDocumentKyc(url?.DELETE_DOCUMENT_KYC + "/delete-document", data)
}

const uploadProfilePictureUrl = data => {
  putImage(data?.url, data?.data?.preview)
}

const uploadDocumentPictureUrl = data => {
  putImage(data?.url, data?.data?.preview)
}

const getFilters = data => {
  if (data?.status) {
    return `&status=${data?.status || ""}`
  }

  if (data?.learnerType) {
    return `&learner_type=${data?.learnerType || ""}`
  }

  if (data?.courseType) {
    return `&course_type=${data?.courseType || ""}`
  }
}

const getStatusFilter = data =>
  getData(
    url.GET_LEARNER +
      `?page=${data?.page || 1}&perPage=${data?.perPage || 5102}&search=${
        data?.search || ""
      }${getFilters(data)}`
  )

const getApplicationListing = data =>
  getData(
    url.GET_APPLICATION_LISTING +
      `?page=${data?.page || 1}&perPage=${data?.page || 141}&search=${
        data?.search
      }`
  )

const editLearnerDetail = async data => {
  const resp = await putDetail(
    url.EDIT_LEARNER_DETAIL + `/personal-detail`,
    data
  )
  return resp
  // putDetail(url.EDIT_LEARNER_DETAIL + "/personal-detail", data)
}

const editEducationDetail = async data => {
  const resp = await putDetail(
    url.EDIT_EDUCATION_DETAIL + `/education-detail`,
    data
  )
  return resp
}
const getEditWorkDetail = async data => {
  const resp = await putDetail(url.EDIT_WORK_DETAIL + `/work-detail`, data)
  return resp
}

const getDeleteData = uid => deleteData(url?.GET_DELETE_LEARNER + `${uid}`)

const getDeleteBatches = id => {
  deleteData(url?.GET_DELETE_BATCHES + `/${data}`)
}

// get dashboard charts data
export const getDashboardData = data =>
  getData(
    url.GET_DASHBOARD_DATA + (data?.day !== "All" ? `?day=${data?.day}` : "")
  )

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS)

// add inboxmail
export const addNewInboxMail = inboxmail =>
  post(url.ADD_NEW_INBOX_MAIL, inboxmail)

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } })

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS)

// get importantmail
export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS)

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS)

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS)

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS)

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  })
}
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  })
}

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  })
}

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  })
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
  getLearnerList,
  getAllLearnerList,
  getApplicationListing,
  getDeleteData,
  getDeleteBatches,
  getStatusFilter,
  getLearnerDetailsList,
  getProfilePicture,
  getDeleteProfilePicture,
  getUploadProfilePicture,
  uploadProfilePictureUrl,
  editLearnerDetail,
  editEducationDetail,
  getEditWorkDetail,
  getdeleteDocumentKyc,
  getUploadDocument,
  getUploadDocumentPicture,
  uploadDocumentPictureUrl,
  getCoursesList,
  getCourse,
  editCourse,
  editCard,
  editCourseDetail,
  getBatchesList,
  getVariantList,
  editVariant,
  getCurriculumList,
  getFaqList,
  getBatches,
  getBatchesLearner,
  // getBatchesAllGrade,
  getBatchesGrade,
  editNewBatchesData,
  getNewBatches,
  getDashboardApi,
  getMentorApi,
  getBatchesApi,
  createNewBatchesData,
  AllBatches,
  // getFilter,
}

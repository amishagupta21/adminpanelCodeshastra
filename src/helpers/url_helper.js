//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//dashboard charts data
export const GET_DASHBOARD_DATA = "/admin/dashboard"
// export const GET_YEARLY_DATA = "/yearly-data"
// export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"

//Users API's
export const GET_USERSLIST = "/users"

//Learner
export const GET_LEARNER = "/admin/user/list"
export const GET_LEARNER_DETAIL = "/admin/user/user"
export const GET_PROFILE_PICTURE = "/admin/user"
export const UPLOAD_PROFILE_PICTURE = "/admin/user"
export const EDIT_LEARNER_DETAIL = "/admin/user"
export const EDIT_EDUCATION_DETAIL = "/admin/user"
export const EDIT_WORK_DETAIL = "/admin/user"
export const GET_UPLOAD_DOCUMENT = "/admin/user"
export const UPLOAD_DOCUMENT_PICTURE = "/admin/user"

export const GET_APPLICATION_LISTING = "/admin/application/list"
export const GET_DELETE_LEARNER = "/admin/user/uid/"
export const GET_DELETE_PROFILE_PICTURE = "/admin/user/profile-picture"
export const DELETE_DOCUMENT_KYC = "/admin/user"

//Course API's
export const GET_COURSELIST = "/admin/courses"
export const GET_COURSEDETAILS = "/courses"
export const CREATE_COURSE = "/courses"
export const UPDATE_COURSE = "/courses"

// Batches API's

export const GET_BATCHES_LIST = "/admin/course/batch/listing"

// MAIN BATCHES

export const GET_BATCHES = "/admin/batch"
export const EDIT_NEW_BATCHES = "/admin/batch"

export const GET_BATCHES_LEARNER_LIST = "/admin/batch/learners/listing"
export const GET_DELETE_BATCHES = "/users/delete/"
// GRADE_BOOK

export const GET_GRADE_BOOK = "/admin/batch/learners/gradebook"


export const GET_BATCHES_API = "/admin/batch"

// NEW BATCHES

export const GET_NEW_BATCHES = "/admin/batch"

// DASHBOARD

export const GET_DASHBOARD = "/admin/batch"

// MENTOR

export const GET_MENTOR = "/admin/batch"

// Variant API's

export const GET_VARIANT_LIST = "/admin/course/variant"
export const EDIT_VARIANT = "/admin/course-variant"

// Curriculum API's

export const GET_CURRICULUM_LIST = "/curriculum-chapters/module"

// Edit Course
export const GET_COURSES = "/admin/course"
export const EDIT_COURSE_INFORMATION = "/admin/course"
export const EDIT_CARD_CONFIGURATION = "/admin/course"
export const EDIT_COURSE_DETAIL = "/admin/course"

//Faqs

export const GET_FAQS = "/admin/faqs"
// Users
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/users/add"
export const UPDATE_USER = "/users/update"
export const DELETE_USER = "/users/delete/"
export const GET_USER_ROLES = "users/roles"

// get signed URL
export const GET_SIGHNEDURL = "/media/getSignedURL"

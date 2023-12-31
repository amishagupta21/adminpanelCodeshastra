import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import Learner from "./Learner/reducer"
import LearnerDetails from "./LearnerDetail/reducer"
import ApplicationListing from "./ApplicationListing/reducer"
import WorkDetail from "./WorkDetail/reducer"
import DocumentKyc from "./DocumentKyc/reducer"
import Courses from "./Courses/reducer"
import EditCourse from "./CourseInformation/reducer"
import GetCourse from "./CourseInformation/reducer"
import EditCard from "./CourseInformation/reducer"
import EditCourseDetail from "./CourseInformation/reducer"
import Batches from "./Batches/reducer"
import Variant from "./Variant/reducer"
import Curriculum from "./Curriculum/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer"

import GetFaqs from "./FaqConfiguration/reducer"

const rootReducer = combineReducers({
  // public

  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
  Learner,
  ApplicationListing,
  LearnerDetails,
  WorkDetail,
  DocumentKyc,
  Courses,
  GetCourse,
  EditCourse,
  EditCard,
  EditCourseDetail,
  Batches,
  Variant,
  Curriculum,
  GetFaqs,
})

export default rootReducer

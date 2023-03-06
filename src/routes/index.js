import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Users from "pages/Users/users.connector"
import Courses from "pages/Course/index"
import CreateCourse from "pages/Course/CreateCourse"
import Learner from "pages/Learner/Learner"
import ApplicationListing from "pages/ApplicationListing/ApplicationListing"
import LearnerDetails from "pages/Learner/LearnerDetails/LearnerDetails"
import ApplicationDetails from "pages/ApplicationListing/ApplicationDetails/ApplicationDetails"
import DocumentData from "pages/Learner/LearnerDetails/DocumentData"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: Users },
  { path: "/courses", component: Courses },
  { path: "/courses/create", component: CreateCourse },
  { path: "/learner", component: Learner },
  { path: "/application", component: ApplicationListing },
  { path: "/learner-details/:id", component: LearnerDetails },
  { path: "/application-details", component: ApplicationDetails },
  {
    path: "/learner-details/:id/document-data/:keys",
    component: DocumentData,
  },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }

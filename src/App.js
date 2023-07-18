import PropTypes from "prop-types"
import React, { useEffect } from "react"
import firebase from "firebase/compat/app"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper"
import "firebase/remote-config"
// Activating fake backend
// fakeBackend()

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}

initFirebaseBackend(firebaseConfig)

// firebase.initializeApp(firebaseConfig);

const App = props => {
  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  // const config = async () => {
  //   const config = firebase.remoteConfig()
  //   // const template = await config.getTemplate()

  //   // if (name === "skill_fit_data") {
  //   //   defaultVal = (template.parameters.skill_fit_data?.defaultValue).value
  //   //   defaultVal = JSON.parse(defaultVal)
  //   // }
  //   // console.log(defaultVal)
  // }

  // useEffect(() => {
  //   config()
  // }, [])
  // const fetchRemoteConfig = async () => {
  //   try {
  //     await remoteConfig.fetchAndActivate()
  //     const value = remoteConfig.getString("skill_fit_data")
  //     console.log("Fetched value:", value)
  //   } catch (error) {
  //     console.error("Error fetching remote config:", error)
  //   }
  // }

  // useEffect(() => {
  //   fetchRemoteConfig()
  // }, [])

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)

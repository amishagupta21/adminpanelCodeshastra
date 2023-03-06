import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

const DocumentData = ({ props }) => {
  // const { userProfile } = props
  // console.log(.kyc)
  const params = useParams()

  const location = useLocation()

  return (
    <>
      <div className="page-content">
        {/* <h1>Document Data</h1> */}
        <h5>{location.state.data[0]}</h5>
        <h5>{location.state.data[1]}</h5>
      </div>
    </>
  )
}

export default DocumentData

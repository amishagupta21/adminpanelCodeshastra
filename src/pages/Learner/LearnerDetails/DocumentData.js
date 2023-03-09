import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

const DocumentData = ({ props }) => {
  // const { userProfile } = props
  const params = useParams()

  const location = useLocation()

  const response = location.state.data[1].split("/")
  const result = response[response.length - 1]
  // const result = item

  return (
    <>
      <div className="page-content">
        {/* <h1>Document Data</h1> */}
        <h5>Document Name: {location.state.data[0]}</h5>
        <h5>File Name: {result}</h5>
      </div>
    </>
  )
}

export default DocumentData

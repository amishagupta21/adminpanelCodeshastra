import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Container,
  CardGroup,
  ListGroup,
  CardTitle,
  CardSubtitle,
  CardText,
  Label,
  Input,
  Form,
} from "reactstrap"
import { Link } from "react-router-dom"
import userplaceholder from "../../../assets/images/userplaceholder.png"
import DatePicker from "react-datepicker"
import "./personalDetailForm.css"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  deleteProfilePicture,
  uploadProfilePicture,
  editLearnerDetail,
} from "store/LearnerDetail/actions"
import userPlaceholder from "../../../assets/images/userplaceholder.png"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"

const PersonalDetailForm = props => {
  const {
    user,
    userProfile,
    profilePictureUrl,
    uploadProfilePicture,
    editLearnerDetail,
  } = props
  const [image, setImage] = useState({ preview: "", raw: "" })
  const [learnerData, setLearnerData] = useState({
    full_name: userProfile?.personal_details?.full_name,
    email: userProfile?.personal_details?.email,
    mobile_number: userProfile?.personal_details?.mobile_number,
    guardian_details: userProfile?.personal_details?.guardian_details,
  })

  // const { full_name, email, mobile_number, guardian_details } = learnerData

  useEffect(() => {
    setLearnerData({
      full_name: userProfile?.personal_details?.full_name,
      email: userProfile?.personal_details?.email,
      mobile_number: userProfile?.personal_details?.mobile_number,

      guardian_details: userProfile?.personal_details?.guardian_details,
    })
  }, [userProfile])

  const [startDate, setStartDate] = useState()
  const hiddenFileInput = React.useRef(null)

  useEffect(() => {
    if (userProfile?.personal_details) {
      setStartDate(
        userProfile?.personal_details?.birth_date /
          userProfile?.personal_details?.birth_month /
          userProfile?.personal_details?.birth_year
      )
    }
  }, [userProfile])
  useEffect(() => {
    if (image.preview !== "") {
      handleUpload(userProfile?.uid)
    }
  }, [image])

  const deleteProfilePicture = uid => {
    const { onGetDeleteProfilePicture } = props
    onGetDeleteProfilePicture({ uid: uid, document_type: "profile_picture" })
  }
  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: e.target.files[0],
        raw: e.target.files[0],
      })
    }
  }

  const handleUpload = async uid => {
    const formData = new FormData()
    formData.append("image", image)

    const { onGetUploadProfilePicture } = props
    onGetUploadProfilePicture({
      img: image,
      data: {
        uid: uid,
        document_type: "profile_picture",
        file_name: "progile_picture.png",
        type: "image/png",
      },
    })
  }

  const editData = (event, uid) => {
    event.preventDefault()
    const { onGetEditLearnerDetail } = props
    onGetEditLearnerDetail({
      uid: uid,
      occupation: "STUDENT",
      personal_details: {
        full_name: "Marshal Aroraa",
        email: "marshal.arora@codeshastra.com",
        mobile_number: "+91 7015493577",
        mobile_cc: "+91 7015493577",
        whatsapp_number: "+91 7015493577",
        whatsapp_cc: "+91 7015493577",
        gender: "Male",
        birth_date: 31,
        birth_month: 12,
        birth_year: 1967,
        guardian_details: "details",
      },
    })
  }

  return (
    <>
      <div>
        <h4 className="text-primary">Personal Details</h4>
        <div className="d-flex align-items-center personal-detail">
          {props?.profilePictureUrl ? (
            <img height="50px" width="50px" src={props?.profilePictureUrl} />
          ) : (
            <img height="50px" width="50px" src={userPlaceholder} />
          )}
          &nbsp;&nbsp;
          <div>
            <p>Profile Picture</p>
            <div>
              <Link to="/">View</Link>&nbsp;&nbsp;&nbsp;
              <Link
                className="text-danger"
                onClick={() => deleteProfilePicture(userProfile?.uid)}
              >
                Delete
              </Link>
              &nbsp;&nbsp;
              <Link className="text-danger" onClick={() => handleClick()}>
                Upload
              </Link>
            </div>

            <input
              type="file"
              id="upload-button"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <br />
          </div>
        </div>
        <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Full Name</Label>
                  <Input
                    name="text"
                    className="form-control"
                    placeholder="Full Name"
                    type="text"
                    onChange={e => setLearnerData(e.target.value)}
                    value={learnerData?.full_name}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="text"
                    type="email"
                    placeholder="Enter Email"
                    onChange={e => setLearnerData(e.target.value)}
                    value={learnerData?.email}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Mobile Number</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Enter Mobile Number"
                    onChange={e => setLearnerData(e.target.value)}
                    value={learnerData?.mobile_number}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Date of Birth</Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    value={startDate}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Guardian Detail</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Enter Detail"
                    onChange={e => setLearnerData(e.target.value)}
                    value={learnerData?.guardian_details}
                  />
                </div>
              </Col>

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  color="primary"
                  className="me-3 px-5"
                  outline
                  type="submit"
                >
                  Reset
                </Button>
                <Button
                  className="px-5"
                  color="primary"
                  // type="submit"
                  onClick={editData}
                >
                  Save
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

PersonalDetailForm.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  LearnerDetails: PropTypes.any,
}

const mapStateToProps = ({ LearnerDetails, state, count }) => ({
  user: LearnerDetails?.data?.user,
  userProfile: LearnerDetails?.data?.userProfile,
  uploadProfilePicture: LearnerDetails?.uploadProfilePicture,
  editLearnerDetail: LearnerDetails?.editLearnerDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetDeleteProfilePicture: uid => dispatch(deleteProfilePicture(uid)),
  onGetUploadProfilePicture: data => dispatch(uploadProfilePicture(data)),
  onGetEditLearnerDetail: data => dispatch(editLearnerDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailForm)

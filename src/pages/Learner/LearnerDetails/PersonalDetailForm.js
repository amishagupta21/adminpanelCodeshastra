import React, { useEffect, useState } from "react"
import { Row, Col, Button, Label, Input, Form } from "reactstrap"
import Image from "react-bootstrap/Image"

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
import DeleteProfileModal from "./DeleteProfileModal"
import ImagePreviewModal from "./ImagePreviewModal"
import LearnerTable from "../LearnerTable"
import Learner from "../Learner"
import { useFormik } from "formik"
import * as Yup from "yup"

// const initialValues = {
//   fullName: "",
// }

const PersonalDetailForm = props => {
  const {
    user,
    userProfile,
    profilePictureUrl,
    uploadProfilePicture,
    editLearnerDetail,
  } = props
  const [image, setImage] = useState({ preview: "", raw: "" })
  const [profilePicture, setProfilePicture] = useState(null)
  const data =
    userProfile?.personal_details === null
      ? {}
      : {
          full_name: userProfile?.personal_details?.full_name
            ? userProfile?.personal_details?.full_name
            : user?.fullName || "",
          email: userProfile?.personal_details?.email
            ? userProfile?.personal_details?.email
            : user?.email || "",
          mobile_number: user?.phone || "",
          gender: userProfile?.personal_details?.gender
            ? userProfile?.personal_details?.gender
            : user?.gender || "",
          whatsapp_number: user?.phone || "",
          guardian_details: userProfile?.personal_details?.guardian_details
            ? userProfile?.personal_details?.guardian_details
            : user?.guardianDetails || "",
          birth_date: userProfile?.information_data?.birth_date || "",
          birth_month: userProfile?.information_data?.birth_month || "",
          birth_year: userProfile?.information_data?.birth_year|| "",
          uid: userProfile?.uid || user?.uid,
        }
  const [learnerData, setLearnerData] = useState(data)
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [profilePictureModal, setProfilePictureModal] = useState(false)

  useEffect(() => {
    setLearnerData(data)
    console.log("cgghv",setLearnerData(data))
  }, [userProfile])

  // useEffect(() => {
  //   if (props?.profilePictureUrl) {
  //     setProfilePicture(props?.profilePictureUrl)
  //   }
  // }, [props?.profilePictureUrl])

  useEffect(() => {
    let count = 0
    for (let key in learnerData) {
      if (learnerData[key] === "") {
        count++
        break
      }
    }
    if (count === 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [learnerData])

  const [startDate, setStartDate] = useState(new Date())
  const hiddenFileInput = React.useRef(null)
  // Modal open state
  const [modal, setModal] = React.useState(false)

  // Toggle for Modal
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const toggle = () => {
    setProfilePictureModal(!profilePictureModal)
  }
  const closeProfilePicture = () => setProfilePictureModal(false)

  useEffect(() => {
    if (
      userProfile?.personal_details &&
      userProfile?.personal_details?.birth_year &&
      userProfile?.personal_details?.birth_month &&
      userProfile?.personal_details?.birth_date
    ) {
      setStartDate(
        new Date(
          `${userProfile?.personal_details?.birth_year}-${userProfile?.personal_details?.birth_month}-${userProfile?.personal_details?.birth_date}`
        )
      )
    }
  }, [userProfile])

  useEffect(() => {
    if (image.preview !== "") {
      handleUpload(learnerData.uid)
    }
  }, [image])

  const deleteProfilePicture = () => {
    const { onGetDeleteProfilePicture } = props
    onGetDeleteProfilePicture({
      uid: learnerData?.uid,
      document_type: "profile_picture",
    })
    setModal(false)
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

  const editData = event => {
    event.preventDefault()
    const { onGetEditLearnerDetail } = props
    onGetEditLearnerDetail({
      uid: learnerData?.uid,
      personal_details: {
        full_name: learnerData?.full_name,
        email: learnerData?.email,
        mobile_number: learnerData?.mobile_number,
        whatsapp_number: learnerData?.whatsapp_number,
        birth_date: learnerData?.birth_date,
        birth_month: learnerData?.birth_month,
        birth_year: learnerData?.birth_year,
        guardian_details: learnerData?.guardian_details,
        gender: learnerData?.gender,
      },
    })
  }

  const profilePic = props?.profilePictureUrl

  return (
    <>
      <div>
        <h4 className="text-primary">Personal Details</h4>
        <div className="d-flex align-items-center personal-detail">
          <div>
            {profilePic ? (
              <img
                height="70px"
                width="70px"
                onClick={toggle}
                src={profilePic}
              />
            ) : (
              <img height="70px" width="70px" src={userPlaceholder} />
            )}
          </div>
          &nbsp;&nbsp;&nbsp;
          <div>
            <p>Profile Picture</p>
            <div>
              {profilePic ? (
                <div className="text-danger profile-button" onClick={openModal}>
                  Delete
                </div>
              ) : (
                <div
                  className="text-danger profile-button"
                  onClick={() => handleClick()}
                >
                  Upload
                </div>
              )}
            </div>

            <input
              type="file"
              id="upload-button"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={handleChange}
              onClick={e => (e.target.value = null)}
            />
            <br />
          </div>
        </div>

        <ImagePreviewModal
          modal={profilePictureModal}
          closeProfilePicture={closeProfilePicture}
          imagePreview={profilePic}
          toggle={toggle}
        />

        <DeleteProfileModal
          modal={modal}
          closeModal={closeModal}
          deleteProfilePicture={deleteProfilePicture}
        />
        <div className="p-2">
          <Form className="form-vertical" onSubmit={editData}>
            <Row>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Full Name</Label>
                  <Input
                    name="fullName"
                    placeholder="Full Name"
                    type="text"
                    onChange={e =>
                      setLearnerData({
                        ...learnerData,
                        full_name: e.target.value,
                      })
                    }
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
                    onChange={e =>
                      setLearnerData({
                        ...learnerData,
                        email: e.target.value,
                      })
                    }
                    value={learnerData?.email}
                  />
                </div>
              </Col>

              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Whatsapp Number</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Enter Whatsapp Number"
                    onChange={e =>
                      setLearnerData({
                        ...learnerData,
                        whatsapp_number: e.target.value,
                      })
                    }
                    value={learnerData?.whatsapp_number}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Date of Birth</Label>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(date) => {
                      setLearnerData({
                        ...learnerData,
                        birth_month: date.getMonth() + 1,
                        birth_date: date.getDate(),
                        birth_year: date.getFullYear(),
                      })
                    }}
                    maxDate={new Date()}
                    minDate={new Date("1923/01/01")}
                    value={
                      learnerData?.birth_date
                        ? `${learnerData?.birth_date}/${learnerData?.birth_month}/${learnerData?.birth_year}`
                        : "YYYY/MM/DD"
                    }
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
                    onChange={e =>
                      setLearnerData({
                        ...learnerData,
                        guardian_details: e.target.value,
                      })
                    }
                    value={learnerData?.guardian_details}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Mobile Number</Label>
                  <Input
                    name="mobile_number"
                    type="mobile_number"
                    placeholder="Enter Mobile Number"
                    onChange={e =>
                      setLearnerData({
                        ...learnerData,
                        mobile_number: e.target.value,
                      })
                    }
                    value={learnerData?.mobile_number}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Gender</Label>
                  <div>
                    <label>
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="fav_language"
                          id="Male"
                          value="male"
                          onClick={e =>
                            setLearnerData({
                              ...learnerData,
                              gender: e.target.value,
                            })
                          }
                          checked={learnerData?.gender === "male"}
                        />
                        &nbsp; Male
                      </div>
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="fav_language"
                          id="Female"
                          value="female"
                          onClick={e =>
                            setLearnerData({
                              ...learnerData,
                              gender: e.target.value,
                            })
                          }
                          checked={learnerData?.gender === "female"}
                        />
                        &nbsp; Female
                      </div>
                    </label>
                  </div>
                </div>
              </Col>

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  className="px-5"
                  color="primary"
                  disabled={isButtonDisabled}
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

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
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,

} from "reactstrap"

import userplaceholder from "../../assets/images/userplaceholder.png"
import "./personalDetailForm.css"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  deleteProfilePicture,
  uploadProfilePicture,
  editLearnerDetail,
} from "store/LearnerDetail/actions"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"



const CourseInformation = props => {
  const {
    user,
    userProfile,
    profilePictureUrl,
    uploadProfilePicture,
    editLearnerDetail,
  } = props
  const [image, setImage] = useState({ preview: "", raw: "" })

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
          mobile_number: userProfile?.personal_details?.mobile_number
            ? userProfile?.personal_details?.mobile_number
            : user?.mobileNumber || "",
          guardian_details: userProfile?.personal_details?.guardian_details
            ? userProfile?.personal_details?.guardian_details
            : user?.guardianDetails || "",
          birth_date: userProfile?.personal_details?.birth_date
            ? userProfile?.personal_details?.birth_date
            : user?.birthDate || "",
          birth_month: userProfile?.personal_details?.birth_month
            ? userProfile?.personal_details?.birth_month
            : user?.birthMonth || "",
          birth_year: userProfile?.personal_details?.birth_year
            ? userProfile?.personal_details?.birth_year
            : user?.birthYear || "",
          uid: userProfile?.uid || user?.uid,
        }
  const [learnerData, setLearnerData] = useState(data)

  useEffect(() => {
    setLearnerData(data)
  }, [userProfile])

  const [startDate, setStartDate] = useState()
  const hiddenFileInput = React.useRef(null)
  // Modal open state
  const [modal, setModal] = React.useState(false)
  const [profilePictureModal, setProfilePictureModal] = useState(false)

  // Toggle for Modal
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const toggle = () => setProfilePictureModal(!profilePictureModal)
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
        birth_date: learnerData?.birth_date,
        birth_month: learnerData?.birth_month,
        birth_year: learnerData?.birth_year,
        guardian_details: learnerData?.guardian_details,
      },
    })
  }

  return (
    <>
      <div>

        <h4 className="text-primary">Course Information</h4>
       

               <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Col sm={12}>
                <div className="mb-4">
                  <Label className="form-label">Course Name</Label>
                  <Input
                    name="text"
                    className="form-control"
                    placeholder="Full Name"
                    type="text"/>
                   
                   
                </div>
              </Col>
              <Col sm={12}>
                <div className="mb-4">
                  <Label className="form-label">Description</Label>
                  <Input
                    name="text"
                    className="form-control"
                    placeholder="Full Name"
                    type="text"/>
                
                </div>
              </Col>
             
              <Col sm={12}>
              <div className="mb-4">
                  <Label className="form-label">About Course</Label>
                  <Input
                    name="text"
                    className="form-control text-height"
                    placeholder="In advanced Software Development which envelops front-end and back-end development such as publishing their own dynamic web apps, running a database, and implementing web authentication. Once geared up JavaScript for backend development, you will learn Node.js, MongoDB,Express.js, and ReactJS to make a dynamic website with their own web server which applies both front-end and back-end"
                    type="textarea"/>  </div>
              </Col>
              <Col sm={12}>
              <Label className="form-label">Course Type</Label>
              <Col sm={12} className="course-live">
                
               <Label check>
                 <Input type="checkbox" />{' '}
                 Live Courses
               </Label>  
               
               <Label check>
                 <Input type="checkbox" />{' '}
                 Library Courses
               </Label>
               </Col> </Col>
               
           

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  className="px-4"
                  color="primary"
                  // type="submit"
                  onClick={editData}
                >
                 Save as Draft
                </Button>
                <Button
                  className="px-4 ms-3"
                  color="primary"
                  // type="submit"
                  onClick={editData}
                >
                  Save & Publish
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseInformation)

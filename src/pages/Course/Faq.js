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
  UncontrolledAccordion,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  InputGroup,
  InputGroupText,
  FormGroup,
  Table,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap"

import plus from "../../assets/images/add-plus.svg"
import filter from "../../assets/images/fliter.svg"
import search from "../../assets/images/search-opt.svg"

import "./personalDetailForm.css"
import PropTypes from "prop-types"
// import Accordion from 'react-bootstrap/Accordion'
import { connect } from "react-redux"
import {
  deleteProfilePicture,
  uploadProfilePicture,
  editLearnerDetail,
} from "store/LearnerDetail/actions"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"

const faq = props => {
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
      <div className="accordian-parts">
        <h4 className="text-primary">FAQs</h4>

        <Row>
          <Col md={4}>
            <FormGroup className="search-input">
              <img height="20px" width="20px" src={search} />
              <Input
                id="exampleCity"
                placeholder="Search by Questions"
                name="city"
              />
            </FormGroup>
          </Col>
          <Col md={8}>
            <Row className="end-row-last">
              <Col md={2}>
                <FormGroup>
                  <Input id="exampleSelect" name="select" type="select">
                    <option>Status</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Input id="exampleSelect" name="select" type="select">
                    <option>FAQ Catagories</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Button size="sm">
                    <img height="20px" width="20px" src={filter} />
                    Apply Filter
                  </Button>
                </FormGroup>
              </Col>{" "}
              <Col md={3}>
                <FormGroup>
                  <Button
                    size="sm"
                    color="secondary"
                    className="secondary-btns-custom"
                  >
                    Export
                  </Button>
                </FormGroup>
              </Col>{" "}
            </Row>{" "}
          </Col>
        </Row>
        <Table responsive className="table-border-custom table-faq">
          <thead>
            <tr>
              <th>
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </th>
              <th>FAQs</th>
              <th>Catagories</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>What are TechFit programs?</b>
              </td>
              <td>General Question</td>

              <td>
                <Button color="success" className="assign-batch">
                  Applied
                </Button>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>
                  What types of training are available through Techfit Programs?
                </b>
              </td>
              <td>About Techfit Program</td>

              <td>
                <Button color="success" className="assign-batch">
                  Applied
                </Button>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>What courses are available under the TechFit program?</b>
              </td>
              <td>Placement Question</td>

              <td>
                <Button
                  color="success"
                  className="assign-batch assign-batch-border"
                >
                  Apply
                </Button>
              </td>
            </tr>

            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>
                  In what mode will the lectures be conducted - online or
                  offline?
                </b>
              </td>
              <td>Fees and ISA</td>

              <td>
                <Button color="success" className="assign-batch">
                  Applied
                </Button>
              </td>
            </tr>

            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>
                  Is there anything else Unikaksha can offer me besides training
                  sessions and job placement...?
                </b>
              </td>
              <td>General Question</td>

              <td>
                <Button color="success" className="assign-batch">
                  Applied
                </Button>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>What are the prerequisites for joining the course?</b>
              </td>
              <td>About Techfit Program</td>

              <td>
                <Button color="success" className="assign-batch">
                  Applied
                </Button>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>
                  If I am from a non-tech background, can I apply for this
                  course?
                </b>
              </td>
              <td>Fees and ISA</td>

              <td>
                <Button color="success" className="assign-batch">
                  Fees and ISA
                </Button>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>
                  Suppose I got a job through Unikaksha, but the company turned
                  out to be fraudulent and ...?
                </b>
              </td>
              <td>Admission</td>

              <td>
                <Button color="success" className="assign-batch">
                  Applied
                </Button>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>
                  Would a person with a 2-year gap after graduation and no job
                  for this year be able to apply?
                </b>
              </td>
              <td>Placement Question</td>

              <td>
                <Button
                  color="success"
                  className="assign-batch assign-batch-border"
                >
                  Apply
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Pagination aria-label="Page navigation example" size="sm">
          <PaginationItem>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" previous />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="active">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">6</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" next />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" last />
          </PaginationItem>
        </Pagination>
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

export default connect(mapStateToProps, mapDispatchToProps)(faq)

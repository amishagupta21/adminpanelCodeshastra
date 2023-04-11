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
  Table,PaginationItem , PaginationLink , Pagination
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

const Batch = props => {
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
        <h4 className="text-primary">Course Detail Page</h4>
        <Row> <Col md={4}><label className="custom-label">Batch List</label></Col></Row>
        <Row>
    <Col md={4}>
      <FormGroup className="search-input">
      
      <img height="20px" width="20px" src={search} />
        <Input
          id="exampleCity"
          name="city"
        />
      </FormGroup>
    </Col>
    <Col md={8}>
    <Row className="end-row-last">
    <Col md={2}>
      <FormGroup>
        
        <Input
        id="exampleSelect"
        name="select"
        type="select"
      >
        <option>
        Mentor
        </option>
        <option>
        Mentor
        </option>
        <option>
          3
        </option>
        <option>
        Mentor
        </option>
        <option>
        Mentor
        </option>
      </Input>
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        
        <Input
        id="exampleSelect"
        name="select"
        type="select"
      >
        <option>
          Start Date
        </option>
        <option>
        Start Date
        </option>
        <option>
        Start Date
        </option>
        <option>
        Start Date
        </option>
        <option>
        Start Date
        </option>
      </Input>
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        
        <Input
        id="exampleSelect"
        name="select"
        type="select"
      >
        <option>
        End Date
        </option>
        <option>
        End Date
        </option>
        <option>
        End Date
        </option>
        <option>
        End Date
        </option>
        <option>
        End Date
        </option>
      </Input>
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
       
      <Button
   
    size="sm"
  >
    <img height="20px" width="20px" src={filter} />
   Apply Filter
  </Button>
      </FormGroup>
    </Col> </Row> </Col>
    </Row>
        <Table responsive className="table-border-custom">
          <thead>
            <tr>
              <th>
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </th>
              <th>Batch</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Mentors</th>
              <th>Assign Batch</th>
              <th>Action</th>
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
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
                <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
              <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
              <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
              <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
              <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
              <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
            <tr>
              <td scope="row">
                <FormGroup check>
                  <Input type="checkbox" />
                </FormGroup>
              </td>
              <td>
                <b>Learners Batch</b>
              </td>
              <td>For the learners batch</td>
              <td>07 Oct 22</td>
              <td>07 Jan 23</td>
              <td>
                <batch className="purple custom-batches">SB</batch>
                <batch className="green custom-batches">SB</batch>
                <batch className="yellow custom-batches">SB</batch>
              </td>
              <td>
              <Button color="success" outline className="assign-batch">
                 Assign
                </Button>
              </td>
              <td>
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </td>
            </tr>
          </tbody>
        </Table>
        <Pagination
  aria-label="Page navigation example"
  size="sm"
>
  <PaginationItem>
    <PaginationLink
      first
      href="#"
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      previous
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" className="active">
      1
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      2
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      3
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      4
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      5
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#">
      6
    </PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      next
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      last
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Batch)

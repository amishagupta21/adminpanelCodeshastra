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
  UncontrolledAccordion,Accordion,AccordionItem , AccordionHeader , AccordionBody,InputGroup , InputGroupText ,  FormGroup ,

} from "reactstrap"

import plus from "../../assets/images/add-plus.svg"
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



const Coursedetail = props => {
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
       

               <div className="p-2">
               <UncontrolledAccordion
  defaultOpen={[
    '1',
    '2'
  ]}
  stayOpen
>
  <AccordionItem>
    <AccordionHeader targetId="1">
    Overview<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
<path d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z" fill="#74788D"/>
</svg>
    </AccordionHeader>
    <AccordionBody accordionId="1" className="card-infor-space">
      <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="100% Live Classes"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="1:1 mentor support & immediate doubt solving"
                    type="text"/>
            
            </td>
            <td>
            <div className="image-name">Class.svg<i className="mdi mdi-close"></i> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="100% Live Classes"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="1:1 mentor support & immediate doubt solving"
                    type="text"/>
            
            </td>
            <td>
            <div className="image-name">Class.svg<i className="mdi mdi-close"></i> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="100% Live Classes"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="1:1 mentor support & immediate doubt solving"
                    type="text"/>
            
            </td>
            <td>
           <div className="image-name">Class.svg<i className="mdi mdi-close"></i> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="100% Live Classes"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="1:1 mentor support & immediate doubt solving"
                    type="text"/>
            
            </td>
            <td>
            <div className="image-name">Class.svg<i className="mdi mdi-close"></i> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="create-new-appointment">
        <h2>Create New Overview <a className="link">  <img height="20px" width="20px" src={plus} /></a></h2>
        </div>
    </AccordionBody>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader targetId="2">
    Eligibility Criteria<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
<path d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z" fill="#74788D"/>
</svg>
    </AccordionHeader>
    <AccordionBody accordionId="2" className="card-infor-space">
    <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="Qualification"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="textarea"
                    className="form-control form-control-color text-area"
                    placeholder="Students currently enrolled in their first, second, or third year of college
                    Applicants from all educational backgrounds (any degree level) are welcome to apply
                    Prior programming knowledge is not must"
                    type="textarea"/>
                  
            
            </td>
            <td>
            <div className="image-name">Class.svg<i className="mdi mdi-close"></i> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control"
                    placeholder="Skills Required"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="textarea"
                    className="form-control  text-area"
                    placeholder="Basic english & communication skills
                    Logical reasoning
                    Analytical thinking ability"
                    type="textarea"/>
                  
            
            </td>
            <td>
            <div className="image-name">Class.svg<i className="mdi mdi-close"></i> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control"
                    placeholder="Documents Required"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="textarea"
                    className="form-control text-area"
                    placeholder="Valid PAN Card and Aadhar Card
                    Marksheet - (If Working then graduation/PG, If UG then the most recent marksheet)
                    Facebook Profile Link (Verified)
                    IG Profile Link (Verified)"
                    type="textarea"/>
                  
            
            </td>
            <td>
            <div className="image-name"> <input type="file" multiple  /> </div> 
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
       
        <div className="create-new-appointment">
        <h2>Create New Criteria<a className="link">  <img height="20px" width="20px" src={plus} /></a></h2>
        </div>

    </AccordionBody>
    
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader targetId="3">
    Payment Structure<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
<path d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z" fill="#74788D"/>
</svg>
    </AccordionHeader>
    <AccordionBody accordionId="3" className="card-infor-space">
    <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Course Fees</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="Pay Upfront"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="textarea"
                    className="form-control form-control-color text-area"
                    placeholder="INR 75,000/- +GST
                    Fully refundable within one year of course completion if you do not get a job of 5 LPA or above*
                    No Cost EMI available
                    Flat 10% discount for women
                    Price includes a Registration Fee of INR 2500/- (non refundable)
                    *T&C apply"
                    type="textarea"/>
                  
            
            </td>
            <td>
            <InputGroup >
    <InputGroupText>
      @
    </InputGroupText>
    <Input placeholder="username" />
  </InputGroup>

  <FormGroup className="mt-3">
    <Label for="exampleSelect">
    Payment Template
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
    >
      <option>
        1
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
  <a>View Details</a>
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
        <div className="table-form">
    <table className="table-full table-full-course">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Course Fees</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
            <Input
                    name="text"
                    className="form-control form-control-color"
                    placeholder="Pay Upfront"
                    type="text"/>
            
            </td>
            <td>
            <Input
                    name="textarea"
                    className="form-control form-control-color text-area"
                    placeholder="INR 75,000/- +GST
                    Fully refundable within one year of course completion if you do not get a job of 5 LPA or above*
                    No Cost EMI available
                    Flat 10% discount for women
                    Price includes a Registration Fee of INR 2500/- (non refundable)
                    *T&C apply"
                    type="textarea"/>
                  
            
            </td>
            <td>
            <InputGroup >
    <InputGroupText>
      @
    </InputGroupText>
    <Input placeholder="username" />
  </InputGroup>

  <FormGroup className="mt-3">
    <Label for="exampleSelect">
    Payment Template
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
    >
      <option>
        1
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
  <a>View Details</a>
            </td>
            <td>
            <Input
                    name="text"
                    className="form-control sml"
                    placeholder=" 1"
                    type="text"/>
            </td>
            <td>
            <div className="actions">
              <Input type="switch" role="switch" />
<a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z" fill="#F46A6A"/>
</svg></a></div>
            </td>
          </tr>
        </table>
        </div>
       
        <div className="create-new-appointment">
        <h2>Add New Payment Template<a className="link">  <img height="20px" width="20px" src={plus} /></a></h2>
        </div>

    </AccordionBody>
    
  </AccordionItem>
  
</UncontrolledAccordion>
        </div>
        <div className="mt-1 d-flex justify-content-end">
                <Button
                  className="px-4"
                  color="danger"
                  outline
                  // type="submit"
                  
                >
                 Delete
                </Button>
                <Button
                  className="px-4 ms-3 rou"
                

                  color="primary"
    outline
                  // type="submit"
                 
                >
                Save & Draft
                </Button>
                <Button
                  className="px-4 ms-3"
                  color="primary"
                  // type="submit"
                
                >
                  Save & Publish
                </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Coursedetail)

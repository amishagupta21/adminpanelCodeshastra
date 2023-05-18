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
import "./courseDetail.css"
import Switch from "@mui/material/Switch"

const CourseDetail = props => {
  const {
    onGetCoursesInformation,
    getCourseInformation,
    editCourseInformation,
  } = props

  const [inputFields, setInputFields] = useState(getCourseInformation)

  console.log(getCourseInformation, "///////getCourseInformation")

  const data = getCourseInformation?.course_detail_page

  // const addOverview = () => {
  //   const arr = [...inputFields?.course_detail_page?.overview?.value]
  //   let result = { ...inputFields }
  //   const initalObj = {
  //     title: "",
  //     position: "",
  //     enable: false,
  //   }
  //   arr.push(initalObj)
  //   result.course_detail_page.overview.value = arr

  //   setInputFields(result)
  // }

  return (
    <>
      <div className="accordian-parts">
        <h4 className="text-primary">Course Detail Page</h4>

        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            <AccordionItem>
              <AccordionHeader targetId="1">
                Overview
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
                    fill="#74788D"
                  />
                </svg>
              </AccordionHeader>
              <AccordionBody accordionId="1" className="card-infor-space">
                {data?.overview?.value?.map(overview => {
                  const documentName = overview.icon
                  const array = documentName.split("/")

                  const iconName = array[array.length - 1]

                  return (
                    <div key={overview?.type} className="table-form">
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
                              placeholder="Title"
                              type="text"
                              value={overview?.title}
                            />
                          </td>
                          <td>
                            <Input
                              name="text"
                              className="form-control"
                              placeholder="Description"
                              type="text"
                              value={overview?.description}
                            />
                          </td>
                          <td>
                            <div className="image-name d-flex align-items-center">
                              <p>{iconName}</p>
                              <i className="mdi mdi-close text-danger font-size-20"></i>
                            </div>
                          </td>
                          <td>
                            <Input
                              name="text"
                              className="form-control sml"
                              placeholder="Position"
                              type="text"
                              value={overview?.position}
                            />
                          </td>
                          <td>
                            <div className="actions d-flex justify-content-end align-items-center">
                              <Switch
                                name="enable"
                                size="small"
                                checked={overview?.enable}
                                onClick={e => handleChange(e, index)}
                              />
                              <a href="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                >
                                  <path
                                    d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z"
                                    fill="#F46A6A"
                                  />
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  )
                })}

                <div>
                  <button
                    className="px-4 ms-3 create-new-appointment"
                    // color="primary"
                    // outline
                    // onClick={addOverview}
                    // type="submit"
                  >
                    Create New Highlight{" "}
                    <img height="20px" width="20px" src={plus} />
                  </button>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">
                Eligibility Criteria
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
                    fill="#74788D"
                  />
                </svg>
              </AccordionHeader>
              <AccordionBody accordionId="2" className="card-infor-space">
                {data?.eligibilityCriteria?.value?.map(overview => {
                  const documentName = overview.icon
                  const array = documentName.split("/")

                  const iconName = array[array.length - 1]
                  return (
                    <div key={overview?.type} className="table-form">
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
                              placeholder="Title"
                              type="text"
                              value={overview?.title}
                            />
                          </td>
                          <td>
                            <div
                              className="form-control"
                              contentEditable="true"
                              dangerouslySetInnerHTML={{
                                __html: overview?.description,
                              }}
                            />
                            {/* <Input
                              name="textarea"
                              className="form-control form-control-color text-area"
                              placeholder="Description"
                              type="textarea"
                              value={overview?.description}
                            /> */}
                          </td>
                          <td>
                            <div className="image-name d-flex align-items-center">
                              <p>{iconName}</p>
                              <i className="mdi mdi-close text-danger font-size-20"></i>
                            </div>
                          </td>
                          <td>
                            <Input
                              name="text"
                              className="form-control sml"
                              placeholder=" Position"
                              type="text"
                              value={overview?.position}
                            />
                          </td>
                          <td>
                            <div className="actions d-flex align-items-center">
                              <Switch
                                name="enable"
                                size="small"
                                checked={overview?.enable}
                                onClick={e => handleChange(e, index)}
                              />

                              <a href="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                >
                                  <path
                                    d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z"
                                    fill="#F46A6A"
                                  />
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  )
                })}

                <div className="create-new-appointment">
                  <h2>
                    Create New Criteria
                    <a className="link">
                      {" "}
                      <img height="20px" width="20px" src={plus} />
                    </a>
                  </h2>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="3">
                Payment Structure
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
                    fill="#74788D"
                  />
                </svg>
              </AccordionHeader>
              <AccordionBody accordionId="3" className="card-infor-space">
                {data?.feesStructure?.value?.map(overview => (
                  <div key={overview?.type} className="table-form">
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
                            className="form-control"
                            placeholder="Title"
                            type="text"
                            value={overview?.title}
                          />
                        </td>
                        <td>
                          <div
                            className="form-control"
                            contentEditable="true"
                            dangerouslySetInnerHTML={{
                              __html: overview?.description,
                            }}
                          />
                        </td>
                        <td>
                          <InputGroup>
                            <InputGroupText>Rs</InputGroupText>
                            <Input
                              placeholder="Course Fees"
                              value={overview?.course_fees}
                            />
                          </InputGroup>

                          <FormGroup className="mt-3">
                            <Label for="exampleSelect">Payment Template</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              value={overview?.payment_template}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <a>View Details</a>
                        </td>
                        <td>
                          <Input
                            name="text"
                            className="form-control sml"
                            placeholder=" 1"
                            type="text"
                          />
                        </td>
                        <td>
                          <div className="actions">
                            <Switch
                              name="enable"
                              size="small"
                              checked={overview?.enable}
                              onClick={e => handleChange(e, index)}
                            />
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z"
                                  fill="#F46A6A"
                                />
                              </svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                ))}

                <div className="create-new-appointment">
                  <h2>
                    Add New Payment Template
                    <a className="link">
                      {" "}
                      <img height="20px" width="20px" src={plus} />
                    </a>
                  </h2>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="4">
                What you will learn
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
                    fill="#74788D"
                  />
                </svg>
              </AccordionHeader>
              <AccordionBody accordionId="4" className="card-infor-space">
                {data?.whatWillYouLearn?.value?.map(overview => (
                  <div key={overview?.type} className="table-form">
                    <table className="table-full table-full-course">
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Position</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <td>
                          <Input
                            name="text"
                            className="form-control"
                            placeholder="Title"
                            type="text"
                            value={overview?.title}
                          />
                        </td>
                        <td>
                          <div
                            className="form-control"
                            contentEditable="true"
                            dangerouslySetInnerHTML={{
                              __html: overview?.description,
                            }}
                          />
                        </td>

                        <td>
                          <Input
                            name="text"
                            className="form-control sml"
                            placeholder=" 1"
                            type="text"
                            value={overview?.position}
                          />
                        </td>
                        <td>
                          <div className="actions">
                            <Switch
                              name="enable"
                              size="small"
                              checked={overview?.enable}
                              onClick={e => handleChange(e, index)}
                            />
                            <a href="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M14.25 3H11.625L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3ZM4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25Z"
                                  fill="#F46A6A"
                                />
                              </svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                ))}

                <div className="create-new-appointment">
                  <h2>
                    Add New Payment Template
                    <a className="link">
                      {" "}
                      <img height="20px" width="20px" src={plus} />
                    </a>
                  </h2>
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

CourseDetail.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  GetCourse: PropTypes.any,
}

const mapStateToProps = ({ GetCourse }) => ({
  getCourseInformation: GetCourse?.getCourseInformation?.data,
  // editCourseInformation: GetCourse?.editCourseInformation,
})

const mapDispatchToProps = dispatch => ({
  onGetCoursesInformation: data => dispatch(getCourseInformation(data)),
  // onEditCourseInformation: data => dispatch(editCourseInformation(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail)

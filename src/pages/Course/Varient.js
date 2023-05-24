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
import { getVariant } from "store/Variant/actions"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router-dom"

const Varient = props => {
  const { onGetVariant, getVariant } = props
  // console.log(getVariant, "//////getVariant")

  useEffect(() => {
    onGetVariant(params.id)
  }, [])
  const [item, setItem] = useState(getVariant)

  useEffect(() => {
    setItem(getVariant)
  }, [getVariant])

  const params = useParams()

  return (
    <>
      <div className="accordian-parts">
        <h4 className="text-primary">Varient</h4>

        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            <Form className="form-vertical mb-4">
              <Row>
                <Col sm={12}>
                  <div className="mb-4">
                    <Label className="form-label">Variant Name</Label>
                    <Input
                      name="text"
                      className="form-control"
                      placeholder="Full Name"
                      type="text"
                    />
                  </div>
                </Col>

                <Col sm={12}>
                  <Label className="form-label">Course Type</Label>
                  <Col sm={12} className="course-live">
                    <Label check>
                      <Input type="checkbox" /> Working Professional
                    </Label>

                    <Label check>
                      <Input type="checkbox" /> Student
                    </Label>
                    <Label check>
                      <Input type="checkbox" /> Fresher
                    </Label>
                    <Label check>
                      <Input type="checkbox" /> Learner
                    </Label>
                  </Col>{" "}
                </Col>
              </Row>
            </Form>

            <AccordionItem>
              <AccordionHeader targetId="1">
                Variant Configuration
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
                <div className="table-form">
                  <table className="table-full table-full-course">
                    <tr>
                      <th>Variant Type</th>
                      <th>Duration (in Weeks)</th>
                      <th>Pay After Placement</th>
                      <th>Rating</th>
                      <th>Learners Count</th>
                    </tr>
                    <tr>
                      <td>
                        <Row>
                          <Col sm={12} className="course-live">
                            <Label check>
                              <Input type="checkbox" /> Full Time
                            </Label>

                            <Label check>
                              <Input type="checkbox" /> Part Time
                            </Label>
                          </Col>
                        </Row>
                      </td>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="16"
                          type="number"
                        />
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
                        <Input
                          name="text"
                          className="form-control sml"
                          placeholder=" 1"
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="text"
                          className="form-control sml"
                          placeholder=" 1"
                          type="text"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </AccordionBody>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader targetId="1">
                Banner Content
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
                <div className="table-form">
                  <table className="table-full">
                    <tr>
                      <th>Card Banner (Desktop)</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <p>Banner_course_fullstackwebdevep.jpg</p>
                      </td>
                      <td>
                        <div className="actions">
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M9 3.75C5.298 3.75 2.481 6.0435 0.75 9C2.481 11.9565 5.298 14.25 9 14.25C12.702 14.25 15.5197 11.9565 17.25 9C15.5197 6.0435 12.7013 3.75 9 3.75ZM9 12.75C5.7675 12.75 3.74325 10.7153 2.532 9C3.74325 7.28475 5.7675 5.25 9 5.25C12.2332 5.25 14.2575 7.28475 15.468 9C14.2575 10.7153 12.2332 12.75 9 12.75Z"
                                fill="#556EE6"
                              />
                              <path
                                d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                fill="#556EE6"
                              />
                            </svg>
                          </a>
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
                <div className="table-form">
                  <table className="table-full">
                    <tr>
                      <th>Card Banner (Mobile)</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <div className="input-file-space">
                          <input type="file" multiple />
                          <span className="input-image">
                            100 X 200 px, JPEG/PNG , Max 10 mb
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="actions">
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M9 3.75C5.298 3.75 2.481 6.0435 0.75 9C2.481 11.9565 5.298 14.25 9 14.25C12.702 14.25 15.5197 11.9565 17.25 9C15.5197 6.0435 12.7013 3.75 9 3.75ZM9 12.75C5.7675 12.75 3.74325 10.7153 2.532 9C3.74325 7.28475 5.7675 5.25 9 5.25C12.2332 5.25 14.2575 7.28475 15.468 9C14.2575 10.7153 12.2332 12.75 9 12.75Z"
                                fill="#556EE6"
                              />
                              <path
                                d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                fill="#556EE6"
                              />
                            </svg>
                          </a>
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
                <div className="table-form">
                  <table className="table-full">
                    <tr>
                      <th>Banner Video</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder=" www.youtube/aken_faelacc/aca.com"
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="actions">
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M9 3.75C5.298 3.75 2.481 6.0435 0.75 9C2.481 11.9565 5.298 14.25 9 14.25C12.702 14.25 15.5197 11.9565 17.25 9C15.5197 6.0435 12.7013 3.75 9 3.75ZM9 12.75C5.7675 12.75 3.74325 10.7153 2.532 9C3.74325 7.28475 5.7675 5.25 9 5.25C12.2332 5.25 14.2575 7.28475 15.468 9C14.2575 10.7153 12.2332 12.75 9 12.75Z"
                                fill="#556EE6"
                              />
                              <path
                                d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                                fill="#556EE6"
                              />
                            </svg>
                          </a>
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
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">
                Highlights
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
                <div className="table-form">
                  <table className=" table-full-width">
                    <tr>
                      <th>Title</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control lg"
                          placeholder="100% Live Online Classes"
                          type="text"
                        />
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
                          <Input type="switch" role="switch" />
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
                <div className="table-form">
                  <table className="table-full-width">
                    <tr>
                      <th>Title</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control lg"
                          placeholder="No Prior Coding Experience Required"
                          type="text"
                        />
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
                          <Input type="switch" role="switch" />
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
                <div className="table-form">
                  <table className="table-full-width">
                    <tr>
                      <th>Title</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control lg"
                          placeholder="Pay After Placement of 5LPA or Above"
                          type="text"
                        />
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
                          <Input type="switch" role="switch" />
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
                <div className="create-new-appointment">
                  <h2>
                    Create New Highlight{" "}
                    <a className="link">
                      {" "}
                      <img height="20px" width="20px" src={plus} />
                    </a>
                  </h2>
                </div>
              </AccordionBody>
            </AccordionItem>

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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="1:1 mentor support & immediate doubt solving"
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          Class.svg<i className="mdi mdi-close"></i>{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="1:1 mentor support & immediate doubt solving"
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          Class.svg<i className="mdi mdi-close"></i>{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="1:1 mentor support & immediate doubt solving"
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          Class.svg<i className="mdi mdi-close"></i>{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="1:1 mentor support & immediate doubt solving"
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          Class.svg<i className="mdi mdi-close"></i>{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                <div className="create-new-appointment">
                  <h2>
                    Create New Overview{" "}
                    <a className="link">
                      {" "}
                      <img height="20px" width="20px" src={plus} />
                    </a>
                  </h2>
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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="textarea"
                          className="form-control form-control-color text-area"
                          placeholder="Students currently enrolled in their first, second, or third year of college
                    Applicants from all educational backgrounds (any degree level) are welcome to apply
                    Prior programming knowledge is not must"
                          type="textarea"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          Class.svg<i className="mdi mdi-close"></i>{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="textarea"
                          className="form-control  text-area"
                          placeholder="Basic english & communication skills
                    Logical reasoning
                    Analytical thinking ability"
                          type="textarea"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          Class.svg<i className="mdi mdi-close"></i>{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="textarea"
                          className="form-control text-area"
                          placeholder="Valid PAN Card and Aadhar Card
                    Marksheet - (If Working then graduation/PG, If UG then the most recent marksheet)
                    Facebook Profile Link (Verified)
                    IG Profile Link (Verified)"
                          type="textarea"
                        />
                      </td>
                      <td>
                        <div className="image-name">
                          {" "}
                          <input type="file" multiple />{" "}
                        </div>
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
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
                          type="textarea"
                        />
                      </td>
                      <td>
                        <InputGroup>
                          <InputGroupText>@</InputGroupText>
                          <Input placeholder="username" />
                        </InputGroup>

                        <FormGroup className="mt-3">
                          <Label for="exampleSelect">Payment Template</Label>
                          <Input id="exampleSelect" name="select" type="select">
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
                          <Input type="switch" role="switch" />
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
                          type="text"
                        />
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
                          type="textarea"
                        />
                      </td>
                      <td>
                        <InputGroup>
                          <InputGroupText>@</InputGroupText>
                          <Input placeholder="username" />
                        </InputGroup>

                        <FormGroup className="mt-3">
                          <Label for="exampleSelect">Payment Template</Label>
                          <Input id="exampleSelect" name="select" type="select">
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
                          <Input type="switch" role="switch" />
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
              <AccordionHeader targetId="3">
                Curriculum
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
                <div className="custom-input-file">
                  <span>
                    Upload <img height="20px" width="20px" src={plus} />
                  </span>
                  <Input
                    type="file"
                    className="custom-file-label"
                    id="inputGroupFile01"
                    custom
                  />
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="3">
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
              <AccordionBody accordionId="3" className="card-infor-space">
                <div className="table-form">
                  <table className="table-full table-full-course table-varient">
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
                          className="form-control form-control-color"
                          placeholder="Week 1-2"
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="textarea"
                          className="form-control form-control-color text-area"
                          placeholder="Getting started with the javascript library - jQuery. working with jQuery tags, selectors, and Parent/Child elements. Covering the basics of SASS - a CSS preprocessor, variables, nesting CSS with Saas, mixins, and sass loops"
                          type="textarea"
                        />
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
                          <Input type="switch" role="switch" />
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
                <div className="table-form">
                  <table className="table-full table-full-course table-varient">
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
                          className="form-control form-control-color"
                          placeholder="Week 1-2"
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="textarea"
                          className="form-control form-control-color text-area"
                          placeholder="Getting started with the javascript library - jQuery. working with jQuery tags, selectors, and Parent/Child elements. Covering the basics of SASS - a CSS preprocessor, variables, nesting CSS with Saas, mixins, and sass loops"
                          type="textarea"
                        />
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
                          <Input type="switch" role="switch" />
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

                <div className="table-form">
                  <table className="table-full table-full-course table-varient">
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
                          className="form-control form-control-color"
                          placeholder="Week 1-2"
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          name="textarea"
                          className="form-control form-control-color text-area"
                          placeholder="Getting started with the javascript library - jQuery. working with jQuery tags, selectors, and Parent/Child elements. Covering the basics of SASS - a CSS preprocessor, variables, nesting CSS with Saas, mixins, and sass loops"
                          type="textarea"
                        />
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
                          <Input type="switch" role="switch" />
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

                <div className="create-new-appointment">
                  <h2>
                    Create New Field
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

Varient.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  GetVariant: PropTypes.any,
}

const mapStateToProps = ({ Variant }) => ({
  getVariant: Variant?.getVariant,
})

const mapDispatchToProps = dispatch => ({
  onGetVariant: data => dispatch(getVariant(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Varient)

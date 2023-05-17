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

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import {
  getCourseInformation,
  editCourseInformation,
} from "store/CourseInformation/actions"
import { useParams } from "react-router-dom"

const CourseInformation = props => {
  const {
    onGetCoursesInformation,
    getCourseInformation,
    editCourseInformation,
  } = props

  useEffect(() => {
    onGetCoursesInformation(params.id)
  }, [])

  const [courseData, setCourseData] = useState(getCourseInformation)

  useEffect(() => {
    setCourseData(getCourseInformation)
  }, [getCourseInformation])

  const params = useParams()

  const editCourses = event => {
    event.preventDefault()
    const { onEditCourseInformation } = props
    onEditCourseInformation({
      course_title: courseData?.course_title,
      description: courseData?.description,
      about_course: courseData?.about_course,
      course_type: courseData?.course_type,
      enable: courseData?.enable,
      course_status: courseData?.course_status,
      id: courseData?.id,
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
                    type="text"
                    onChange={e =>
                      setCourseData({
                        ...courseData,
                        course_title: e.target.value,
                      })
                    }
                    value={courseData?.course_title}
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="mb-4">
                  <Label className="form-label">Description</Label>
                  <Input
                    name="text"
                    className="form-control"
                    placeholder="Full Name"
                    type="text"
                    onChange={e =>
                      setCourseData({
                        ...courseData,
                        description: e.target.value,
                      })
                    }
                    value={courseData?.description}
                  />
                </div>
              </Col>

              <Col sm={12}>
                <div className="mb-4">
                  <Label className="form-label">About Course</Label>
                  <Input
                    name="text"
                    className="form-control text-height"
                    placeholder="About Courses"
                    type="textarea"
                    onChange={e =>
                      setCourseData({
                        ...courseData,
                        about_course: e.target.value,
                      })
                    }
                    value={courseData?.about_course}
                  />{" "}
                </div>
              </Col>
              <Col sm={12}>
                <Label className="form-label">Course Type</Label>
                <Col sm={12} className="course-live">
                  <div>
                    <label>
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="courses"
                          id="live"
                          value="live"
                          onChange={e =>
                            setCourseData({
                              ...courseData,
                              course_type: e.target.value,
                            })
                          }
                          checked={courseData?.course_type === "Live"}
                        />
                        &nbsp; Live Courses
                      </div>
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="courses"
                          id="library"
                          value="library"
                          onChange={e =>
                            setCourseData({
                              ...courseData,
                              course_type: e.target.value,
                            })
                          }
                          checked={courseData?.course_type === "Library"}
                        />
                        &nbsp; Library Courses
                      </div>
                    </label>
                  </div>
                </Col>{" "}
              </Col>

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  className="px-4"
                  color="primary"
                  // type="submit"
                  // onClick={editData}
                >
                  Save as Draft
                </Button>
                <Button
                  className="px-4 ms-3"
                  onClick={editCourses}
                  color="primary"
                  type="submit"
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

CourseInformation.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  GetCourse: PropTypes.any,
}

const mapStateToProps = ({ GetCourse }) => ({
  getCourseInformation: GetCourse?.getCourseInformation?.data,
  editCourseInformation: GetCourse?.editCourseInformation,
})

const mapDispatchToProps = dispatch => ({
  onGetCoursesInformation: data => dispatch(getCourseInformation(data)),
  onEditCourseInformation: data => dispatch(editCourseInformation(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseInformation)

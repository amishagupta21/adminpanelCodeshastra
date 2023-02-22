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
import Select from "react-select"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const EducationDetails = props => {
  const { user, userProfile } = props
  const [personalData, setPersonalData] = useState({
    college_name: userProfile?.education_details?.qualification[2]?.full_name,
    email: userProfile?.education_details?.qualification[2]?.year_of_completion,
    passing_marks:
      userProfile?.education_details?.qualification[2]?.passing_marks,
    college_name: userProfile?.education_details?.qualification[1]?.full_name,
    email: userProfile?.education_details?.qualification[1]?.year_of_completion,
    passing_marks:
      userProfile?.education_details?.qualification[1]?.passing_marks,
    college_name: userProfile?.education_details?.qualification[0]?.full_name,
    email: userProfile?.education_details?.qualification[0]?.year_of_completion,
    passing_marks:
      userProfile?.education_details?.qualification[0]?.passing_marks,
    other_program_name: userProfile?.education_details?.other_program_name,
    other_program_college_name:
      userProfile?.education_details?.other_program_college_name,
    other_program_course_duration:
      userProfile?.education_details?.other_program_course_duration,
  })

  useEffect(() => {
    setPersonalData({
      college_name: userProfile?.education_details?.qualification[2]?.full_name,
      email:
        userProfile?.education_details?.qualification[2]?.year_of_completion,
      passing_marks:
        userProfile?.education_details?.qualification[2]?.passing_marks,
      college_name: userProfile?.education_details?.qualification[1]?.full_name,
      email:
        userProfile?.education_details?.qualification[1]?.year_of_completion,
      passing_marks:
        userProfile?.education_details?.qualification[1]?.passing_marks,
      college_name: userProfile?.education_details?.qualification[0]?.full_name,
      email:
        userProfile?.education_details?.qualification[0]?.year_of_completion,
      passing_marks:
        userProfile?.education_details?.qualification[0]?.passing_marks,
      other_program_name: userProfile?.education_details?.other_program_name,
      other_program_college_name:
        userProfile?.education_details?.other_program_college_name,
      other_program_course_duration:
        userProfile?.education_details?.other_program_course_duration,
    })
  }, [userProfile])

  const options = [
    { label: "Diploma_or_12th ", value: "12" },
    { label: "UG", value: "UG" },
    { label: "PG", value: "PG" },
    { label: "First_year", value: "First year" },
    { label: "Second_year", value: "Second year" },
    { label: "Pre_Final ", value: "Pre Final" },
    { label: "Final_Year ", value: "Final Year" },
  ]

  const editPersonalDetail = () => {}

  return (
    <>
      <div>
        <h4 className="ms-2 mb-3 text-primary ">Education Details</h4>
        <Row>
          <Col sm={4}>
            <Select
              name="filter"
              // value={value}
              // onChange={this.handleFilter}
              placeholder="Status"
              options={options}
            />
          </Col>
        </Row>
        <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Row>
                <h5 className="mb-3 mt-3">PG Degree Details </h5>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">PG College Name</Label>
                    <Input
                      name="text"
                      className="form-control"
                      placeholder="College of Management"
                      type="text"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          college_name: e.target.value,
                        })
                      }
                      value={personalData?.college_name}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">Year of Completion</Label>
                    <Input
                      name="number"
                      type="number"
                      placeholder="2022"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          year_of_completion: e.target.value,
                        })
                      }
                      value={personalData?.year_of_completion}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">PG Passing Marks</Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="89%"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          passing_marks: e.target.value,
                        })
                      }
                      value={personalData?.passing_marks + "%"}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <h5 className="mb-3 mt-3">UG/Bachelors Degree Details </h5>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      UG/Bachelors College Name
                    </Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="College of Engineering"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          college_name: e.target.value,
                        })
                      }
                      value={personalData?.college_name}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">Year of Completion</Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="2022"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          year_of_completion: e.target.value,
                        })
                      }
                      value={personalData?.year_of_completion}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      UG/Bachelors Passing Marks
                    </Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="89%"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          passing_marks: e.target.value,
                        })
                      }
                      value={personalData?.passing_marks + "%"}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <h5 className="mb-3 mt-3">12th/Diploma Course Details </h5>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      12th/Diploma College Name
                    </Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="Institute of Technology"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          college_name: e.target.value,
                        })
                      }
                      value={personalData?.college_name}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">Year of Completion</Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="2016"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          year_of_completion: e.target.value,
                        })
                      }
                      value={personalData?.year_of_completion}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      12th/Diploma Passing Marks
                    </Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="89%"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          passing_marks: e.target.value,
                        })
                      }
                      value={personalData?.passing_marks + "%"}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <h5 className="mb-3 mt-3">Additional Course Details </h5>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">Program Name</Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="Software Developer"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          other_program_name: e.target.value,
                        })
                      }
                      value={personalData?.other_program_name}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">College/Institute Name</Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="The Coding Institute"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          other_program_college_name: e.target.value,
                        })
                      }
                      value={personalData?.other_program_college_name}
                    />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <Label className="form-label">Duration in Months</Label>
                    <Input
                      name="text"
                      type="text"
                      placeholder="4 Months"
                      onChange={e =>
                        setPersonalData({
                          ...personalData,
                          other_program_course_duration: e.target.value,
                        })
                      }
                      value={
                        personalData?.other_program_course_duration + " days"
                      }
                    />
                  </div>
                </Col>
              </Row>
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
                  onClick={editPersonalDetail}
                  color="primary"
                  type="submit"
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

EducationDetails.propTypes = {
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
  onGetEditLearnerDetail: data => dispatch(editLearnerDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails)

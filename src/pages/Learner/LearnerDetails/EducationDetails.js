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
import { editEducationDetail } from "store/EducationDetail/actions"

const EducationDetails = props => {
  const { user, userProfile } = props
  const [filterData, setFilterData] = useState({ label: "PG", value: "PG" })
  const data =
    userProfile?.personal_details === null
      ? {}
      : [
          {
            pg_college_name: userProfile?.education_details?.qualification[0]
              ?.college_name
              ? userProfile?.education_details?.qualification[0]?.college_name
              : user?.college_name || "",
            pg_year_of_completion: userProfile?.education_details
              ?.qualification[0]?.year_of_completion
              ? userProfile?.education_details?.qualification[0]
                  ?.year_of_completion
              : user?.year_of_completion || "",
            pg_passing_marks: userProfile?.education_details?.qualification[0]
              ?.passing_marks
              ? userProfile?.education_details?.qualification[0]?.passing_marks
              : user?.passing_marks || "",
            pg_level: userProfile?.education_details?.qualification[0]?.level
              ? userProfile?.education_details?.qualification[0]?.level
              : user?.level || "",
          },
          {
            ug_college_name: userProfile?.education_details?.qualification[1]
              ?.college_name
              ? userProfile?.education_details?.qualification[1]?.college_name
              : user?.college_name || "",
            ug_year_of_completion: userProfile?.education_details
              ?.qualification[1]?.year_of_completion
              ? userProfile?.education_details?.qualification[1]
                  ?.year_of_completion
              : user?.year_of_completion || "",
            ug_passing_marks: userProfile?.education_details?.qualification[1]
              ?.passing_marks
              ? userProfile?.education_details?.qualification[1]?.passing_marks
              : user?.passing_marks || "",
            ug_level: userProfile?.education_details?.qualification[1]?.level
              ? userProfile?.education_details?.qualification[1]?.level
              : user?.level || "",
          },
          {
            diploma_college_name: userProfile?.education_details
              ?.qualification[2]?.college_name
              ? userProfile?.education_details?.qualification[2]?.college_name
              : user?.college_name || "",
            diploma_year_of_completion: userProfile?.education_details
              ?.qualification[2]?.year_of_completion
              ? userProfile?.education_details?.qualification[2]
                  ?.year_of_completion
              : user?.year_of_completion || "",
            diploma_passing_marks: userProfile?.education_details
              ?.qualification[2]?.passing_marks
              ? userProfile?.education_details?.qualification[2]?.passing_marks
              : user?.passing_marks || "",
            diploma_level: userProfile?.education_details?.qualification[2]
              ?.level
              ? userProfile?.education_details?.qualification[2]?.level
              : user?.level || "",
          },
          {
            other_program_name: userProfile?.education_details
              ?.other_program_name
              ? userProfile?.education_details?.other_program_name
              : user?.level || "",
            other_program_college_name: userProfile?.education_details
              ?.other_program_college_name
              ? userProfile?.education_details?.other_program_college_name
              : user?.other_program_college_name || "",
            other_program_course_duration: userProfile?.education_details
              ?.other_program_course_duration
              ? userProfile?.education_details?.other_program_course_duration
              : user?.other_program_course_duration || "",
            uid: userProfile?.uid || user?.uid,
          },
        ]
  const [educationData, setEducationData] = useState(data)
  const [isButtonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    let count = 0
    for (let key in educationData) {
      if (educationData[key] === "") {
        count++
        break
      }
    }
    if (count === 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [educationData])

  useEffect(() => {
    setEducationData({
      pg_college_name: userProfile?.education_details?.qualification[0]
        ?.college_name
        ? userProfile?.education_details?.qualification[0]?.college_name
        : user?.college_name || "",
      pg_year_of_completion: userProfile?.education_details?.qualification[0]
        ?.year_of_completion
        ? userProfile?.education_details?.qualification[0]?.year_of_completion
        : user?.year_of_completion || "",
      pg_passing_marks: userProfile?.education_details?.qualification[0]
        ?.passing_marks
        ? userProfile?.education_details?.qualification[0]?.passing_marks
        : user?.passing_marks || "",
      ug_college_name: userProfile?.education_details?.qualification[1]
        ?.college_name
        ? userProfile?.education_details?.qualification[1]?.college_name
        : user?.college_name || "",
      ug_year_of_completion: userProfile?.education_details?.qualification[1]
        ?.year_of_completion
        ? userProfile?.education_details?.qualification[1]?.year_of_completion
        : user?.year_of_completion || "",
      ug_passing_marks: userProfile?.education_details?.qualification[1]
        ?.passing_marks
        ? userProfile?.education_details?.qualification[1]?.passing_marks
        : user?.passing_marks || "",
      diploma_college_name: userProfile?.education_details?.qualification[2]
        ?.college_name
        ? userProfile?.education_details?.qualification[2]?.college_name
        : user?.college_name || "",
      diploma_year_of_completion: userProfile?.education_details
        ?.qualification[2]?.year_of_completion
        ? userProfile?.education_details?.qualification[2]?.year_of_completion
        : user?.year_of_completion || "",
      diploma_passing_marks: userProfile?.education_details?.qualification[2]
        ?.passing_marks
        ? userProfile?.education_details?.qualification[2]?.passing_marks
        : user?.passing_marks || "",
      other_program_name: userProfile?.education_details?.other_program_name
        ? userProfile?.education_details?.other_program_name
        : user?.other_program_name || "",
      other_program_college_name: userProfile?.education_details
        ?.other_program_college_name
        ? userProfile?.education_details?.other_program_college_name
        : user?.other_program_college_name || "",
      other_program_course_duration: userProfile?.education_details
        ?.other_program_course_duration
        ? userProfile?.education_details?.other_program_course_duration
        : user?.other_program_course_duration || "",
      uid: userProfile?.uid || user?.uid,
    })
  }, [userProfile])

  const highestQualificationOption = [
    { label: "Please Select", value: "" },
    { label: "Diploma_or_12th ", value: "12" },
    { label: "UG", value: "UG" },
    { label: "PG", value: "PG" },
    // { label: "First_year", value: "First year" },
    // { label: "Second_year", value: "Second year" },
    // { label: "Pre_Final ", value: "Pre Final" },
    // { label: "Final_Year ", value: "Final Year" },
  ]

  const editEducationDetail = event => {
    event.preventDefault()
    const { onGetEditEducationDetail } = props

    onGetEditEducationDetail({
      uid: educationData?.uid,
      education_details: {
        highest_qualification: "PG",
        qualification: [
          {
            level: "PG",
            college_name: educationData?.pg_college_name,
            year_of_completion: educationData?.pg_year_of_completion,
            passing_marks: educationData?.pg_passing_marks,
          },
          {
            college_name: educationData?.ug_college_name,
            year_of_completion: educationData?.ug_year_of_completion,
            passing_marks: educationData?.ug_passing_marks,
            level: "UG",
          },
          {
            college_name: educationData?.diploma_college_name,
            year_of_completion: educationData?.diploma_year_of_completion,
            passing_marks: educationData?.diploma_passing_marks,
            level: "Diploma_or_12th",
          },
        ],

        is_enrolled_other_program: true,
        other_program_name: educationData?.other_program_name,
        other_program_college_name: educationData?.other_program_college_name,
        other_program_course_duration:
          educationData?.other_program_course_duration,
      },
    })
  }

  const selectedEducationData = event => {
    const option = highestQualificationOption.filter(
      e => e.value === event.value
    )
    setFilterData(option[0])
  }

  return (
    <>
      <div>
        <h4 className="ms-2 mb-3 text-primary ">Education Details</h4>

        <Row>
          <Col sm={4}>
            <Select
              name="filter"
              onChange={selectedEducationData}
              placeholder="Status"
              options={highestQualificationOption}
              value={filterData}
            />
          </Col>
        </Row>

        <div className="p-2">
          <Form className="form-vertical">
            {filterData?.value !== "" && (
              <Row>
                {filterData?.value === "PG" && (
                  <Row>
                    <h5 className="mb-3 mt-3">PG Degree Details </h5>
                    <Col sm={4}>
                      <div className="mb-3">
                        <Label className="form-label">PG College Name</Label>
                        <Input
                          name="text"
                          className="form-control"
                          placeholder="College Name"
                          type="text"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              pg_college_name: e.target.value,
                            })
                          }
                          value={educationData?.pg_college_name}
                        />
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="mb-3">
                        <Label className="form-label">Year of Completion</Label>
                        <Input
                          name="text"
                          type="text"
                          placeholder="Year of Completion"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              pg_year_of_completion: e.target.value,
                            })
                          }
                          value={educationData?.pg_year_of_completion}
                        />
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="mb-3">
                        <Label className="form-label">PG Passing Marks</Label>
                        <Input
                          name="text"
                          type="text"
                          placeholder="Passing Marks"
                          onChange={e => {
                            setEducationData({
                              ...educationData,
                              pg_passing_marks: e.target.value,
                            })
                          }}
                          value={educationData?.pg_passing_marks}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
                {filterData?.value !== "12" && (
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
                          placeholder="College Name"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              ug_college_name: e.target.value,
                            })
                          }
                          value={educationData?.ug_college_name}
                        />
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="mb-3">
                        <Label className="form-label">Year of Completion</Label>
                        <Input
                          name="text"
                          type="text"
                          placeholder="Year of Completion"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              ug_year_of_completion: e.target.value,
                            })
                          }
                          value={educationData?.ug_year_of_completion}
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
                          placeholder="Passing Marks"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              ug_passing_marks: e.target.value,
                            })
                          }
                          value={educationData?.ug_passing_marks}
                        />
                      </div>
                    </Col>
                  </Row>
                )}

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
                        placeholder="College Name"
                        onChange={e =>
                          setEducationData({
                            ...educationData,
                            diploma_college_name: e.target.value,
                          })
                        }
                        value={educationData?.diploma_college_name}
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="mb-3">
                      <Label className="form-label">Year of Completion</Label>
                      <Input
                        name="text"
                        type="text"
                        placeholder="Year of Completion"
                        onChange={e =>
                          setEducationData({
                            ...educationData,
                            diploma_year_of_completion: e.target.value,
                          })
                        }
                        value={educationData?.diploma_year_of_completion}
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
                        placeholder="Passing Marks"
                        onChange={e =>
                          setEducationData({
                            ...educationData,
                            diploma_passing_marks: e.target.value,
                          })
                        }
                        value={educationData?.diploma_passing_marks}
                      />
                    </div>
                  </Col>
                </Row>

                {filterData?.value !== "12" && (
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
                            setEducationData({
                              ...educationData,
                              other_program_name: e.target.value,
                            })
                          }
                          value={educationData?.other_program_name}
                        />
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="mb-3">
                        <Label className="form-label">
                          College/Institute Name
                        </Label>
                        <Input
                          name="text"
                          type="text"
                          placeholder="The Coding Institute"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              other_program_college_name: e.target.value,
                            })
                          }
                          value={educationData?.other_program_college_name}
                        />
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="mb-3">
                        <Label className="form-label">Duration in Months</Label>
                        <Input
                          name="text"
                          type="text"
                          placeholder="Duration in Months"
                          onChange={e =>
                            setEducationData({
                              ...educationData,
                              other_program_course_duration: e.target.value,
                            })
                          }
                          value={educationData?.other_program_course_duration}
                        />
                      </div>
                    </Col>
                  </Row>
                )}

                <div className="mt-3 d-flex justify-content-end">
                  <Button
                    className="px-5"
                    onClick={editEducationDetail}
                    disabled={isButtonDisabled}
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Row>
            )}
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
  EducationDetails: PropTypes.any,
}

const mapStateToProps = ({ LearnerDetails, state, count }) => ({
  user: LearnerDetails?.data?.user,
  userProfile: LearnerDetails?.data?.userProfile,
  uploadProfilePicture: LearnerDetails?.uploadProfilePicture,
  editEducationDetail: LearnerDetails?.editEducationDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetEditEducationDetail: data => dispatch(editEducationDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails)

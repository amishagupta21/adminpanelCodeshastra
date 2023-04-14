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
import EducationForm from "./EducationForm"

const emptyObject = [
  {
    college_name: "",
    level: "Diploma_or_12th",
    passing_marks: "",
    year_of_completion: "",
  },
  {
    college_name: "",
    level: "UG",
    passing_marks: "",
    year_of_completion: "",
  },
  {
    college_name: "",
    level: "PG",
    passing_marks: "",
    year_of_completion: "",
  },
]

const EducationDetails = props => {
  const { user, userProfile } = props
  const [qualifications, setQualification] = useState([])
  const [filterArray, setFilterArray] = useState([])
  const data =
    userProfile?.personal_details === null
      ? {}
      : [
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
            highest_qualification: userProfile?.education_details
              ?.highest_qualification
              ? userProfile?.education_details?.highest_qualification
              : user?.highest_qualification || "",
            uid: userProfile?.uid || user?.uid,
          },
        ]
  const [educationData, setEducationData] = useState(data)
  const [filterData, setFilterData] = useState({})
  const [isButtonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    if (userProfile?.education_details?.qualification.length) {
      setQualification(
        userProfile?.education_details?.qualification.map(q => {
          delete q._id
          return q
        })
      )
      setFilterArray(userProfile?.education_details?.qualification)
    }
  }, [userProfile])

  useEffect(() => {
    const arr = [...qualifications]
    if (qualifications.length !== 3) {
      emptyObject.forEach(item => {
        if (!qualifications.some(elem => elem.level === item.level)) {
          arr.push(item)
        }
      })
      setQualification(arr)
    }
  }, [qualifications])

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
      highest_qualification: userProfile?.education_details
        ?.highest_qualification
        ? userProfile?.education_details?.highest_qualification
        : user?.highest_qualification || "",
      uid: userProfile?.uid || user?.uid,
    })
  }, [userProfile])

  useEffect(() => {
    if (userProfile?.education_details?.qualification?.length) {
      const hQ = userProfile?.education_details?.qualification?.map(item => ({
        label: item.level,
        value: highestQualificationOption.find(
          item => item.label === item.level && item.value
        ),
      }))
      setFilterData(hQ[hQ?.length - 1])
    }
  }, [userProfile, qualifications])

  const highestQualificationOption = [
    { label: "Please Select", value: "" },
    { label: "Diploma_or_12th", value: "12" },
    { label: "UG", value: "UG" },
    { label: "PG", value: "PG" },
  ]

  const getQualification = () => {
    return filterArray.filter(
      item =>
        item.college_name !== "" &&
        item.year_of_completion !== "" &&
        item.passing_marks !== ""
    )
  }
  const editEducationDetail = event => {
    event.preventDefault()
    const { onGetEditEducationDetail } = props
    onGetEditEducationDetail({
      uid: educationData?.uid,
      education_details: {
        highest_qualification: "PG",
        qualification: getQualification(),
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

    if (option[0].label === "Diploma_or_12th") {
      setFilterArray(
        qualifications.filter(data => data?.level === "Diploma_or_12th")
      )
    } else if (option[0].label === "UG") {
      setFilterArray(qualifications.filter(data => data?.level !== "PG"))
    } else if (option[0].label === "PG") {
      setFilterArray(qualifications)
    }
  }

  const updateQualification = qualificationDetail => {
    qualifications.map(qualification => {
      if (qualification.level === qualificationDetail.level) {
        qualification.level = qualificationDetail.level
        qualification.college_name = qualificationDetail.college_name
        qualification.year_of_completion =
          qualificationDetail.year_of_completion
        qualification.passing_marks = qualificationDetail.passing_marks
        qualification._id = qualificationDetail._id
      }
    })
    setQualification(qualifications)
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
            ></Select>
          </Col>
        </Row>

        <div className="p-2">
          <Form className="form-vertical">
            {filterData?.value !== "" && (
              <Row>
                {filterArray?.map(qualifica => {
                  return (
                    <>
                      <EducationForm
                        key={qualifica.level}
                        qualification={qualifica}
                        educationData={educationData}
                        updateQualification={updateQualification}
                      />
                    </>
                  )
                })}

                {filterData?.label !== "Diploma_or_12th" && (
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

const mapStateToProps = ({ LearnerDetails }) => ({
  user: LearnerDetails?.data?.user,
  userProfile: LearnerDetails?.data?.userProfile,
  uploadProfilePicture: LearnerDetails?.uploadProfilePicture,
  editEducationDetail: LearnerDetails?.editEducationDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetEditEducationDetail: data => dispatch(editEducationDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails)

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

function EducationForm({ qualification, educationData, updateQualification }) {
  const [educationDetail, setEducationDetail] = useState({})
  useEffect(() => {
    if (qualification) {
      updateEducationDetail(qualification)
    }
  }, [qualification])

  const updateEducationDetail = detail => {
    // update state
    setEducationDetail(detail)
  }

  const getLabel = () => {
    let labels = {
      UG: "UG/Bachelors Degree Details",
      PG: "PG Degree Details",
      Diploma_or_12th: "12th/Diploma Course Details",
    }

    return labels[qualification.level]
  }
  const getName = () => {
    if (qualification.level === "Diploma_or_12th") return "12th"
    return qualification.level
  }
  const setEducationData = e => {
    const { name, value } = e?.target
    const updateDetail = { ...educationDetail, [name]: value }
    setEducationDetail(updateDetail)
    updateQualification(updateDetail)
    // debugger
  }

  return (
    <Row>
      <Row>
        <h5 className="mb-3 mt-3">{getLabel()}</h5>
        <Col sm={4}>
          <div className="mb-3">
            <Label className="form-label">
              {qualification.level} College Name
            </Label>
            <Input
              name="college_name"
              className="form-control"
              placeholder="College Name"
              type="text"
              onChange={setEducationData}
              value={educationDetail?.college_name}
            />
          </div>
        </Col>
        <Col sm={4}>
          <div className="mb-3">
            <Label className="form-label">Year of Completion</Label>
            <Input
              name="year_of_completion"
              type="text"
              placeholder="Year of Completion"
              onChange={setEducationData}
              value={educationDetail?.year_of_completion}
            />
          </div>
        </Col>
        <Col sm={4}>
          <div className="mb-3">
            <Label className="form-label">{getName()} Passing Marks</Label>
            <Input
              name="passing_marks"
              type="text"
              placeholder="Passing Marks"
              onChange={setEducationData}
              value={educationDetail?.passing_marks}
            />
          </div>
        </Col>
      </Row>
    </Row>
  )
}

export default EducationForm

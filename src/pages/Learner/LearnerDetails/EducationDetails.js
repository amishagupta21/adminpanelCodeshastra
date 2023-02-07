import React from "react"
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

const EducationDetails = props => {
  const { user, userProfile } = props

  const options = [
    { label: "Diploma_or_12th ", value: "12" },
    { label: "UG", value: "UG" },
    { label: "PG", value: "PG" },
    { label: "First_year", value: "First year" },
    { label: "Second_year", value: "Second year" },
    { label: "Pre_Final ", value: "Pre Final" },
    { label: "Final_Year ", value: "Final Year" },
  ]

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
                      value={
                        userProfile?.education_details?.qualification[2]
                          ?.college_name
                      }
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
                      value={
                        userProfile?.education_details?.qualification[2]
                          ?.year_of_completion
                      }
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
                      value={
                        userProfile?.education_details?.qualification[2]
                          ?.passing_marks + "%"
                      }
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
                      value={
                        userProfile?.education_details?.qualification[1]
                          ?.college_name
                      }
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
                      value={
                        userProfile?.education_details?.qualification[1]
                          ?.year_of_completion
                      }
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
                      value={
                        userProfile?.education_details?.qualification[1]
                          ?.passing_marks + "%"
                      }
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
                      value={
                        userProfile?.education_details?.qualification[0]
                          ?.college_name
                      }
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
                      value={
                        userProfile?.education_details?.qualification[0]
                          ?.year_of_completion
                      }
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
                      value={
                        userProfile?.education_details?.qualification[0]
                          ?.passing_marks + "%"
                      }
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
                      value={userProfile?.education_details?.other_program_name}
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
                      value={
                        userProfile?.education_details
                          ?.other_program_college_name
                      }
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
                      value={
                        userProfile?.education_details
                          ?.other_program_course_duration + " days"
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
                <Button className="px-5" color="primary" type="submit">
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

export default EducationDetails

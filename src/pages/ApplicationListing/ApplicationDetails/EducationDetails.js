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

const EducationDetails = () => {
  return (
    <>
      <div className="p-2">
        <Form className="form-vertical">
          <Row>
            <Row>
              <h5 className="mb-3 mt-3">PG Degree Details </h5>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">PG College Name</Label>
                  <Input
                    name="email"
                    className="form-control"
                    placeholder="College of Management"
                    type="text"
                  />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">Year of Completion</Label>
                  <Input name="text" type="text" placeholder="2022" />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">PG Passing Marks</Label>
                  <Input name="text" type="text" placeholder="89%" />
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
                  />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">Year of Completion</Label>
                  <Input name="text" type="text" placeholder="2022" />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    UG/Bachelors Passing Marks
                  </Label>
                  <Input name="text" type="text" placeholder="89%" />
                </div>
              </Col>
            </Row>
            <Row>
              <h5 className="mb-3 mt-3">12th/Diploma Course Details </h5>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    12th/Diploma Course Details
                  </Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Institute of Technology"
                  />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">Year of Completion</Label>
                  <Input name="text" type="text" placeholder="2016" />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    12th/Diploma Passing Marks
                  </Label>
                  <Input name="text" type="text" placeholder="89%" />
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
                  />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">Duration in Months</Label>
                  <Input name="text" type="text" placeholder="4 Months" />
                </div>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default EducationDetails

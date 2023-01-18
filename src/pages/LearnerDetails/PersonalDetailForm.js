import React, { useState } from "react"
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
import { Link } from "react-router-dom"
import userplaceholder from "../../assets/images/userplaceholder.png"
import DatePicker from "react-datepicker"
import "./personalDetailForm.css"

import "react-datepicker/dist/react-datepicker.css"

const PersonalDetailForm = () => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <div>
        <h4 className="text-primary">Personal Details</h4>
        <div className="d-flex align-items-center">
          <img src={userplaceholder} height="50px" alt="" />
          &nbsp;&nbsp;
          <div>
            <p>Profile Picture</p>
            <div>
              <Link to="/">View</Link>&nbsp;&nbsp;&nbsp;
              <Link className="text-danger" to="/">
                Delete
              </Link>
            </div>
          </div>
        </div>
        <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Full Name</Label>
                  <Input
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    type="email"
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input name="text" type="email" placeholder="Enter Email" />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Mobile Number</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Enter Mobile Number"
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Date of Birth</Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Guardian Detail</Label>
                  <Input name="text" type="text" placeholder="Enter Detail" />
                </div>
              </Col>

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

export default PersonalDetailForm

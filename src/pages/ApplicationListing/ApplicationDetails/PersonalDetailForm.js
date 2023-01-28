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
import DatePicker from "react-datepicker"
import "./personalDetailForm.css"

import "react-datepicker/dist/react-datepicker.css"

const PersonalDetailForm = () => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <div>
        <p className="font-bold">Personal Details</p>

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
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Learner Type</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Working Professional"
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

export default PersonalDetailForm

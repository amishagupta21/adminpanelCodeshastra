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
import { Link } from "react-router-dom"
import userplaceholder from "../../assets/images/userplaceholder.png"

const CoursesEnrolled = () => {
  return (
    <>
      <div>
        <h4>CoursesEnrolled Details</h4>
        <div className="d-flex align-items-center">
          <img src={userplaceholder} height="50px" alt="" />
          &nbsp;&nbsp;
          <div>
            <p>Profile Picture</p>
            <Link to="/">View</Link>&nbsp;&nbsp;
            <Link to="/">Delete</Link>
          </div>
        </div>
        <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Email</Label>
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
                  <Label className="form-label">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
              </Col>
              <div className="mt-3 d-flex justify-content-end">
                <Button color="primary" className="me-3" outline type="submit">
                  Reset
                </Button>
                <Button color="primary" type="submit">
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

export default CoursesEnrolled

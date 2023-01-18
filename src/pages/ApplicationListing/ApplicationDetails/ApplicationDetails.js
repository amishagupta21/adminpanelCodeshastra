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
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import ApplicationForm from "./ApplicationForm"
import "./applicationDetails.css"
import userPlaceholder from "../../../assets/images/userplaceholder.png"

const ApplicationDetails = () => {
  const [key, setKey] = useState("home")
  const [value, setValue] = useState("home")

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Unikaksha" breadcrumbItem="Application Details" />
        <Row>
          <Col sm="4">
            <Card>
              <div className="bg-image">
                <div className="d-flex justify-content-center">
                  <img height="50px" src={userPlaceholder} />
                  <div className="profile-detail">
                    <h5 className="text-white mb-0">Shubham Dixit</h5>
                    <p className="text-white">Working Professional</p>
                  </div>
                </div>
              </div>
              {/* <img alt="Sample" height="120px" src="" /> */}
              <CardBody>
                <Row>
                  <Col sm="4">
                    <CardTitle tag="h5">Email Id</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      shubhamd@gmail.com
                    </CardSubtitle>
                  </Col>
                  <Col sm="4">
                    <CardTitle tag="h5">DOB</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      26 Aug 1996
                    </CardSubtitle>
                  </Col>
                  <Col sm="4">
                    <CardTitle tag="h5">Contact Number</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      +91 9854123681
                    </CardSubtitle>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Application Summary</CardTitle>
                <h4 className="mt-3">Full Stack Web Developer (Full Time)</h4>

                <p className="mt-3">
                  Course Type: <span>Fresher/Working Professional</span>
                </p>
                <p className="mt-2">
                  Application number: <span>ANKG54216384</span>
                </p>
                <p className="mt-2">
                  Applied on: <span>12-10-2020, 09:45</span>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col sm="8">
            <ApplicationForm />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ApplicationDetails

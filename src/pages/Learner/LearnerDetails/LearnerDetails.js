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

import Nav from "react-bootstrap/Nav"
import PersonalDetails from "./PersonalDetails"
import "./learnerDetail.css"
import userPlaceholder from "../../../assets/images/userplaceholder.png"

const LearnerDetails = () => {
  const [key, setKey] = useState("home")
  const [value, setValue] = useState("home")

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Unikaksha" breadcrumbItem="Learner" />
        <Row>
          <Col sm="4">
            <Card>
              <div className="learner-bg-image">
                <div className="d-flex justify-content-center">
                  <img height="50px" src={userPlaceholder} />
                  <div className="profile-detail">
                    <h5 className="text-white mb-0">Shubham Dixit</h5>
                    <p className="text-white">Working Professional</p>
                  </div>
                </div>
              </div>

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
          </Col>
          <Col sm="4">
            <Card className="courses">
              <CardBody>
                <CardTitle tag="h5">Courses</CardTitle>

                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={k => setKey(k)}
                >
                  <Tab eventKey="home" title="Live Course">
                    <div className="mt-3">
                      <h4>Full Stack Web Developer (Full Time)</h4>
                      <p>Batch #23</p>
                      <p className="mt-2 mb-2">
                        Next Live - Monday, 23 Aug 2022
                      </p>
                      <p>8:00 AM to 5:00 PM (IST)</p>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Library">
                    Library
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Attendance Summary</CardTitle>
                <p className="mt-3">This month</p>
                <Row>
                  <Col sm="6">
                    <h4 className="mt-3">July 2022 - Aug 2022</h4>
                    <p className="mt-1">
                      Shubham attended 10 out of 11 live sessions.
                    </p>
                    <Button className="mt-3" color="primary">
                      View More
                    </Button>
                  </Col>
                  <Col sm="6"></Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <PersonalDetails />
        </Row>
      </Container>
    </div>
  )
}

export default LearnerDetails

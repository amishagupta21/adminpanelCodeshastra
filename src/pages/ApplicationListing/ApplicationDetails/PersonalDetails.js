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
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import style from "../LearnerDetails/personalDetails.css"
import { Link } from "react-router-dom"
import PersonalDetailForm from "./PersonalDetailForm"
import EducationDetails from "./EducationDetails"
import WorkDetails from "./WorkDetails"
import CoursesEnrolled from "./TestResult"
import Attendance from "./ApplicationStatus"
import DocumentKyc from "./DocumentKyc"
import Billing from "./PaymentAndBatch"
import Notifications from "./Notifications"

const PersonalDetails = () => {
  const [value, setValue] = useState("details")

  const initialTabs = [
    {
      eventKey: "details",
      title: "Personal Details",
      component: <PersonalDetailForm />,
    },
    {
      eventKey: "education-detail",
      title: "Education Details",
      component: <EducationDetails />,
    },
    {
      eventKey: "work-detail",
      title: "Work Details",
      component: <WorkDetails />,
    },
    {
      eventKey: "courses-enrolled",
      title: "Courses Enrolled",
      component: <CoursesEnrolled />,
    },
    { eventKey: "attendance", title: "Attendance", component: <Attendance /> },
    {
      eventKey: "document",
      title: "Document & KYC",
      component: <DocumentKyc />,
    },
    {
      eventKey: "billing",
      title: "Billing & Invoice",
      component: <Billing />,
    },
    {
      eventKey: "notification",
      title: "Notifications",
      component: <Notifications />,
    },
  ]

  return (
    <>
      <Container className="personal-detail-tab" fluid>
        <Row>
          <Col sm="4">
            <Card className="card-height">
              <CardBody className="personal-detail-section">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={value}
                  onSelect={k => setValue(k)}
                >
                  {initialTabs.map(item => {
                    return (
                      <Tab
                        key={item.eventKey}
                        eventKey={item.eventKey}
                        title={item.title}
                      ></Tab>
                    )
                  })}{" "}
                </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col sm="8">
            <Card className="card-height">
              <CardBody>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={value}
                  onSelect={k => setValue(k)}
                >
                  {initialTabs.map(item => {
                    return (
                      <Tab key={item.eventKey} eventKey={item.eventKey}>
                        {item.component}
                      </Tab>
                    )
                  })}
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PersonalDetails

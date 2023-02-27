import React, { useState } from "react"
import { Row, Col, Card, CardBody, Container, CardHeader } from "reactstrap"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
// import style from "../LearnerDetails/personalDetails.css"
import { Link } from "react-router-dom"
import PersonalDetailForm from "./PersonalDetailForm"
import "./applicationForm.css"

import EducationDetails from "./EducationDetails"
import WorkDetails from "./WorkDetails"
import Attendance from "./ApplicationStatus"
import DocumentKyc from "./DocumentKyc"
import Billing from "./PaymentAndBatch"
import TestResult from "./TestResult"

const ApplicationForm = () => {
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
      eventKey: "Test Result",
      title: "Test Result",
      component: <TestResult />,
    },
    {
      eventKey: "attendance",
      title: "Application Status",
      component: <Attendance />,
    },
    {
      eventKey: "billing",
      title: "Payment & Batch",
      component: <Billing />,
    },
    {
      eventKey: "document",
      title: "Document & KYC",
      component: <DocumentKyc />,
    },
  ]

  return (
    <>
      <Container className="application-detail-section" fluid>
        <Row>
          <Col sm="12">
            <Card className="card-height">
              <CardBody>
                <Tabs
                  className="application-top-tab"
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
                <Tabs
                  className="application-tab"
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

export default ApplicationForm

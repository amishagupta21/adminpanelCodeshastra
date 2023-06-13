import React from "react"
import { Row, Col, Card, CardBody, Label, Progress,UncontrolledAccordion,AccordionItem,AccordionHeader,AccordionBody } from "reactstrap";
import ChartCircle from "../../assets/images/Chart-circle.png";

const BatchProgress = () => {
  return (
    <div className="prog-bar-accordion">
      <Card>
        <UncontrolledAccordion>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <h5 className="progress-bar-heading">Batch Progress</h5>
            </AccordionHeader>
            <AccordionBody accordionId="1">
            {/* <div className="d-flex justify-content-between mb-3">
              <span className="progress-bar-heading">Batch Progress</span>
            </div> */}
          <Row>
            <Col md={6}>
              <p className="mb-1 progress-bar-subheading">Current status</p>
              <p className="mb-3 progress-bar-para">
                Week 11
              </p>
              <p className="mb-1 progress-bar-subheading">Current Checkpoint </p>
              <p className="mb-3 progress-bar-para">
                FCP 3
              </p>
              <p className="mb-1 progress-bar-subheading">Average Attendance </p>
              <p className="mb-3 progress-bar-para">
                60%
              </p>
              <p className="mb-1 progress-bar-subheading">
                Next Lecture On:
              </p>
              <p className="mb-3 progress-bar-para">
              08 Oct 22
              </p>
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <img src={ChartCircle} style={{width:'90%'}} />
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between px-2">
                <div className="assign-text">
                  Assignments
                  <br />
                  <span>200</span>
                </div>
                <div className="assign-text">
                  Assessments <br />
                  <span>200</span>
                </div>
                <div className="assign-text">
                  Projects
                  <br />
                  <span>20</span>
                </div>
              </div>
              <hr></hr>
              <h5 style={{fontSize:'20px'}}>Completion Status Learners</h5>
              <div className="mt-4">
            <div className="my-progress-bar">
              <Label className="me-3">Assignments</Label>
              <div className="w-100 text-center">
                <Progress value="25" color="primary"></Progress>
                <Label className="me-2 label">
                  <span>32</span>/40 Learners
                </Label>
              </div>
            </div>
            <div className="my-progress-bar">
              <Label className="me-3">Assessments</Label>
              <div className="w-100 text-center">
                <Progress value="25" color="warning"></Progress>
                <Label className="me-2 label">
                  <span>20</span>/40 Learners
                </Label>
              </div>
            </div>
            <div className="my-progress-bar">
              <Label className="me-3">Projects</Label>
              <div className="w-100 text-center">
                <Progress value="25" color="danger"></Progress>
                <Label className="me-2 label">
                  <span>10</span>/40 Learners
                </Label>
              </div>
            </div>
          </div>
            </Col>
          </Row>
            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
      </Card>



      {/* <Card>
        <CardBody className="card-height-470">
          <div className="d-flex justify-content-between mb-3">
            <span className="progress-bar-heading">Batch Progress</span>
          </div>
          <hr></hr>
          <Row>
            <Col md={6}>
              <p className="mb-1 progress-bar-subheading">Current status</p>
              <p className="mb-3 progress-bar-para">
                Week 11
              </p>
              <p className="mb-1 progress-bar-subheading">Current Checkpoint </p>
              <p className="mb-3 progress-bar-para">
                FCP 3
              </p>
              <p className="mb-1 progress-bar-subheading">Average Attendance </p>
              <p className="mb-3 progress-bar-para">
                60%
              </p>
              <p className="mb-1 progress-bar-subheading">
                Next Lecture On:
              </p>
              <p className="mb-3 progress-bar-para">
              08 Oct 22
              </p>
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <img src={ChartCircle} style={{width:'90%'}} />
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between px-2">
                <div className="assign-text">
                  Assignments
                  <br />
                  <span>200</span>
                </div>
                <div className="assign-text">
                  Assessments <br />
                  <span>200</span>
                </div>
                <div className="assign-text">
                  Projects
                  <br />
                  <span>20</span>
                </div>
              </div>
              <hr></hr>
              <h5 style={{fontSize:'20px'}}>Completion Status Learners</h5>
              <div className="mt-4">
            <div className="my-progress-bar">
              <Label className="me-3">Assignments</Label>
              <div className="w-100 text-center">
                <Progress value="25" color="primary"></Progress>
                <Label className="me-2 label">
                  <span>32</span>/40 Learners
                </Label>
              </div>
            </div>
            <div className="my-progress-bar">
              <Label className="me-3">Assessments</Label>
              <div className="w-100 text-center">
                <Progress value="25" color="warning"></Progress>
                <Label className="me-2 label">
                  <span>20</span>/40 Learners
                </Label>
              </div>
            </div>
            <div className="my-progress-bar">
              <Label className="me-3">Projects</Label>
              <div className="w-100 text-center">
                <Progress value="25" color="danger"></Progress>
                <Label className="me-2 label">
                  <span>10</span>/40 Learners
                </Label>
              </div>
            </div>
          </div>
            </Col>
          </Row>
        </CardBody>
      </Card> */}
    </div>
  )
}

export default BatchProgress

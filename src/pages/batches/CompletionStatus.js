import React from "react"
import { Row, Col, Card, CardBody, Label, Progress } from "reactstrap"

const CompletionStatus = () => {
  return (
    <div>
      <Card>
        <CardBody className="card-height">
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
          <h5>Completion Status By Learners</h5>
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
        </CardBody>
      </Card>
    </div>
  )
}

export default CompletionStatus

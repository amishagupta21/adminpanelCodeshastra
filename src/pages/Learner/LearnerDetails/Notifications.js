import React from "react"
import { Row, Col, FormGroup, Label, Input, Form, Button } from "reactstrap"
import { Link } from "react-router-dom"

const Notifications = () => {
  return (
    <>
      <div>
        <h4 className="text-primary">Notifications </h4>
        <div className="mt-5">
          <h5 className="d-flex align-items-center">
            Live Class Alert{" "}
            <FormGroup className="ms-2" switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </h5>
          <div className="mt-4 d-flex justify-content-between w-50">
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Whatspp
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Email
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Push Notification
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                SMS
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h5 className="d-flex align-items-center">
            New Course Notification{" "}
            <FormGroup className="ms-2" switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </h5>
          <div className="mt-4 d-flex justify-content-between w-50">
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Whatspp
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Email
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Push Notification
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                SMS
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h5 className="d-flex align-items-center">
            Job Updates{" "}
            <FormGroup className="ms-2" switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </h5>
          <div className="mt-4 d-flex justify-content-between w-50">
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Whatspp
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Email
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Push Notification
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                SMS
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h5 className="d-flex align-items-center">
            New Letter Updates{" "}
            <FormGroup className="ms-2" switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </h5>
          <div className="mt-4 d-flex justify-content-between w-50">
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Whatspp
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Email
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                Push Notification
              </Label>
            </div>
            <div>
              <Input type="checkbox" id="exampleCheck" />
              &nbsp;&nbsp;{" "}
              <Label for="exampleCheck" check>
                SMS
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <Button color="primary" className="me-3 px-5" outline type="submit">
            Reset
          </Button>
          <Button className="px-5" color="primary" type="submit">
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default Notifications

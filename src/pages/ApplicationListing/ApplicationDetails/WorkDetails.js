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

const WorkDetails = () => {
  return (
    <>
      <div>
        <h4 className="text-primary">Work Details</h4>

        <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Current Working Position</Label>
                  <Input
                    name="text"
                    className="form-control"
                    placeholder="Software Developer"
                    type="text"
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Total technical exp. in years
                  </Label>
                  <Input name="text" type="text" placeholder="2 years" />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Total coding exp. in years
                  </Label>
                  <Input name="text" type="text" placeholder="1 year" />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Organization working in</Label>
                  <Input name="text" type="text" placeholder="Code Shashtra" />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

export default WorkDetails

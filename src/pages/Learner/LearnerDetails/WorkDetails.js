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

const WorkDetails = props => {
  const { userProfile } = props

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
                    value={userProfile?.work_details[0]?.position}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Total technical exp. in years
                  </Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="2 years"
                    value={userProfile?.work_details[0]?.experience + " years"}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Total coding exp. in years
                  </Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="1 year"
                    value={userProfile?.work_details[0]?.experience + " years"}
                  />
                </div>
              </Col>
              <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">Organization working in</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Code Shashtra"
                    value={userProfile?.work_details[0]?.organization_name}
                  />
                </div>
              </Col>

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  color="primary"
                  className="me-3 px-5"
                  outline
                  type="submit"
                >
                  Reset
                </Button>
                <Button className="px-5" color="primary" type="submit">
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

export default WorkDetails

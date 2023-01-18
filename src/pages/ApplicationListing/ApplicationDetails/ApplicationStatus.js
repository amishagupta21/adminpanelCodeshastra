import React from "react"
import Select from "react-select"

import { Table } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"

const ApplicationStatus = () => {
  const options = [
    { label: "INVITED ", value: "invited" },
    { label: "  ONBOARDED", value: "onboarded" },
    { label: "  SUSPENDED ", value: "suspended" },
    { label: "    DEACTIVATED ", value: "de-activated" },
  ]

  return (
    <>
      <div>
        <Form>
          <Row className="align-items-center">
            <Col>
              <h5>Application Status</h5>
              <p className="mt-4 mb-3">Comment by Agent - Rahul Singh</p>
              <Input id="exampleText" name="text" type="textarea" />
            </Col>
          </Row>
          <div className="mt-3">
            <p>Action Required :</p>
            <Row>
              <Col className="mb-3" sm={3}>
                <Select
                  name="filter"
                  placeholder="Test Result"
                  options={options}
                />
              </Col>
            </Row>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              placeholder="All Comment here"
            />
            <FormGroup className="mt-3" check>
              <Input type="checkbox" />{" "}
              <Label check>I have read and I understand</Label>
            </FormGroup>
          </div>
          <Button color="primary" className="mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
}

export default ApplicationStatus

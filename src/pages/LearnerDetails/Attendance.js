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
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"

const Attendance = () => {
  const options = [
    { label: "INVITED ", value: "invited" },
    { label: "  ONBOARDED", value: "onboarded" },
    { label: "  SUSPENDED ", value: "suspended" },
    { label: "    DEACTIVATED ", value: "de-activated" },
  ]

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const libraryCourse = [
    {
      title: "Lecture",
      value: "#Lecture-1",
    },
    {
      title: "Date",
      value: "12-10-2022",
    },
    {
      title: "Start Time",
      value: "08:00 AM",
    },
    {
      title: "End Time",
      value: "05:00 PM",
    },
    {
      title: "Attendance",
      value: "Present",
    },
    {
      title: "Action",
      value: "70% Completed",
    },
  ]

  return (
    <>
      <div>
        <h4 className="text-primary">Attendance</h4>
        <Row className="align-items-center mt-4">
          <Col sm={8}>
            <h5>Full Stack Web Developer</h5>
          </Col>
          <Col sm={4}>
            <Row>
              <Col sm={6}>
                <Select
                  name="filter"
                  placeholder="Test Result"
                  options={options}
                />
              </Col>
              <Col sm={6}>
                <Button type="button" className="btn mb-2 me-2">
                  Export
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Col xl="12">
          <Table>
            <thead>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <th>{item.title}</th>
                    </>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <td>{item.value}</td>
                    </>
                  )
                })}
              </tr>
            </tbody>
          </Table>
        </Col>
        <div className="mt-3 d-flex justify-content-end">
          <Button color="primary" className="me-3" outline type="submit">
            Reset
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default Attendance

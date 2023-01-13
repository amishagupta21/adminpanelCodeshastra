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

  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Product Price",
    },
  ]

  const data = [
    {
      dataField: "id",
      text: "Product",
    },
    {
      dataField: "name",
      text: "Product Name",
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
          <div className="table-responsive">
            <BootstrapTable keyField="id" data={data} columns={columns} />
          </div>
        </Col>
      </div>
    </>
  )
}

export default Attendance

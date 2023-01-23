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

const Billing = () => {
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
      title: "Transaction Summary",
      value: "#Lecture-1",
    },
    {
      title: "Transaction amount",
      value: "12-10-2022",
    },
    {
      title: "Transaction date",
      value: "08:00 AM",
    },
    {
      title: "Transaction id",
      value: "05:00 PM",
    },
    {
      title: "Invoice",
      value: "Present",
    },
  ]

  return (
    <>
      <div>
        <h4 className="text-primary">Billing & Invoice</h4>

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
      </div>
    </>
  )
}

export default Billing

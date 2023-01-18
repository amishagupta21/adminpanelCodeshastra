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

const PaymentAndBatch = () => {
  const options = [
    { label: "INVITED ", value: "invited" },
    { label: "  ONBOARDED", value: "onboarded" },
    { label: "  SUSPENDED ", value: "suspended" },
    { label: "    DEACTIVATED ", value: "de-activated" },
  ]

  return (
    <>
      <div>
        <h5>Payment Summary</h5>

        <p className="mt-3">
          Payment Type - <span>Pay After Placement</span>
        </p>
        <p className="mt-3">
          Transaction Number - <span>TRA1568498AD</span>
        </p>
        <p className="mt-3">
          Transaction Date <span>12-10-2020, 09:45</span>
        </p>
        <p className="mt-3">
          Amount Paid <span>Rs 24,000</span>
        </p>
      </div>
      <div className="mt-4">
        <h5>Batch Selection</h5>

        <p className="mt-3">
          Batch Name: <span>#Batch23</span>
        </p>
        <p className="mt-3">
          Batch Type: <span>Full Time</span>
        </p>
        <p className="mt-3">
          Batch Time: <span>08:00 AM to 5:00 PM</span>
        </p>
        <p className="mt-3">
          Batch Start Date: <span>20 Sept 2022, Monday</span>
        </p>
        <p className="mt-3">
          Mentor: <span>Dr. Kamlesh Gupta</span>
        </p>
      </div>
    </>
  )
}

export default PaymentAndBatch

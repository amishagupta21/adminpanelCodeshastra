import React, { useState, useEffect } from "react"
import {
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Table,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getBatchesLearner } from "store/Batches/actions"
import ReportCard from "./ReportCard"
import "./batches.css"

const BatchListTable = ({ item, manageUser, batchesLearner }) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const params = useParams()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{user?.id}</>,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.name}</div>
        ),
      },

      {
        dataField: "assignments",
        text: "Assignments",
        sort: true,
        // formatter: (cellContent, user) => (
        //   <div className="fw-bold">{user?.assingment

        //   }</div>
        // ),
      },
      {
        dataField: "assessments",
        text: "Assessments",
        sort: true,
        // formatter: (cellContent, user) => (
        //   <div className="fw-bold">{user?.assessments

        //   }</div>
        // ),
      },
      {
        dataField: "projects_total",
        text: "Projects",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.projects_total}</div>
        ),
      },
      {
        dataField: "attendence",
        text: "Attendance",
        sort: true,
        formatter: (cellContent, user) => (
          <span>{user?.attendence.toFixed(2)} %</span>
        ),
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: (cellContent, user) => (
          <div>
            <span
              className={
                user?.status === 0 ? "btn-status-inactive" : "btn-status-active"
              }
            >
              {user?.status === "true" ? "Active" : "Inactive"}
            </span>
          </div>
          // Active css className="btn-status-active"
          // Inactive css className="btn-status-inactive"
        ),
      },

      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            <div className="me-2">
              {/* <Link to="/batch-list" className="text-muted">
                <i className="mdi mdi-step-forward-2 mdi-18px text-success" />
              </Link> */}
              <Link
                to={`/report/${user?.id}`}
                // onClick={toggle}
                className="text-muted ms-2"
              >
                <i className="mdi mdi-clipboard-account mdi-18px text-success" />
              </Link>
            </div>
          </div>
        ),
      },
    ],
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  return (
    <div className="batches-home">
      <ReportCard modal={modal} toggle={toggle} />
      <ToolkitProvider
        key={isExpanded}
        keyField="_id"
        columns={state?.columns}
        data={batchesLearner}
      >
        {toolkitProps => (
          <>
            <Col xl="12">
              <div className="table-responsive">
                <h6 className="mt-3">
                  Total Learners: {batchesLearner?.length}
                </h6>

                <BootstrapTable
                  keyField={"_id"}
                  responsive
                  bordered={false}
                  striped={false}
                  defaultSorted={defaultSorted}
                  selectRow={selectRow}
                  classes={"table align-middle table-nowrap"}
                  headerWrapperClasses={"thead-light"}
                  {...toolkitProps.baseProps}
                  pagination={paginationFactory()}
                  noDataIndication={"No data found"}
                />
              </div>
            </Col>
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

export default BatchListTable

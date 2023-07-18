import React, { useState, useEffect } from "react"
import {
  Button,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getBatchesLearner } from "store/Batches/actions"
import ReportCard from "./ReportCard"
import "./batches.css"
import Status from "./Status"
import jsPDF from "jspdf"
import "jspdf-autotable"
import LearnerStatus from "./LearnerStatus"

import "react-responsive-pagination/themes/classic.css"
import ResponsivePagination from "react-responsive-pagination"
import EnrollStatusModel from "./EnrollStatusModel"
import DropdownPagination from "./DropdownPagination"
import { RxCrossCircled } from "react-icons/rx"

const ref = React.createRef()

const options = {
  orientation: "landscape",
  // unit: "in",
  // format: [4, 2],
}

const BatchListTable = ({
  item,
  manageUser,
  batchesLearner,
  onGetBatchesLearner,
  currentPage,
  totalPages,
  setCurrentPage,
  totalBatchesLearner,
}) => {
  const { ExportCSVButton } = CSVExport
  const [isExpanded, setIsExpanded] = useState(null)
  const params = useParams()
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState([])
  const toggle = () => setModal(!modal)
  const [viewData, setViewData] = useState("")
  const [data, setData] = useState([])

  const [active, setActive] = useState(false)
  const [enroll, setEnroll] = useState(false)
  const confirmLearnerStatus = () => setActive(!active)
  const confirmEnrollStatus = () => setActive(!active)
  const closeModal = () => setActive(false)
  const closeEnrollModal = () => setEnroll(false)

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{user?.id}</>,
        csvExport: false,
      },
      {
        dataField: "learnername",
        text: "Name",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.learnername}</div>
        ),
      },

      {
        dataField: "assignments",
        text: "Assignments",
        sort: true,
        formatter: (cellContent, user) => (
          <div>
            {user?.assignments}/{user?.assignmentsMax}
          </div>
        ),
      },
      {
        dataField: "assessments",
        text: "Assessments",
        sort: true,
        formatter: (cellContent, user) => (
          <div>
            {user?.assessments}/{user?.assessmentsMax}
          </div>
        ),
      },
      {
        dataField: "projects_total",
        text: "Projects",
        sort: true,
      },
      {
        dataField: "attendance",
        text: "Attendance",
        sort: true,
        formatter: (cellContent, user) => (
          <span>{user?.attendance?.toFixed(2)}%</span>
        ),
      },

      {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: (cellContent, user) => (
          <div
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              confirmLearnerStatus(user?.id)
              setData(user)

              setActive(true)
            }}
          >
            <div
              className={
                user?.status === true
                  ? "btn-status-active"
                  : "btn-status-inactive"
              }
            >
              {user?.status === true ? "Active" : "Inactive"}
            </div>
          </div>
        ),
      },

      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            <div className="me-2">
              <span
                onClick={() => {
                  setViewData(user)
                  toggle()
                }}
                className="text-muted ms-2"
              >
                <i className="mdi mdi-clipboard-account mdi-18px text-success" />
              </span>
              <span
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  setData(user)
                  setEnroll(true)
                }}
                className="text-muted ms-2"
              >
                <RxCrossCircled
                  style={{
                    fontSize: "17px",
                    color: "red",
                    marginBottom: "5px",
                  }}
                />
              </span>
            </div>
          </div>
        ),
      },
    ],
  }

  const handleDownloadPDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF()
    // Define table headers and data

    const headers = state.columns.map(item => {
      return item.text
    })

    const data = batchesLearner.map(item => {
      return [
        "",
        item.learnername,
        `${item.assignments} / ${item.assessmentsMax}`,
        `${item.assessments} / ${item.assessmentsMax}`,
        item.projects_total,
        `${item.attendance.toFixed(2)}% `,
        item?.status === true ? "Active" : "Inactive",
      ]
    })

    // Add the table to the PDF using the autotable plugin
    doc.autoTable({
      head: [headers],
      body: data,
    })

    // Save the PDF file
    doc.save("document.pdf")
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  const handleSearch = e => {
    const data = {
      search: e,
    }
    onGetBatchesLearner(data)
  }

  return (
    <div className="batches-home">
      <ReportCard modal={modal} toggle={toggle} viewData={viewData} />

      <LearnerStatus
        active={active}
        confirmLearnerStatus={confirmLearnerStatus}
        closeModal={closeModal}
        user={data}
        setActive={setActive}
        params={params}
        onGetBatchesLearner={onGetBatchesLearner}
      />
      <EnrollStatusModel
        active={enroll}
        confirmEnrollStatus={confirmEnrollStatus}
        closeModal={closeEnrollModal}
        user={data}
        setActive={setEnroll}
        params={params}
        onGetBatchesLearner={onGetBatchesLearner}
      />

      <ToolkitProvider
        key={isExpanded}
        keyField="id"
        columns={state?.columns}
        data={batchesLearner}
        exportCSV={{ onlyExportSelection: false, exportAll: true }}
      >
        {toolkitProps => (
          <>
            <Row>
              <Col md={6}>
                <div className="search-box">
                  <div className="app-search p-0">
                    <div className="position-relative mb-2">
                      <DeBounceSearch handleSearch={handleSearch} />
                      <span className="bx bx-search-alt" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="text-end">
                  {/* <Button color="secondary">Export</Button> */}
                  <UncontrolledDropdown className="me-2" direction="down">
                    <DropdownToggle caret color="primary">
                      Export <i className="mdi mdi-menu-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={handleDownloadPDF}>
                        Download as pdf
                      </DropdownItem>
                      <DropdownItem>
                        <ExportCSVButton {...toolkitProps.csvProps}>
                          Download as excel
                        </ExportCSVButton>
                      </DropdownItem>{" "}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Row>

            <Col xl="12">
              <div className="table-responsive">
                <h6 className="mt-3">Total Learners: {totalBatchesLearner}</h6>
                <BootstrapTable
                  keyField={"id"}
                  responsive
                  bordered={false}
                  striped={false}
                  defaultSorted={defaultSorted}
                  selectRow={selectRow}
                  classes={"table align-middle table-nowrap"}
                  headerWrapperClasses={"thead-light"}
                  {...toolkitProps.baseProps}
                  // pagination={paginationFactory({
                  //   current: currentPage,
                  //   totalPages: totalPages,
                  //   onPageChange: handlePageChange,
                  // })}
                  noDataIndication={"No data found"}
                />

                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={n => {
                    setCurrentPage(n)
                    // onGetBatchesLearner(n)
                  }}
                />

                {/* <DropdownPagination 
                current={currentPage}
                total={totalPages}
                onPageChange={n => {
                  setCurrentPage(n)
                  // onGetBatchesLearner(n)
                }}
                /> */}
              </div>
            </Col>
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

export default BatchListTable

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

  const [active, setActive] = useState(false)
  const confirmStatus = () => setActive(!active)
  const closeModal = () => setActive(false)

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
      // {
      //   dataField: "total",
      //   text: "Total",
      //   sort: true,
      //   // formatter: (cellContent, user) => (
      //   //   <div className="fw-bold">{user?.assessments

      //   //   }</div>
      //   // ),
      // },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: (cellContent, user) => (
          <div onClick={confirmStatus}>
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
              <div
                // to={`/report/${user?.id}`}
                onClick={() => {
                  setViewData(user)
                  toggle()
                }}
                className="text-muted ms-2"
              >
                <i className="mdi mdi-clipboard-account mdi-18px text-success" />
              </div>
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
    clickToSelect: true,
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  const handleSearch = e => {
    const data = {
      search: e,
    }
    onGetBatchesLearner(data)
    // const { Batches } = props
    // setState({ Batches })
  }

  return (
    <div className="batches-home">
      <ReportCard modal={modal} toggle={toggle} viewData={viewData} />

      <Status
        active={active}
        confirmStatus={confirmStatus}
        closeModal={closeModal}
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
                      <DropdownItem disabled>Download as pdf</DropdownItem>
                      <ExportCSVButton {...toolkitProps.csvProps}>
                        <DropdownItem>Download as excel</DropdownItem>{" "}
                      </ExportCSVButton>
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
                  pagination={paginationFactory()}
                  noDataIndication={"No data found"}
                />
                {/* <div>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>{currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={totalPages === currentPage}
                  >
                    Next
                  </button>
                </div> */}
              </div>
            </Col>
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

export default BatchListTable

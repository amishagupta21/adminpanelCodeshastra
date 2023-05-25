import React, { useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import Select, { components } from "react-select"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link } from "react-router-dom"
import "./liveCourses.css"
import ViewCoursesModal from "./ViewCoursesModal"
import CourseTable from "./CourseTable"
import paginationFactory from "react-bootstrap-table2-paginator"
import DatePicker from "react-datepicker"
import "./batchTable.css"
import BatchAccordion from "./BatchAccordion"
import AssignedBatches from "./AssignedBatches"
import ViewBatchesModal from "./ViewBatchesModal"

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

const BatchTable = ({
  item,
  usersCount,
  handleSearch,
  activeTab,
  manageUser,
  addStartDate,
  startDate,
  applyFilter,
  addEndDate,
  endDate,
}) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const [selectedDropdown, setSelectedDropdown] = useState("")
  const [dropdown, setDropdown] = useState([])
  const [modal, setModal] = React.useState(false)
  const [viewData, setViewData] = useState("")
  const [batchesModal, setBatchesModal] = useState(false)

  const assignBatch = () => {
    setBatchesModal(!batchesModal)
  }

  const toggle = () => setModal(!modal)

  // const [selectedValue, setSelectedValue] = useState([])

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{row?.id}</>,
      },
      {
        dataField: "name",
        text: "Batch",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.name}</div>
        ),
      },

      {
        dataField: "description",
        text: "Description",
        sort: true,
      },

      {
        dataField: "start_date",
        text: "Start Date",
        sort: true,
      },

      {
        dataField: "end_date",
        text: "End Date",
        sort: true,
      },
      {
        dataField: "SB",
        text: "Mentors",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="custom-batches">
            <batch className="green">SB</batch>
          </div>
        ),
      },
      {
        // dataField: "course_duration",
        text: "Assign Batch",
        sort: true,
        formatter: (cellContent, user) => (
          <Button
            onClick={assignBatch}
            color="success"
            outline
            className="assign-batch"
          >
            Assign
          </Button>
        ),
      },

      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            <div className="me-2">
              <i
                onClick={e => toggle(e, setViewData(user))}
                className="mdi mdi-eye font-size-16 text-primary"
              />
            </div>
          </div>
        ),
      },
    ],
  }

  const options = [
    { label: "Full Stack Web Developer(Full Time)", value: "fullStack" },
    { label: "Python Full Stack Web Developer", value: "pythonDeveloper" },
    { label: "Data Science Program", value: "dataScience" },
  ]

  const courseName = selectedOption => {
    // if (selectedDropdown.length === 0)
    setDropdown(oldItems => {
      return [...oldItems, selectedOption]
    })
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
  }

  return (
    <>
      {/* <ViewCoursesModal modal={modal} toggle={toggle} viewData={viewData} /> */}

      <ViewBatchesModal modal={modal} toggle={toggle} viewData={viewData} />

      <Row className="align-items-center">
        {batchesModal && <AssignedBatches />}

        <Col sm="6">
          <div className="app-search p-2">
            <h5>Batch List</h5>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="col-12">
          <>
            <ToolkitProvider
              key={isExpanded}
              keyField="_id"
              columns={state?.columns}
              data={item}
            >
              {toolkitProps => (
                <>
                  <Row className="mb-3">
                    <Col sm="2">
                      <div className="app-search p-0">
                        <div className="position-relative">
                          <DeBounceSearch handleSearch={handleSearch} />

                          <span className="bx bx-search-alt" />
                        </div>
                      </div>
                    </Col>
                    <Col sm="2"></Col>
                    <Col sm="2">
                      <Select
                        name="filter"
                        placeholder="Mentor"
                        //value={value}
                        components={{
                          Option,
                        }}
                        options={options}
                        onChange={courseName}
                      />
                    </Col>
                    <Col sm="2">
                      <div className="batch-date-picker">
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={startDate}
                          onChange={addStartDate}
                          placeholderText="Start Date"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          // maxDate={new Date()}
                          // minDate={new Date()}
                        />
                      </div>
                    </Col>
                    <Col sm="2">
                      <div className="batch-date-picker">
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={endDate}
                          showMonthDropdown
                          onChange={addEndDate}
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="End Date"
                          // maxDate={new Date()}
                          // minDate={new Date("2022/01/01")}
                        />
                      </div>
                    </Col>

                    <Col className="text-end" sm="2">
                      <Button
                        type="button"
                        className="btn mb-2 me-2"
                        onClick={applyFilter}
                      >
                        <i className="mdi mdi-filter me-1" /> Apply Filter
                      </Button>
                    </Col>
                    {/* {dropdown.length > 0 && (
                          <h6 className="filter-text d-flex align-items-baseline mt-3 mb-0">
                            Test Result:
                            <div className="filter-status mb-3 d-flex">
                              {dropdown.map(item => {
                                return (
                                  <>
                                    <div className="filter-chips me-3">
                                      {item.label}
                                      <span
                                        className="badge"
                                        onClick={() => courseNameDelete(item)}
                                      >
                                        X
                                      </span>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                          </h6>
                        )} */}
                  </Row>
                  <Col xl="12">
                    <div className="table-responsive">
                      <h6 className="mt-2">
                        Total Batches:&nbsp;
                        {usersCount?.count}{" "}
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
          </>
        </Col>
      </Row>
    </>
  )
}

export default BatchTable

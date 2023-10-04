import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Table,
  Progress,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"
import { DeBounceSearch } from "common/DeBounceSearch"
import Select from "react-select"
import BootstrapTable from "react-bootstrap-table-next"
import ResponsivePagination from "react-responsive-pagination"
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { del, post, patch, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import { Link, useParams, useHistory } from "react-router-dom"
import jsPDF from "jspdf"
import "jspdf-autotable"

const BatchesTable = ({
  ToolkitProvider,
  item,
  selectedCourseId,
  dashboard,
  manageUserLoader,
  usersCount,
  onGetBatchesList,
  data,
  editNewModal,
  setUser,
  setDeleteModalIsOpen,
  setSelectedCourseId,
  manageUser,
  confirmStatus,
  setData,
  setActive,
}) => {
  const { ExportCSVButton } = CSVExport
  const [isExpanded, setIsExpanded] = useState(null)
  const [courseIdData, setCourseIdData] = useState([])
  const [totalPages, setTotalPages] = useState()
  const history = useHistory()

  const [currentPage, setCurrentPage] = useState(1)
  const params = useParams()

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{user?.id}</>,
      },
      {
        dataField: "displayname",
        text: "Batch Name",
        sort: true,

        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.name}</div>
        ),
      },

      {
        dataField: "description",
        text: "Description",
        sort: true,
        formatter: (cellContent, user) => (
          <OverlayTrigger
            key={`tooltip-${user.id}`}
            placement="top"
            overlay={<Tooltip>{user?.description}</Tooltip>}
          >
            <div
              style={{
                maxWidth: "130px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "fit-content",
              }}
            >
              {user?.description}
            </div>
          </OverlayTrigger>
        ),
      },
      {
        dataField: "start_date",
        text: "Start Date",
        sort: true,
        formatter: (cellContent, user) => {
          const startFormatDate = new Date(user?.start_date)
            .toLocaleString()
            .split(",")

          return (
            <div>
              {" "}
              <span>{startFormatDate[0]}</span>
            </div>
          )
        },
      },
      {
        dataField: "end_date",
        text: "End Date",
        sort: true,
        formatter: (cellContent, user) => {
          const endFormatDate = new Date(user?.end_date)
            .toLocaleString()
            .split(",")
          return (
            <div>
              {" "}
              <span>{endFormatDate[0]}</span>
            </div>
          )
        },
      },
      {
        dataField: "course",
        text: "Course Name",
        sort: true,
      },
      {
        dataField: "unikodecourseid",
        text: "Course Id",
        sort: true,
      },

      {
        dataField: "lectures",
        text: "Lectures",
        sort: true,
      },

      {
        dataField: "learner_limit",
        text: "Learners",
        sort: true,
      },

      {
        dataField: "enable",
        text: "Status",
        sort: true,
        formatter: (cellContent, user) => (
          <div
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              confirmStatus(user?.id)
              setData(user)
              // fetchData()
              setActive(true)
              // handleEdit(user?.id)
            }}
          >
            <span
              className={
                user?.enable === true
                  ? "btn-status-active"
                  : "btn-status-inactive"
              }
            >
              {user?.enable === true ? "Active" : "Inactive"}
            </span>
          </div>
        ),
      },
      {
        dataField: "syncing_status",
        text: "Syncing Status",
        sort: true,
        formatter: (cellContent, user) => {
          if (user?.syncing_status === null) {
            return <span>{user?.syncing_status}</span>
          } else if (user?.syncing_status === "Complete") {
            return (
              <span className="btn-status-active">{user?.syncing_status}</span>
            )
          } else if (user?.syncing_status === "Incomplete") {
            return (
              <span className="btn-status-inactive">
                {user?.syncing_status}
              </span>
            )
          } else {
            return (
              <span className="btn-status-pending">{user?.syncing_status}</span>
            )
          }
        },
      },

      {
        dataField: "last_sync",
        text: "Last Sync",
        sort: true,
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, userData) => (
          <div className="d-flex">
            <div className="me-2">
              <div
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  editNewModal(userData?.id)
                }}
              >
                <i className="mdi mdi-pencil font-size-16 text-success" />
              </div>
            </div>

            <div className="me-2">
              <div
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  setUser(userData)
                  setDeleteModalIsOpen(true)
                }}
                className="text-muted"
              >
                <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
              </div>
            </div>
          </div>
        ),
      },
    ],
  }

  const handleChange = (selectedOption, e) => {
    setSelectedCourseId(selectedOption)
    // setSelectedCourseId(oldItem => {
    //   return [...oldItem, selectedOption]
    // })
  }

  useEffect(() => {
    const getNewBatches = async () => {
      const resp = await getCourseData(url.GET_MOODLE_COURSE)
      setCourseIdData(resp?.data)
      return resp
    }
    getNewBatches()
  }, [])

  const courseNameDelete = removeItem => {
    const deleteValue = selectedCourseId.filter(
      item => item?.value !== removeItem?.value && item
    )
    setSelectedCourseId(deleteValue)
  }

  useEffect(() => {
    if (selectedCourseId.length === 0) {
      onGetBatchesList(data)
    }
  }, [selectedCourseId])

  const handleFilter = e => {
    // const { onGetBatchesList } = props
    const data = {
      courseName: selectedCourseId.map(item => item.label).toLocaleString(),
    }
    onGetBatchesList(data)
  }

  const handleDownloadPDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF("landscape")
    // Define table headers and data

    const headers = state.columns.map(item => {
      return item.text
    })

    const data = manageUser.map(item => {
      return [
        "",
        item.name,
        item.description,
        item.start_date,
        item.end_date,
        item.course,
        item.unikodecourseid,
        item.lectures,
        item.learner_limit,
        item?.enable === true ? "Active" : "Inactive",
        item?.syncing_status,
        item?.last_sync,
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

  const handleSearch = e => {
    const { onGetBatchesList } = props
    const data = {
      search: e,
    }
    onGetBatchesList(data)
    // const { Batches } = props
    // setState({ Batches })
  }

  const options = courseIdData.map(item => ({
    value: item.courseid,
    label: item.coursename,
  }))

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      e.stopPropagation()
      history.push(
        `/batch-detail/edit/${row?.id}?unikodecourseid=${row?.unikodecourseid}`
      )
    },
  }

  const defaultSorted = [
    {
      dataField: "displayname",
      order: "asce",
    },
  ]

  useEffect(() => {
    onGetBatchesList({ id: params.id, page: currentPage })
  }, [currentPage])

  const handleClick = (row, isSelected, rowIndex, e) => {
    if (isSelected) {
      setClickedIds(prevClickedIds => [...prevClickedIds, row.id])
    } else {
      setClickedIds(prevClickedIds => prevClickedIds.filter(id => id != row.id))
    }
  }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    onSelect: handleClick,
  }

  useEffect(() => {
    setTotalPages(Math.ceil(usersCount / 10))
  }, [usersCount])

  return (
    <Card>
      <CardBody>
        <div className="mt-2 batches-home">
          <Row>
            <Col className="col-12">
              <>
                <ToolkitProvider
                  key={isExpanded}
                  keyField="id"
                  columns={state?.columns}
                  data={item || []}
                  exportCSV={{
                    onlyExportSelection: false,
                    exportAll: true,
                  }}
                >
                  {toolkitProps => (
                    <>
                      <Row>
                        <Col xl={2}>
                          <div className="search-box">
                            <div className="app-search p-0">
                              <div className="position-relative mb-2">
                                <DeBounceSearch handleSearch={handleSearch} />
                                <span className="bx bx-search-alt" />
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={10}>
                          <div className="box-r-btn">
                            <div className="ms-lg-3 mb-3">
                              <Input type="select">
                                <option value="Status">Status</option>
                                <option value="Not Started">Active</option>
                                <option value="In-Progress">Inactive</option>
                              </Input>
                            </div>

                            <div className="ms-lg-3 mb-3">
                              <Select
                                value={selectedCourseId}
                                onChange={handleChange}
                                options={options}
                                isMulti
                                placeholder="Select Course Name"
                                className="couserId-width"
                              />
                            </div>
                            <div className="ms-lg-3 mb-3">
                              {selectedCourseId.length > 0 ? (
                                <Button
                                  color="primary"
                                  className="btn-light-grey"
                                  onClick={handleFilter}
                                >
                                  <i className="mdi mdi-filter"></i> Apply
                                  Filter
                                </Button>
                              ) : (
                                <Button
                                  color="primary"
                                  className="btn-light-grey"
                                  disabled
                                >
                                  <i className="mdi mdi-filter"></i> Apply
                                  Filter
                                </Button>
                              )}
                            </div>
                            <div className="ms-lg-3 mb-3">
                              <UncontrolledDropdown
                                className="me-2"
                                direction="down"
                              >
                                <DropdownToggle caret color="primary">
                                  Export
                                  <i className="mdi mdi-menu-down"></i>
                                </DropdownToggle>
                                <DropdownMenu className="export-dropdown-item">
                                  <DropdownItem onClick={handleDownloadPDF}>
                                    Download as pdf
                                  </DropdownItem>
                                  <ExportCSVButton {...toolkitProps.csvProps}>
                                    Download as CSV
                                  </ExportCSVButton>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {selectedCourseId.length > 0 && (
                        <h6 className="filter-text d-flex align-items-baseline mt-3 mb-0">
                          Test Result: &nbsp;
                          <div className="filter-status mb-3 d-flex">
                            {selectedCourseId.map(item => {
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
                      )}
                      <Col xl="12">
                        <div className="table-responsive">
                          <h6 className="mt-2">
                            Total Batches: &nbsp;{dashboard?.totalBatch}
                          </h6>
                          <BootstrapTable
                            keyField={"id"}
                            // trClassName="clickable-row"
                            // onRowClick={onRowClick}
                            rowEvents={rowEvents}
                            responsive
                            bordered={false}
                            striped={false}
                            defaultSorted={defaultSorted}
                            selectRow={selectRow}
                            classes={"table align-middle table-nowrap"}
                            headerWrapperClasses={"thead-light"}
                            {...toolkitProps.baseProps}
                            // pagination={paginationFactory()}
                            noDataIndication={
                              manageUserLoader ? (
                                <div className="d-flex justify-content-center">
                                  <Spinner
                                    size=""
                                    color="primary"
                                    // style={{
                                    //   width: "3rem",
                                    //   height: "3rem",
                                    //   color: "#556ee6",
                                    // }}
                                  />
                                </div>
                              ) : (
                                "No data found"
                              )
                            }
                          />
                          <ResponsivePagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={n => {
                              setCurrentPage(n)
                            }}
                          />
                        </div>
                      </Col>
                    </>
                  )}
                </ToolkitProvider>
              </>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  )
}

export default BatchesTable

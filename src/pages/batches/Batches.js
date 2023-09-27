import React, { useState, useEffect } from "react"
import "../batches/batches.css"
import axios from "axios"

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
import { Link, useParams, useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"
import {
  getBatchesList,
  getDashboard,
  editNewBatch,
  getBatchApi,
  deleteBatches,
  getAllBatchesList,
} from "store/Batches/actions"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import BatchNewModal from "./BatchNewModal"
import DeleteModel from "components/DeleteModal"
import ModalDelete from "components/Common/ModalDelete"
import DeleteModal from "components/Common/DeleteModal"
import EditNewModal from "./EditNewModal"
import { del, post, patch, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import tosterMsg from "components/Common/toster"
import Status from "./Status"
import Select from "react-select"
import "./batches.css"
import jsPDF from "jspdf"
import "jspdf-autotable"
import Nav from "react-bootstrap/Nav"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"
import Unikaksha from "./Unikaksha"
import FilterBatches from "./FilterBatches"

const Batches = props => {
  const axios = require("axios")
  const params = useParams()
  const {
    manageUser,
    usersCount,
    dashboard,
    batchApi,
    onGetBatchesList,
    onGetDashboard,
    onGetBatchesApi,
    createNewBatch,
    manageUserLoader,
    onGetAllBatchesList,
  } = props
  const [item, setItem] = useState(manageUser)
  const [isExpanded, setIsExpanded] = useState(null)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [editModal, setEditModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clickedIds, setClickedIds] = useState([])
  const { ExportCSVButton } = CSVExport
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const [courseIdData, setCourseIdData] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState([])
  const [sendId, setSendId] = useState([])
  const [isSelected, setIsSelected] = useState("first")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()

  const [unikaksha, setUnikaksha] = useState(false)

  console.log(selectedCourseId, "/////////selectedCourseId")

  const openUnikasha = () => {
    setUnikaksha(!unikaksha)
  }

  console.log(courseIdData, "////////courseIdData")

  // const[currBatch , setCurrBatch] = useState(onGetAllusersCountList)
  const [activeTab, setActiveTab] = useState("true")

  const confirmStatus = () => {
    setActive(true)
  }

  useEffect(() => {
    setTotalPages(Math.ceil(dashboard?.totalBatch / 10))
  }, [dashboard?.totalBatch])

  const closeModal = () => setActive(false)

  const editNewModal = id => {
    onGetBatchesApi(id)
    setEditModal(true)
  }

  const handleDeleteUser = () => {
    if (user !== undefined) {
      const updatedUsers = users.filter(e => e.id !== user.id)
      setUsers(updatedUsers)

      setDeleteModalIsOpen(false)
    }
  }

  const [modal, setModal] = useState(false)
  const toggle = e => {
    setModal(!modal)
    e.stopPropagation()
    e.preventDefault()
  }
  const history = useHistory()

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  useEffect(() => {
    onGetBatchesList({ id: params.id, page: currentPage })
  }, [currentPage])

  useEffect(() => {
    onGetDashboard()
  }, [])

  const defaultSorted = [
    {
      dataField: "displayname",
      order: "asce",
    },
  ]

  const onClickDelete = async id => {
    const resp = await del(url.GET_DELETE_BATCHES + `${user?.id}`)
    const finalItem = item.filter(item => item.id !== user?.id)
    setItem(finalItem)
    setDeleteModalIsOpen(false)
    return resp
  }

  const customComparator = (a, b) => {
    const aNum = parseInt(a.name.replace(/[^0-9]/g, ""))
    const bNum = parseInt(b.name.replace(/[^0-9]/g, ""))

    if (aNum !== bNum) {
      return aNum - bNum
    } else {
      return a.name.localeCompare(b.name)
    }
  }

  const sorting = () => {
    manageUser.sort((a, b) => a.name.localeCompare(b.name))

    setItem(manageUser)
  }

  useEffect(() => {
    setItem(sorting)
  }, [manageUser])

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

  const handleEdit = async data => {
    try {
      // Make the edit request
      const response = await patch(url.GET_STATUS + `/${data?.id}`, {
        enable: !data?.enable,
      })

      setActive(false)
      onGetBatchesList()
    } catch (error) {}
  }

  const handleClick = (row, isSelected, rowIndex, e) => {
    if (isSelected) {
      setClickedIds(prevClickedIds => [...prevClickedIds, row.id])
    } else {
      setClickedIds(prevClickedIds => prevClickedIds.filter(id => id != row.id))
    }
  }

  // const handleClick = id => {filteredArr
  //   setClickedIds(prevClickedIds => [...prevClickedIds, id])
  // }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    onSelect: handleClick,
  }

  const cancelNewModal = () => {
    setEditModal(false)
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      e.stopPropagation()
      history.push(
        `/batch-detail/edit/${row?.id}?unikodecourseid=${row?.unikodecourseid}`
      )
    },
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

  const syncNow = async () => {
    setIsLoading(true)
    await axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC}`, {
        batchIdArray: clickedIds,
      })
      .then(res => {
        tosterMsg(res?.data?.message)
      })
      .catch(err => {})

    await axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC_DETAIL}`, {
        batchIdArray: clickedIds,
      })
      .then(res => {
        tosterMsg(res?.data?.message)
      })
      .catch(err => {})
    await axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC_GRADES}`, {
        batchIdArray: clickedIds,
      })
      .then(res => {
        tosterMsg(res?.data?.message)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const getNewBatches = async () => {
      const resp = await getCourseData(url.GET_MOODLE_COURSE)
      console.log(resp, "////////resp")
      setCourseIdData(resp?.data)
      return resp
    }
    getNewBatches()
  }, [])

  const handleChange = (selectedOption, e) => {
    setSelectedCourseId(selectedOption)
    // setSelectedCourseId(oldItem => {
    //   return [...oldItem, selectedOption]
    // })
  }

  const courseNameDelete = removeItem => {
    const deleteValue = selectedCourseId.filter(
      item => item?.value !== removeItem?.value && item
    )
    setSelectedCourseId(deleteValue)
  }

  const options = courseIdData.map(item => ({
    value: item.courseid,
    label: item.coursename,
  }))

  useEffect(() => {
    if (selectedCourseId.length === 0) {
      onGetBatchesList(data)
    }
  }, [selectedCourseId])

  const handleFilter = e => {
    const { onGetBatchesList } = props
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
  const filterData = clickedBatch => {
    setActiveTab(clickedBatch)
    const filteredBatch = manageUser.filter(item => {
      return item.enable === clickedBatch
    })

    setItem(filteredBatch)
  }

  const FilterPastBatches = clickedBatch => {
    setActiveTab(clickedBatch)

    let filteredPast = manageUser.filter(item => {
      return new Date(item.end_date).getTime() < new Date().getTime()
    })
    setItem(filteredPast)
  }

  // const filterNumContainingBatch = clickedBatch => {
  //   setActiveTab(clickedBatch)

  //   console.log("filterNumContainingBatch")
  // }

  // function getLastIndexNumber(str) {
  //   // Extract the number at the last index of the string
  //   const match = str.match(/[0-9]+$/)
  //   return match ? parseInt(match[0]) : null
  // }

  const filterNums = clickedBatch => {
    let numsarr = []
    // Example array of strings
    // const array = ['apple 5!', 'banana 3?', 'cherry 9*', 'date 2$'];

    // Sort the array based on the numbers at the last index\\
    setActive(clickedBatch)

    // const sortedArray = item.sort((a, b) => {
    //   const numA = getLastIndexNumber(a)
    //   const numB = getLastIndexNumber(b)
    //   return numA - numB
    // })

    manageUser.map(item => numsarr.push(item.name))

    console.log(numsarr)
  }

  return (
    <div className="pag e-content batches-home">
      <Status
        active={active}
        confirmStatus={confirmStatus}
        closeModal={closeModal}
        handleEdit={handleEdit}
        user={data}
      />
      <DeleteModal
        show={deleteModalIsOpen}
        onDeleteClick={handleDeleteUser}
        onClickDelete={onClickDelete}
        onCloseClick={() => setDeleteModalIsOpen(false)}
      />
      {editModal && (
        <EditNewModal
          editNewModal={editNewModal}
          editModal={editModal}
          batchApi={batchApi}
          cancelNewModal={cancelNewModal}
          setEditModal={setEditModal}
          onGetBatchesList={onGetBatchesList}
        />
      )}

      <Row>
        <Col md={12}>
          <h4 className="mb-3">BATCHES</h4>
          <FilterBatches
            setIsSelected={setIsSelected}
            onGetBatchesList={onGetBatchesList}
            isSelected={isSelected}
            filterData={filterData}
            dashboard={dashboard}
            FilterPastBatches={FilterPastBatches}
          />

          <Row>
            <Col>
              <div className="d-flex justify-content-between my-2">
                {/* <div>Clicked IDs: {clickedIds.join(", ")}</div> */}
                <h4>ALL BATCHES</h4>
                <span style={{ display: "flex" }}>
                  <Button
                    color="success"
                    className="rounded-pill mb-3 me-3 px-4"
                    onClick={openUnikasha}
                  >
                    Unikode Login
                  </Button>
                  {isLoading ? (
                    <Button
                      color="primary"
                      className="rounded-pill mb-3 me-3 px-4"
                      disabled
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Spinner style={{ width: "1rem", height: "1rem" }} />
                      syncing...
                    </Button>
                  ) : (
                    <Button
                      disabled={clickedIds.length === 0}
                      color="primary"
                      className="rounded-pill mb-3 me-3 px-4"
                      onClick={syncNow}
                    >
                      Sync Now
                    </Button>
                  )}
                  <Button
                    color="success"
                    className="rounded-pill mb-3"
                    onClick={toggle}
                  >
                    + Create New Batch
                  </Button>
                </span>

                <BatchNewModal
                  modal={modal}
                  toggle={toggle}
                  setModal={setModal}
                  createNewBatch={createNewBatch}
                  onGetBatchesList={onGetBatchesList}
                  setItem={setItem}
                  item={item}
                  // createBatches={createBatches}
                />

                <Unikaksha
                  setUnikaksha={setUnikaksha}
                  openUnikasha={openUnikasha}
                  unikaksha={unikaksha}
                />
              </div>
            </Col>
          </Row>
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
                                      <DeBounceSearch
                                        handleSearch={handleSearch}
                                      />
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
                                      <option value="Not Started">
                                        Active
                                      </option>
                                      <option value="In-Progress">
                                        Inactive
                                      </option>
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
                                        <DropdownItem
                                          onClick={handleDownloadPDF}
                                        >
                                          Download as pdf
                                        </DropdownItem>
                                        <ExportCSVButton
                                          {...toolkitProps.csvProps}
                                        >
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
                                            onClick={() =>
                                              courseNameDelete(item)
                                            }
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
        </Col>
      </Row>
    </div>
  )
}

Batches.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Batches: PropTypes.array,
}

const mapStateToProps = ({ Batches, state, count }) => {
  return {
    manageUser: Batches?.manageUser,
    manageUserLoader: Batches?.manageUserLoader,
    usersCount: Batches?.count,
    dashboard: Batches?.dashboard,
    userRoles: Batches?.roles,
    batchApi: Batches?.batchApi,
    createNewBatch: Batches?.createNewBatch,
    // deleteData: false,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetBatchesList: data => dispatch(getBatchesList(data)),
  onGetAllBatchesList: data => dispatch(getAllBatchesList(data)),
  onGetBatchesApi: data => dispatch(getBatchApi(data)),
  onGetDashboard: data => dispatch(getDashboard(data)),
  onGetDeleteBatches: id => dispatch(deleteBatches(id)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batches)

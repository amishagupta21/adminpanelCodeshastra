import React, { useState, useEffect } from "react"
import "../batches/batches.css"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
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
import { connect } from "react-redux"
import { getBatchesList, getDashboard } from "store/Batches/actions"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import BatchNewModal from "./BatchNewModal"

const Batches = props => {
  const params = useParams()
  const { manageUser, usersCount, dashboard } = props
  const [item, setItem] = useState(manageUser)
  const [isExpanded, setIsExpanded] = useState(null)

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
    const { onGetBatchesList, onGetDashboard } = props

    onGetBatchesList()
    onGetDashboard()
  }, [])

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
          <div className="fw-bold">{user?.displayname}</div>
        ),
      },

      {
        dataField: "summary",
        text: "Description",
        sort: true,
      },
      {
        dataField: "response",
        text: "Start Date",
        sort: true,
        formatter: (cellContent, user) => {
          var newDate = new Date(user?.startdate * 1000)
          var startDate = newDate.toLocaleDateString()
          return (
            <div>
              <span>{startDate}</span>
            </div>
          )
        },
      },
      {
        dataField: "enddate",
        text: "End Date",
        sort: true,
        formatter: (cellContent, user) => {
          var date = new Date(user?.enddate * 1000)
          var endDate = date.toLocaleDateString()
          return (
            <div>
              <span>{endDate}</span>
            </div>
          )
        },
      },
      {
        dataField: "shortname",
        text: "Course Name",
        sort: true,
      },
      // {
      //   dataField: "lectures",
      //   text: "Lectures",
      //   sort: true,
      // },
      {
        dataField: "numsections",
        text: "Learners",
        sort: true,
      },

      {
        dataField: "status",
        text: "Status",
        sort: true,
        formatter: (cellContent, user) => (
          // Active css className="btn-status-active"
          // Inactive css className="btn-status-inactive"
          <div>
            <span
              className={
                user?.status === 0 ? "btn-status-inactive" : "btn-status-active"
              }
            >
              {user?.status === 0 ? "Inactive" : "Active"}
            </span>
          </div>
        ),
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            {/* <div className="me-2">
              <Link to="/">
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </Link>
            </div> */}
            <div className="me-2">
              <Link className="text-muted">
                <i
                  onClick={toggle}
                  className="mdi mdi-pencil font-size-16 text-success"
                />
              </Link>
            </div>
            <div className="me-2">
              <Link to="/" className="text-muted">
                <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
              </Link>
            </div>
          </div>
        ),
      },
    ],
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      e.stopPropagation()

      history.push(`/batch-detail/edit/${row?.id}`)
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

  // const createBatches = event => {
  //   event.preventDefault()
  //   const { onCreateNewBatch } = props
  //   onCreateNewBatch({
  //       name: item?.name,
  //       description: item?.description,
  //       course: item?.course,
  //       variant_type: full time,
  //       class_link: www.google.meet/saq-faw-brs,
  //       mentors: [
  //           28a6216b-4ac6-4398-8766-f0d274e56afc
  //       ],
  //       learner_limit: 23,
  //       start_date: 2023-06-20,
  //       end_date: 2023-06-21,
  //       batch_schedule: {
  //           name: Batch Schedule,
  //           value: [
  //               {
  //                   day: 4,
  //                   start_time: 2023-03-21T06:58:58.648Z,
  //                   end_time: 2023-03-21T07:58:58.648Z
  //               },
  //               {
  //                   day: 5,
  //                   start_time: 2023-03-21T06:58:58.648Z,
  //                   end_time: 2023-03-21T07:58:58.648Z
  //               },
  //               {
  //                   day: 2,
  //                   start_time: 2023-03-21T06:58:58.648Z,
  //                   end_time: 2023-03-22T13:58:58.648Z
  //               },
  //               {
  //                   day: 3,
  //                   start_time: 2023-03-21T11:58:58.648Z,
  //                   end_time: 2023-03-21T13:58:58.648Z
  //               }
  //           ]
  //       }
  //   })
  // }

  // const onRowClick = (e, row, rowIndex) => {
  //   history.push(`/batch-list/edit/${user?.id}`)
  // }

  return (
    <div className="page-content batches-home">
      <Row>
        <Col md={12}>
          <h4 className="mb-3">BATCHES</h4>
          <Row>
            <Col>
              <div className="batches-box">
                <Card style={{ background: "#E5E9FF" }}>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">All Batches</p>
                        <p className="score">{dashboard?.totalBatch}</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Active Batches</p>
                        <p className="score">{dashboard?.activeBatch}</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Inactive Batches</p>
                        <p className="score">{dashboard?.disableBatch}</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Past Batches</p>
                        <p className="score">{dashboard?.postBatch}</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Ending This Week</p>
                        <p className="score">{dashboard?.endThisWeek}</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex justify-content-between my-2">
                <h4>ALL BATCHES</h4>
                <span>
                  <Button
                    color="primary"
                    className="rounded-pill mb-3 me-3 px-4"
                  >
                    Synch Now
                  </Button>
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
                  // createBatches={createBatches}
                />
              </div>
            </Col>
          </Row>
          <Card>
            <CardBody>
              {/* <div className="d-flex justify-content-between my-4">
                <h4>ALL BATCHES</h4>
                <span>
                <Button
                  color="success"
                  className="rounded-pill mb-3 me-3">
                  + Add Synchronized
                </Button>
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
                  createBatches={createBatches}
                />
              </div> */}
              <div className="mt-2 batches-home">
                <Row>
                  <Col className="col-12">
                    <>
                      <ToolkitProvider
                        key={isExpanded}
                        keyField="_id"
                        columns={state?.columns}
                        data={item || []}
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
                                        Not Started
                                      </option>
                                      <option value="In-Progress">
                                        In-Progress
                                      </option>
                                      <option value="Completed">
                                        Completed
                                      </option>
                                      <option value="Archived">Archived</option>
                                    </Input>
                                  </div>

                                  <div className="ms-lg-3 mb-3">
                                    <Input type="select">
                                      <option value="Course Name">
                                        Course Name{" "}
                                      </option>
                                      <option value="Full Stack Web Developer">
                                        Full Stack Web Developer
                                      </option>
                                      <option value="Full Stack Web Developer">
                                        Full Stack Web Developer
                                      </option>
                                      <option value="Full Stack Web Developer">
                                        Full Stack Web Developer
                                      </option>
                                    </Input>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Button
                                      color="primary"
                                      className="btn-light-grey"
                                    >
                                      <i className="mdi mdi-filter"></i> Apply
                                      Fillter
                                    </Button>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Input type="select">
                                      <option value="Export">Export </option>
                                      <option value="Export as pdf">
                                        Export as pdf
                                      </option>
                                      <option value="Export as excel">
                                        Export as excel
                                      </option>
                                    </Input>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Col xl="12">
                              <div className="table-responsive">
                                <h6 className="mt-2">
                                  Total Batches: &nbsp;{manageUser?.length}
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
    usersCount: Batches?.count.count,
    dashboard: Batches?.dashboard,
    userRoles: Batches?.roles,
    // deleteData: false,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetBatchesList: data => dispatch(getBatchesList(data)),
  onGetDashboard: data => dispatch(getDashboard(data)),
  onCreateNewBatch: data => dispatch(createNewBatch(data)),

  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batches)

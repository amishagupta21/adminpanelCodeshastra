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
} from "store/Batches/actions"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import BatchNewModal from "./BatchNewModal"
import DeleteModel from "components/DeleteModal"
import ModalDelete from "components/Common/ModalDelete"
import DeleteModal from "components/Common/DeleteModal"
import EditNewModal from "./EditNewModal"
import { del, post } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

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
  } = props
  const [item, setItem] = useState(manageUser)
  const [isExpanded, setIsExpanded] = useState(null)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [editModal, setEditModal] = useState(false)

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
    onGetBatchesList()
    onGetDashboard()
  }, [])

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const onClickDelete = async id => {
    const resp = await del(url.GET_DELETE_BATCHES + `${user?.id}`)
    const finalItem = item.filter(item => item.id !== user?.id)
    setItem(finalItem)
    setDeleteModalIsOpen(false)
    return resp
  }

  // const onClickDelete = () => {
  //   axios({
  //     method: "DELETE",
  //     url: `https://lms.unikaksha.dev/api/lms/admin/batch/${user?.id}`,
  //     data: user,
  //   })
  //     .then(res => {
  //       const finalItem = item.filter(item => item.id !== user?.id)
  //       setItem(finalItem)
  //       setDeleteModalIsOpen(false)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
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
            overlay={<Tooltip>{cellContent}</Tooltip>}
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
              {cellContent}
            </div>
          </OverlayTrigger>
        ),

        // formatter: (cellContent, user) => (
        //   <div
        //     dangerouslySetInnerHTML={{
        //       __html: user?.summary,
        //     }}
        //   />
        // ),
      },
      {
        dataField: "start_date",
        text: "Start Date",
        sort: true,
        // formatter: (cellContent, user) => {
        //   var newDate = new Date(user?.startdate * 1000)
        //   var startDate = newDate.toLocaleDateString()
        //   return (
        //     <div>
        //       <span>{startDate}</span>
        //     </div>
        //   )
        // },
      },
      {
        dataField: "end_date",
        text: "End Date",
        sort: true,
        // formatter: (cellContent, user) => {
        //   var date = new Date(user?.enddate * 1000)
        //   var endDate = date.toLocaleDateString()
        //   return (
        //     <div>
        //       <span>{endDate}</span>
        //     </div>
        //   )
        // },
      },
      {
        dataField: "course",
        text: "Course Name",
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

  const cancelNewModal = () => {
    setEditModal(false)
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

  const onRowClick = (e, row, rowIndex) => {
    history.push(`/batch-list/edit/${user?.id}`)
  }

  const syncNow = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC}`, "")
      .then(res => {
        console.log("res", res)
      })
      .catch(err => {
        console.log("err", err)
      })

    axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC_GRADES}`, "")
      .then(res => {
        console.log("res", res)
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  return (
    <div className="page-content batches-home">
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
                    onClick={syncNow}
                  >
                    Sync Now
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
                  setModal={setModal}
                  createNewBatch={createNewBatch}
                  onGetBatchesList={onGetBatchesList}
                  setItem={setItem}
                  item={item}
                  // createBatches={createBatches}
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
    batchApi: Batches?.batchApi,
    createNewBatch: Batches?.createNewBatch,
    // deleteData: false,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetBatchesList: data => dispatch(getBatchesList(data)),
  onGetBatchesApi: data => dispatch(getBatchApi(data)),
  onGetDashboard: data => dispatch(getDashboard(data)),
  onGetDeleteBatches: id => dispatch(deleteBatches(id)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batches)

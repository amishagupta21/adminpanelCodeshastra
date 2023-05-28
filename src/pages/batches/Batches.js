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
} from "reactstrap"
import { Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getBatchesList } from "store/Batches/actions"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"

const Batches = props => {
  const params = useParams()
  const { manageUser, usersCount } = props
  const [item, setItem] = useState(manageUser)
  const [isExpanded, setIsExpanded] = useState(null)

  console.log(props, "//////props")

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  useEffect(() => {
    const { onGetBatchesList } = props

    onGetBatchesList(params.id)
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
        formatter: (cellContent, user) => <>{row?.id}</>,
      },
      {
        dataField: "name",
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
        dataField: "course_duration",
        text: "Progress",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="pe-4">
            <span>{user?.progress}</span>
            <Progress value={user?.progress} animated></Progress>
          </div>
        ),
      },
      {
        dataField: "course_duration",
        text: "Status",
        sort: true,
        formatter: (cellContent, user) => (
          <FormGroup switch>
            <Input
              type="switch"
              name="enable"
              checked={user?.enable}
              // checked={state}
              // onClick={() => {
              //   setState(!state)
              // }}
            />
          </FormGroup>
        ),
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            {/* <DropdownToggle className="card-drop" tag="a">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle> */}
            {/* <DropdownMenu className="dropdown-menu-end"> */}
            <div className="me-2">
              <i
                onClick={e => toggle(e, setViewData(user))}
                className="mdi mdi-eye font-size-16 text-primary"
              />
            </div>
            <div className="me-2">
              <Link to={`/courses/edit/${user.id}`} className="text-muted">
                <i className="mdi mdi-pencil font-size-16 text-success" />
              </Link>
            </div>
            <div className="me-2">
              <Link to={`/courses/edit/${user.id}`} className="text-muted">
                <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
              </Link>
            </div>

            {/* </DropdownMenu> */}
          </div>
        ),
      },
    ],
  }

  const handleSearch = e => {
    const { onGetBatchesList } = props
    const data = {
      search: e,
    }
    onGetBatchesList(data)
    const { Batches } = props
    setState({ Batches })
  }

  return (
    <div className="page-content batches-home">
      <Row>
        <Col md={12}>
          <h4>BATCHES</h4>

          <Row>
            <Col sm={6} md={3}>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">All Batches</p>
                        <p className="score">60</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Active Batches</p>
                        <p className="score">30</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Completed Batches</p>
                        <p className="score">24</p>
                      </div>
                      <div className="icon-circle">
                        <span className="mdi mdi-account-circle" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="batches-box">
                <Card>
                  <CardBody>
                    <div className="box">
                      <div>
                        <p className="box-heading">Up Coming Batches</p>
                        <p className="score">39</p>
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
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between my-4">
                <h4>ALL BATCHES</h4>
                <Button color="success" className="rounded-pill mb-3">
                  + Create New Batch
                </Button>
              </div>
              <div className="mt-2 batches-home">
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
                            <Row>
                              <Col xl={2}>
                                <div className="search-box">
                                  <div className="app-search p-0">
                                    <div className="position-relative mb-2">
                                      {/* <input
                                        className="form-control mb-3"
                                        type="text"
                                        onChange={handleSearch}
                                        placeholder="Search by Batch name"
                                      /> */}
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
                                      <option selected>Status</option>
                                      <option>Not Started</option>
                                      <option>In-Progress</option>
                                      <option>Completed</option>
                                      <option>Archived</option>
                                    </Input>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Input type="select">
                                      <option selected>Progress</option>
                                      <option>Completed</option>
                                      <option>In-Progress</option>
                                    </Input>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Input type="select">
                                      <option selected>Course Name </option>
                                      <option>Status - 1</option>
                                      <option>Status - 2</option>
                                    </Input>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Button className=" btn-grey">
                                      <i className="mdi mdi-filter"></i> Apply
                                      Fillter
                                    </Button>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Input type="select">
                                      <option selected>Export </option>
                                      <option>Export as pdf</option>
                                      <option>Export as excel</option>
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

const mapStateToProps = ({ Batches, state, count }) => (
  console.log(Batches, "////////Batches"),
  {
    manageUser: Batches?.manageUser,
    usersCount: Batches?.count,
    userRoles: Batches?.roles,
    // deleteData: false,
  }
)

const mapDispatchToProps = dispatch => ({
  onGetBatchesList: data => dispatch(getBatchesList(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batches)

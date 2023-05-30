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

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

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
              <Link to="/">
                <i className="mdi mdi-eye font-size-16 text-primary" />
              </Link>
            </div>
            <div className="me-2">
              <Link to={`/batch-list/edit/${user?.id}`} className="text-muted">
                <i className="mdi mdi-pencil font-size-16 text-success" />
              </Link>
            </div>
            <div className="me-2">
              <Link to="/" className="text-muted">
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
                <Button
                  color="success"
                  className="rounded-pill mb-3"
                  onClick={toggle}
                >
                  + Create New Batch
                </Button>

                <Modal
                  isOpen={modal}
                  toggle={toggle}
                  fade={false}
                  centered
                  size="lg"
                >
                  <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label>Batch Name</Label>
                          <Input type="text" placeholder="Batch_10" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label>Description</Label>
                          <Input type="text" placeholder="Freshers Only" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label>Course</Label>
                          <Input type="select">
                            <option selected>Full Stack Web Developer</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label>Variant Type</Label>
                          <Input type="select">
                            <option selected>Full Time</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Class Link</Label>
                          <Input
                            type="text"
                            placeholder="www.google.meet/saq-faw-brs"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="batch-accord">
                        <UncontrolledAccordion
                          defaultOpen={["1", "2"]}
                          stayOpen
                        >
                          <AccordionItem className="mb-3">
                            <AccordionHeader targetId="1">
                              Batch Configuration
                              <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                            </AccordionHeader>
                            <AccordionBody accordionId="1">
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th>Mentor</th>
                                    <th>Learners Limit</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <FormGroup className="select_box border-0">
                                        <Input
                                          name="select"
                                          type="select"
                                          className="border-0"
                                        >
                                          <option selected>2 select</option>
                                          <option>1</option>
                                          <option>2</option>
                                        </Input>
                                      </FormGroup>
                                    </td>
                                    <td>
                                      <FormGroup>
                                        <Input
                                          placeholder="75"
                                          type="text"
                                          className="bg-grey border-0"
                                        />
                                      </FormGroup>
                                    </td>
                                    <td>
                                      <Input type="date" />
                                    </td>
                                    <td>
                                      <Input type="date" />
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </AccordionBody>
                          </AccordionItem>
                          <AccordionItem>
                            <AccordionHeader targetId="2">
                              Batch Schedule
                              <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                            </AccordionHeader>
                            <AccordionBody accordionId="2">
                              <Table responsive>
                                <thead>
                                  <tr>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Days</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="accordionItem-table">
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            className="me-2 bg-grey border-0"
                                            style={{ width: "64px" }}
                                            placeholder="09:00"
                                          />
                                        </FormGroup>
                                        <FormGroup className="select_box border-0">
                                          <Input
                                            name="select"
                                            type="select"
                                            style={{ width: "64px" }}
                                            className="border-0"
                                          >
                                            <option selected>AM</option>
                                            <option>PM</option>
                                          </Input>
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            className="me-2 bg-grey border-0"
                                            style={{ width: "64px" }}
                                            placeholder="05:00"
                                          />
                                        </FormGroup>
                                        <FormGroup className="select_box border-0">
                                          <Input
                                            name="select"
                                            type="select"
                                            style={{ width: "64px" }}
                                          >
                                            <option>AM</option>
                                            <option selected>PM</option>
                                          </Input>
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <FormGroup check inline>
                                          <Input type="checkbox" checked />
                                          <Label check>Sun</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" checked />
                                          <Label check>Mon</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" checked />
                                          <Label check>Tue</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Wed</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Thurs</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Fri</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Sat</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Sun</Label>
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="me-3">
                                        <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      style={{
                                        paddingLeft: "0px",
                                        paddingRight: "0px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          height: "1px",
                                          background: "#CED4DA",
                                        }}
                                      ></div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            className="me-2 bg-grey border-0"
                                            style={{ width: "64px" }}
                                            placeholder="09:00"
                                          />
                                        </FormGroup>
                                        <FormGroup className="select_box border-0">
                                          <Input
                                            name="select"
                                            type="select"
                                            style={{ width: "64px" }}
                                            className="border-0"
                                          >
                                            <option selected>AM</option>
                                            <option>PM</option>
                                          </Input>
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            className="me-2 bg-grey border-0"
                                            style={{ width: "64px" }}
                                            placeholder="05:00"
                                          />
                                        </FormGroup>
                                        <FormGroup className="select_box border-0">
                                          <Input
                                            name="select"
                                            type="select"
                                            style={{ width: "64px" }}
                                            className="border-0"
                                          >
                                            <option>AM</option>
                                            <option selected>PM</option>
                                          </Input>
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <FormGroup check inline>
                                          <Input type="checkbox" checked />
                                          <Label check>Sun</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" checked />
                                          <Label check>Mon</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" checked />
                                          <Label check>Tue</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Wed</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Thurs</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Fri</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Sat</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                          <Input type="checkbox" />
                                          <Label check>Sun</Label>
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="me-3">
                                        <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Row>
                                <Col md={12}>
                                  <button className="px-4 ms-3 create-new-appointment">
                                    Add A Schedule +
                                  </button>
                                </Col>
                              </Row>
                            </AccordionBody>
                          </AccordionItem>
                        </UncontrolledAccordion>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      outline
                      onClick={toggle}
                      className="px-5"
                    >
                      Cancel
                    </Button>
                    <Button color="primary" onClick={toggle} className="px-5">
                      Create
                    </Button>
                  </ModalFooter>
                </Modal>
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
                                      <option selected>Course Name </option>
                                      <option>Full Stack Web Developer</option>
                                      <option>Full Stack Web Developer</option>
                                      <option>Full Stack Web Developer</option>
                                    </Input>
                                  </div>
                                  <div className="ms-lg-3 mb-3">
                                    <Button className="btn btn-secondary">
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

const mapStateToProps = ({ Batches, state, count }) => ({
  manageUser: Batches?.manageUser,
  usersCount: Batches?.count,
  userRoles: Batches?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetBatchesList: data => dispatch(getBatchesList(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batches)

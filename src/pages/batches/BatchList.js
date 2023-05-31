import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Progress,
} from "reactstrap"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import BatchListTable from "./BatchListTable"
import GradeBook from "./GradeBook"
import Status from "./Status"
import BatchProgress from "./BatchProgress"
import CompletionStatus from "./CompletionStatus"
import BatchLearner from "./BatchLearner"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import BatchNewModal from "./BatchNewModal"

const BatchList = () => {
  const [key, setKey] = useState("tab")
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  return (
    <div className="page-content batches-list">
      <div className="d-flex justify-content-between">
        <div>
          <Link to="/batch">
            <i className="mdi mdi-chevron-left"></i> Batch List
          </Link>
        </div>
        {/* <div>Batch List / Batch Information</div> */}
        <div>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/batch">Batch List</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Batch Information</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <Col md={6}>
          <h4>BATCH INFORMATION</h4>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-end">
            <Button color="success" onClick={toggle} className="mb-3 ms-2">
              Duplicate Batch
            </Button>
            <BatchNewModal modal={modal} toggle={toggle} />
            <Button color="success" className="mb-3 ms-2">
              Edit Batch
            </Button>
            <UncontrolledDropdown className="mb-3 ms-2">
              <DropdownToggle caret color="primary">
                More <i className="mdi mdi-dots-vertical"></i>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <i className="mdi mdi-send text-success"></i> Send
                  Notification
                </DropdownItem>
                <DropdownItem>
                  <i className="mdi mdi-delete text-danger"></i> Delete Batch
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <BatchLearner />
          <BatchProgress />
          <CompletionStatus />
        </Col>
        <Col md={7}>
          <Card>
            <CardBody>
              <div>
                <Tabs activeKey={key} onSelect={k => setKey(k)}>
                  <Tab eventKey="tab" title="Learners">
                    <Row>
                      <Col md={12} className="text-end">
                        <Button color="success" className="rounded-pill mb-3">
                          + Add New Learner
                        </Button>
                        <div className="text-start">
                          <h4>Learners</h4>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="search-box">
                          <div className="app-search p-0">
                            <div className="position-relative mb-2">
                              <input
                                className="form-control mb-3"
                                type="text"
                                placeholder="Search by Batch name"
                              />
                              <span className="bx bx-search-alt" />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-end">
                          <Button color="secondary">Export</Button>
                        </div>
                      </Col>
                    </Row>
                    <h6 className="mt-3">Total Learners: 40</h6>
                    <Row>
                      <Col md={12}>
                        <div className="table-responsive">
                          {/* <BatchListTable /> */}
                        </div>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="lectures" title="Lectures">
                    {/* <BatchListTable /> */}
                  </Tab>
                  <Tab eventKey="mentors" title="Mentors">
                    {/* <BatchListTable /> */}
                  </Tab>
                  <Tab eventKey="Grade Book" title="Grade Book">
                    <GradeBook />
                  </Tab>
                  <Tab eventKey="status" title="Status">
                    <Status />
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <Row>
                <Col md={12}>
                    <div className='py-3' style={{background:'#fff'}}>
                        <Button color="primary" outline className='px-5 ms-4'>Cancel</Button>
                        <Button color="danger" className='px-5 ms-4'>Delete</Button>
                    </div>
                </Col>
            </Row> */}
    </div>
  )
}

BatchList.propTypes = {
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
  onGetNewBatches: data => dispatch(getNewBatches(data)),
  onGetBatchesList: data => dispatch(getBatchesList(data)),

  onCreateNewBatch: data => dispatch(createNewBatch(data)),

  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchList)

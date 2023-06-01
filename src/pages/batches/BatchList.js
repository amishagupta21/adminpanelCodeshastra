import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
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
import { connect } from "react-redux"
import BatchNewModal from "./BatchNewModal"
import {
  getBatchesLearner,
  getGradeBook,
  getNewBatches,
} from "store/Batches/actions"
import MentorListTable from "./MentorListTable"

const BatchList = props => {
  const [key, setKey] = useState("tab")
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const params = useParams()
  const { manageUser, usersCount, newBatch, batchesLearner, gradeBook } = props
  const [item, setItem] = useState(manageUser)

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  useEffect(() => {
    const { onGetBatchesLearner, onGetNewBatches } = props

    onGetBatchesLearner(params.id)
    onGetNewBatches(params.id)
  }, [])

  const gradeBookApi = () => {
    const { onGetGradeBook } = props

    onGetGradeBook(params.id)
  }

  const handleSelect = k => {
    setKey(k)
    if (k === "Grade Book") {
      gradeBookApi()
    }
  }

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
          <BatchLearner newBatch={newBatch} />
          <BatchProgress />
          <CompletionStatus />
        </Col>
        <Col md={7}>
          <Card>
            <CardBody>
              <div>
                <Tabs
                  activeKey={key}
                  onSelect={k => {
                    handleSelect(k)
                  }}
                >
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
                          <BatchListTable
                            batchesLearner={batchesLearner || []}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="Grade Book" title="Grade Book">
                    <GradeBook gradeBook={gradeBook || []} />
                  </Tab>
                  <Tab eventKey="lectures" title="Lectures">
                    {/* <BatchListTable /> */}
                  </Tab>
                  <Tab eventKey="mentors" title="Mentors">
                    {/* <BatchListTable /> */}
                    <MentorListTable />
                  </Tab>

                  {/* <Tab eventKey="status" title="Status">
                    <Status />
                  </Tab> */}
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

BatchList.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Batches: PropTypes.array,
}

const mapStateToProps = ({ Batches, state, count }) => ({
  manageUser: Batches?.manageUser,
  usersCount: Batches?.count?.count,
  userRoles: Batches?.roles,
  newBatch: Batches?.newBatch,
  batchesLearner: Batches?.batchesLearner,
  gradeBook: Batches?.gradeBook,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetBatchesLearner: data => dispatch(getBatchesLearner(data)),
  onGetNewBatches: data => dispatch(getNewBatches(data)),

  onGetGradeBook: data => dispatch(getGradeBook(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchList)

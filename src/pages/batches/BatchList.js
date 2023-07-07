import React, { useState, useEffect } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
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
  getMentor,
} from "store/Batches/actions"
import MentorListTable from "./MentorListTable"
import { DeBounceSearch } from "common/DeBounceSearch"
import LectureListTable from "./LectureListTable"
import AddNewLearner from "./AddNewLearner"

const BatchList = props => {
  const [key, setKey] = useState("tab")
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const params = useParams()
  const {
    manageUser,
    usersCount,
    newBatch,
    batchesLearner,
    gradeBook,
    mentor,
    totalBatchesLearner,
  } = props
  const [item, setItem] = useState(manageUser)
  const [newLearner, setNewLearner] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const unikodecourseid = queryParams.get("unikodecourseid")

  const openNewLearner = e => {
    setNewLearner(true)
  }

  // console.log(row?.unikodecourseid)

  const closeNewLearner = () => {
    setNewLearner(false)
  }

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  useEffect(() => {
    const { onGetBatchesLearner, onGetNewBatches } = props
    onGetBatchesLearner({
      id: params.id,
      page: currentPage,
    })
    onGetNewBatches(params.id)
  }, [currentPage])

  useEffect(() => {
    setTotalPages(Math.ceil(totalBatchesLearner / 10))
  }, [totalBatchesLearner])

  const gradeBookApi = () => {
    const { onGetGradeBook } = props

    onGetGradeBook(params.id)
  }

  const mentorsApi = () => {
    const { onGetNewMentor } = props

    onGetNewMentor(params.id)
  }

  const handleSelect = k => {
    setKey(k)
    if (k === "Grade Book") {
      gradeBookApi()
    } else if (k === "mentors") {
      mentorsApi()
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
        <Col md={6} className="mb-4">
          <h4>BATCH INFORMATION</h4>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-end">
            <BatchNewModal modal={modal} toggle={toggle} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <BatchLearner newBatch={newBatch} />
        </Col>
        <Col md={6}>
          <BatchProgress />
        </Col>
        {/* <Col md={4}><CompletionStatus /> </Col> */}
      </Row>
      <Row>
        <Col md={12}>
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
                        <Button
                          onClick={openNewLearner}
                          color="success"
                          className="rounded-pill mb-3"
                        >
                          + Add New Learner
                        </Button>
                        {newLearner && (
                          <AddNewLearner
                            newLearner={newLearner}
                            openNewLearner={openNewLearner}
                            closeNewLearner={closeNewLearner}
                            unikodecourseid={unikodecourseid}
                            setNewLearner={setNewLearner}
                          />
                        )}

                        <div className="text-start">
                          <h4>Learners</h4>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div className="table-responsive">
                        <BatchListTable
                          batchesLearner={batchesLearner || []}
                          onGetBatchesLearner={props.onGetBatchesLearner}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                          totalBatchesLearner={totalBatchesLearner}
                        />
                      </div>
                    </Row>
                  </Tab>
                  <Tab eventKey="Grade Book" title="Grade Book">
                    <GradeBook
                      gradeBook={gradeBook || []}
                      onGetGradeBook={props.onGetGradeBook}
                    />
                  </Tab>
                  <Tab eventKey="lectures" title="Lectures">
                    <LectureListTable />
                  </Tab>
                  <Tab eventKey="mentors" title="Mentors">
                    {/* <BatchListTable /> */}
                    <MentorListTable mentor={mentor || []} />
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

const mapStateToProps = ({ Batches, state, count }) => {
  return {
    manageUser: Batches?.manageUser,
    usersCount: Batches?.count?.count,
    userRoles: Batches?.roles,
    newBatch: Batches?.newBatch,
    batchesLearner: Batches?.batchesLearner,
    totalBatchesLearner: Batches?.totalBatchesLearner,
    gradeBook: Batches?.gradeBook,
    mentor: Batches?.mentor,
    // deleteData: false,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetBatchesLearner: data => dispatch(getBatchesLearner(data)),
  onGetNewBatches: data => dispatch(getNewBatches(data)),
  onGetNewMentor: data => dispatch(getMentor(data)),

  onGetGradeBook: data => dispatch(getGradeBook(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchList)

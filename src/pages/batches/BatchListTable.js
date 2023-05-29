import React, { useState, useEffect } from "react"
import {
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Table,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getBatchesList } from "store/Batches/actions"

const BatchListTable = props => {
  const [isExpanded, setIsExpanded] = useState(null)
  const params = useParams()
  const { manageUser, usersCount } = props
  const [item, setItem] = useState(manageUser)
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

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
        text: "Name",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.name}</div>
        ),
      },

      {
        dataField: "description",
        text: "Assignments",
        sort: true,
      },
      {
        dataField: "start_date",
        text: "Assessments",
        sort: true,
      },
      {
        dataField: "end_date",
        text: "Projects",
        sort: true,
      },
      {
        dataField: "course",
        text: "Attendance",
        sort: true,
      },
      {
        dataField: "lectures",
        text: "Week Test 1",
        sort: true,
      },
      {
        dataField: "lectures",
        text: "Week Test 2",
        sort: true,
      },
      {
        dataField: "lectures",
        text: "Week Test 3",
        sort: true,
      },

      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            <div className="me-2">
              <Link to="/batch-list" className="text-muted">
                <i className="mdi mdi-step-forward-2 mdi-18px text-success" />
              </Link>
              <Link className="text-muted ms-2">
                <i
                  onClick={toggle}
                  className="mdi mdi-clipboard-account mdi-18px text-danger"
                />
              </Link>
            </div>
          </div>
        ),
      },
    ],
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
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  useEffect(() => {
    const { onGetBatchesList } = props

    onGetBatchesList(params.id)
  }, [])

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
        <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label>Student Name</Label>
                <Input type="text" placeholder="Batch_10" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Assignment</Label>
                <Input type="text" placeholder="Freshers Only" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Assessments</Label>
                <Input type="select">
                  <option selected>Full Stack Web Developer</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Week Test 1</Label>
                <Input type="select">
                  <option selected>Full Time</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label>Week Test 2</Label>
                <Input type="text" placeholder="www.google.meet/saq-faw-brs" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Week Test 3</Label>
                <Input type="text" placeholder="www.google.meet/saq-faw-brs" />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={toggle} className="px-5">
            Cancel
          </Button>
          <Button color="primary" onClick={toggle} className="px-5">
            Create
          </Button>
        </ModalFooter>
      </Modal>
      <ToolkitProvider
        key={isExpanded}
        keyField="_id"
        columns={state?.columns}
        data={item}
      >
        {toolkitProps => (
          <>
            <Col xl="12">
              <div className="table-responsive">
                {/* <h6 className="mt-2">
                  Total Batches: &nbsp;{manageUser?.length}
                </h6> */}
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
  )
}

BatchListTable.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BatchListTable)

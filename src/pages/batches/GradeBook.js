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
import { getGradeBook } from "store/Batches/actions"
import ReportCard from "./ReportCard"

const GradeBook = props => {
  const [isExpanded, setIsExpanded] = useState(null)
  const params = useParams()
  const { manageUser, usersCount } = props

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  const [item, setItem] = useState(manageUser)

  useEffect(() => {
    const { onGetGradeBook } = props
    onGetGradeBook(params.id)
  }, [])

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

  return (
    <>
      <ReportCard modal={modal} toggle={toggle} />
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

GradeBook.propTypes = {
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
  onGetGradeBook: data => dispatch(getGradeBook(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GradeBook)

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

  // useEffect(() => {
  //   const { onGetGradeBook } = props
  //   onGetGradeBook(params.id)
  // }, [])

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
        text: "Id Number",
        sort: true,
      },
      {
        dataField: "course",
        text: "Attendance",
        sort: true,
      },
      {
        dataField: "course",
        text: "Virtual Programming",
        sort: true,
      },
      {
        dataField: "lectures",
        text: "Virtual Programming Grade",
        sort: true,
      },
      {
        dataField: "lectures",
        text: "DSA MCT",
        sort: true,
      },
      {
        dataField: "lectures",
        text: "FE MCT1",
        sort: true,
      },
      // {
      //   dataField: "lectures",
      //   text: "Week Test 1",
      //   sort: true,
      // },
      // {
      //   dataField: "lectures",
      //   text: "Week Test 2",
      //   sort: true,
      // },
      // {
      //   dataField: "lectures",
      //   text: "Week Test 3",
      //   sort: true,
      // },

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

  const gradeArray = [
    {
      name: "kishor",
      id_number: 2445,
      attendance: "52%",
      assessmemt: "120 / 200",
      virtual_programming: 90,
      virtual_grade: "A+",
      mockup: {
        DSA: 75,
        FE: 55,
      },
      total_number: 75,
      learner_limit: 23,
      total_percentage: "87%",
      weekly_assignment: {
        week_1: 34,
        week_2: 45,
        week_3: 78,
      },
      test: {
        week_1: 45,
        week_2: 22,
      },
      final_assessment: {
        phase_1: 10,
        phase_2: 25,
        phase_3: 87,
      },
    },
    {
      name: "raman",
      id_number: 455,
      attendance: "87%",
      assessmemt: "50 / 200",
      virtual_programming: 10,
      virtual_grade: "B+",
      mockup: {
        DSA: 75,
        FE: 55,
      },
      total_number: 25,
      learner_limit: 10,
      total_percentage: "25%",
      weekly_assignment: {
        week_1: 34,
        week_2: 45,
        week_3: 78,
      },
      test: {
        week_1: 45,
        week_2: 22,
      },
      final_assessment: {
        phase_1: 10,
        phase_2: 25,
        phase_3: 87,
      },
    },
  ]

  // console.log(gradeArray, "/////////gradeArray")

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
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GradeBook)

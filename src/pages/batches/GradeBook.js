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

const GradeBook = ({ gradeBook }) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const params = useParams()

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // useEffect(() => {
  //   const { onGetGradeBook } = props
  //   onGetGradeBook(params.id)
  // }, [])

  console.log(gradeBook, "////////gradeBook")

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
        dataField: "id",
        text: "Id Number",
        sort: true,
      },
      {
        dataField: "Assignment - 11",
        text: "Assignment",
        sort: true,
      },
      {
        dataField: "final_assessment.phase_1",
        text: "Assessment",
        sort: true,
      },
      {
        dataField: "Attendance",
        text: "Attendance",
        sort: true,
      },
      {
        dataField: "Question - 1",
        text: "Virtual Programming",
        sort: true,
      },
      {
        dataField: "virtual_grade",
        text: "Virtual Programming Grade",
        sort: true,
      },
      {
        dataField: "Assignment - 1",
        text: "DSA MCT",
        sort: true,
      },
      {
        dataField: "Assignment - 2",
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
              {/* <Link to="/batch-list" className="text-muted">
                <i className="mdi mdi-information-outline mdi-18px text-success" />
              </Link> */}
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
    {
      name: "learner_10",
      id_number: 4877,
      attendance: "95%",
      assessmemt: "150 / 200",
      virtual_programming: 15,
      virtual_grade: "B+",
      mockup: {
        DSA: 75,
        FE: 55,
      },
      total_number: 100,
      learner_limit: 10,
      total_percentage: "65%",
      weekly_assignment: {
        week_1: 65,
        week_2: 45,
        week_3: 48,
      },
      test: {
        week_1: 45,
        week_2: 22,
      },
      final_assessment: {
        phase_1: 10,
        phase_2: 45,
        phase_3: 65,
      },
    },
    {
      name: "Full Stack",
      id_number: 100,
      attendance: "50%",
      assessmemt: "160 / 200",
      virtual_programming: 10,
      virtual_grade: "C+",
      mockup: {
        DSA: 75,
        FE: 10,
      },
      total_number: 25,
      learner_limit: 10,
      total_percentage: "65%",
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
        phase_1: 20,
        phase_2: 25,
        phase_3: 87,
      },
    },
    {
      name: "learner_39",
      id_number: 2554,
      attendance: "50%",
      assessmemt: "180 / 200",
      virtual_programming: 10,
      virtual_grade: "C+",
      mockup: {
        DSA: 10,
        FE: 5,
      },
      total_number: 25,
      learner_limit: 10,
      total_percentage: "30%",
      weekly_assignment: {
        week_1: 34,
        week_2: 65,
        week_3: 78,
      },
      test: {
        week_1: 45,
        week_2: 22,
      },
      final_assessment: {
        phase_1: 20,
        phase_2: 87,
        phase_3: 90,
      },
    },
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  return (
    <div className="batches-home">
      <ReportCard modal={modal} toggle={toggle} />
      <Row>
        <Col md={12} className="text-end">
          <Button color="success" className="rounded-pill mb-3">
            + Add New Grade Book
          </Button>
          <div className="text-start">
            <h4>Grade Book</h4>
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
      <ToolkitProvider
        key={isExpanded}
        keyField="_id"
        columns={state?.columns}
        data={gradeBook}
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
    </div>
  )
}

export default GradeBook

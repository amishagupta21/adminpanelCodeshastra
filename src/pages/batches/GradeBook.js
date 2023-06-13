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
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link, useParams, useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getGradeBook } from "store/Batches/actions"
import ReportCard from "./ReportCard"

const GradeBook = ({ gradeBook, onGetGradeBook }) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const { ExportCSVButton } = CSVExport

  const params = useParams()
  const history = useHistory()
  const [column, setColumn] = useState([])

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [viewData, setViewData] = useState("")
  const [gradeBookData, setGradeBookData] = useState([])

  // useEffect(() => {
  //   const finalColumn = []
  //   for (let x in gradeBook[0]) {
  //     let startingKey = x.split(" ")[0]
  //     if (
  //       startingKey === "Assignment" ||
  //       startingKey === "name" ||
  //       startingKey === "Exercise" ||
  //       // startingKey === "id" ||
  //       startingKey === "Attendance"
  //     ) {
  //       finalColumn.push({
  //         dataField: x,
  //         text: x,
  //         sort: true,
  //       })
  //     }
  //   }
  //   finalColumn.push({
  //     dataField: "Actions",
  //     text: "Actions",
  //     formatter: (cellContent, user) => (
  //       <div className="d-flex">
  //         <div className="me-2">
  //           <div
  //             onClick={() => {
  //               setViewData(user)
  //               toggle()
  //             }}
  //             // to={`/report/${user?.id}`}
  //             className="text-muted ms-2"
  //           >
  //             <i className="mdi mdi-clipboard-account mdi-18px text-success" />
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   })
  //   setColumn(finalColumn)
  // }, [gradeBook])

  useEffect(() => {
    const finalColumn = []

    for (let x in gradeBook[0]) {
      let startingKey = x.split(" ")[0]
      if (startingKey === "name") {
        finalColumn.push({
          dataField: x,
          text: x,
          sort: true,
        })

        for (let x in gradeBook[0]?.GradeItems) {
          let startingKey = x.split(" ")[0]
          if (
            startingKey === "Assignment" ||
            startingKey === "Exercise" ||
            startingKey === "Attendance"
          ) {
            finalColumn.push(
              startingKey === "Attendance"
                ? {
                    dataField: x,
                    text: x,
                    sort: true,
                    formatter: (cell, row) => `${cell.toFixed(2)}%`,
                  }
                : {
                    dataField: x,
                    text: x,
                    sort: true,
                  }
            )
          }
        }
      }
    }

    finalColumn.push({
      dataField: "Actions",
      text: "Actions",
      formatter: (cellContent, user) => (
        <div className="d-flex">
          <div className="me-2">
            <div
              onClick={() => {
                setViewData(user)
                toggle()
              }}
              // to={`/report/${user?.id}`}
              className="text-muted ms-2"
            >
              <i className="mdi mdi-clipboard-account mdi-18px text-success" />
            </div>
          </div>
        </div>
      ),
    })
    setColumn(finalColumn)
  }, [gradeBook])

  useEffect(() => {
    const finalGradeBook = []
    gradeBook.map(item => {
      finalGradeBook.push({ ...item, ...item.GradeItems })
    })
    setGradeBookData(finalGradeBook)
  }, [gradeBook])

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  const handleSearch = e => {
    const { onGetGradeBook } = props
    const data = {
      search: e,
    }
    onGetGradeBook(data)
    // const { Batches } = props
    // setState({ Batches })
  }

  return (
    <div className="batches-home">
      <ReportCard modal={modal} toggle={toggle} viewData={viewData} />
      <Row>
        <Col md={12} className="text-end">
          <div className="text-start">
            <h4>Grade Book</h4>
          </div>
        </Col>
      </Row>

      <ToolkitProvider
        key={isExpanded}
        keyField="id"
        columns={
          column.length
            ? column
            : [
                {
                  dataField: "",
                  text: "",
                  sort: false,
                },
              ]
        }
        data={gradeBookData}
        exportCSV={{ onlyExportSelection: false, exportAll: true }}
      >
        {toolkitProps => (
          <>
            <Row>
              <Col md={6}>
                <div className="search-box">
                  <div className="app-search p-0">
                    <div className="position-relative mb-2">
                      <DeBounceSearch handleSearch={handleSearch} />

                      <span className="bx bx-search-alt" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="text-end">
                  <ExportCSVButton {...toolkitProps.csvProps}>
                    <Button color="secondary">Export</Button>
                  </ExportCSVButton>
                </div>
              </Col>
            </Row>

            <Col xl="12">
              <div className="table-responsive">
                <h6 className="mt-2">
                  Total Batches: &nbsp;{gradeBook?.length}
                </h6>
                <BootstrapTable
                  keyField={"id"}
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

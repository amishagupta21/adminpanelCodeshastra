import React, { useState, useEffect } from "react"
import {
  Button,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import jsPDF from "jspdf"
import "jspdf-autotable"
import ResponsivePagination from "react-responsive-pagination"
import Batches from "./Batches"

const GradeBook = ({
  gradeBook,
  onGetGradeBook,
  count,
  currentPage,
  totalPages,
  setCurrentPage,
  totalBatchesLearner,
  setTotalPages,
}) => {
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
    setTotalPages(Math.ceil(totalBatchesLearner / 10))
  }, [totalBatchesLearner])

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
                    formatter: (cell, row) => `${cell?.toFixed(2)}%`,
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

  const handleDownloadPDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF()
    // Define table headers and data

    const headers = Object.entries(gradeBook[1].GradeItems || "").map(item => {
      return item[0]
    })

    const data = gradeBook.map(item => {
      return ["", item.name]
    })

    // Add the table to the PDF using the autotable plugin
    doc.autoTable({
      head: [headers],
      body: data,
    })

    // Save the PDF file
    doc.save("document.pdf")
  }

  // const headers = Object.entries(gradeBook[1] || "").map(item => {
  //   console.log(item[0], "///////item")
  //   return item[0]
  // })

  // console.log(gradeBook, "////////gradeBook")

  // console.log(headers, "////////gradeBook")

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
      {/* <Button onClick={handleDownloadPDF}>Download as PDF</Button> */}

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
                  {/* <Button color="secondary">Export</Button> */}
                  <UncontrolledDropdown className="me-2" direction="down">
                    <DropdownToggle caret color="primary">
                      Export <i className="mdi mdi-menu-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem disabled>Download as pdf</DropdownItem>
                      <ExportCSVButton {...toolkitProps.csvProps}>
                        <DropdownItem>Download as excel</DropdownItem>
                      </ExportCSVButton>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Row>

            <Col xl="12">
              <div className="table-responsive">
                <h6 className="mt-2">
                  Total Batches: &nbsp;{totalBatchesLearner}
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
                {/* <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={n => {
                    setCurrentPage(n)
                    // onGetBatchesList(n)
                    // onGetBatchesLearner(n)
                  }}
                /> */}
              </div>
            </Col>
          </>
        )}
      </ToolkitProvider>
    </div>
  )
}

export default GradeBook

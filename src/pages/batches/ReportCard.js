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
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from "reactstrap"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { post, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Pdf from "react-to-pdf"
import tosterMsg from "components/Common/toster"
import Select from "react-select"

import Banner from "../../assets/images/report-card-banner.png"

const ref = React.createRef()

const ReportCard = ({ modal, toggle, viewData }) => {
  const params = useParams()
  const [data, setData] = useState([])
  const [selectedWeek, setSelectedWeek] = useState("")

  useEffect(() => {
    const newData = async () => {
      try {
        const response = await axios(
          `${process.env.REACT_APP_API_URL}${url.REPORT_CARD_DESIGN}/${viewData.unikodeuserid}/${viewData.unikodecourseid}/${selectedWeek?.label}/${viewData.id} 
          `
        )
        setData(response?.data?.data)
        tosterMsg(response?.data?.message)
      } catch (error) {
        setData(error)
        tosterMsg(error)
      }
    }
    if (modal) {
      newData()
    }
  }, [modal])

  const options = [
    { label: "7", value: "7" },
    { label: "14", value: "14" },
    { label: "21", value: "21" },
    { label: "28", value: "28" },
  ]

  const handleChange = selectedOption => {
    setSelectedWeek(selectedOption)
  }

  const addSoftSkillsNumber =
    parseInt(data?.softSkillAssignmentScore) +
    parseInt(data?.softskillWeeklyAssessmentScore) +
    parseInt(data?.softskillAggregateScore)

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
      contentClassName="modalContent"
      size="xl"
    >
      <ModalHeader className="modalHeader" toggle={toggle}></ModalHeader>
      <ModalBody
        className="w-100"
        style={{ height: "70vh", overflowY: "auto", marginTop: "40px" }}
      >
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <div>
                {/* <Link to={`/batch-detail/${params?.id}`}>
                <i className="mdi mdi-chevron-left"></i> Batch
              </Link> */}
              </div>
              {/* <div>Batch List / Batch Information</div> */}
              <div>
                {/* <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/batch-list">Batch</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>Report</BreadcrumbItem>
                </Breadcrumb> */}
              </div>
            </div>
            {/* <h4 className="mb-4">REPORTS</h4> */}
            <div style={{ background: "#6C57D2", marginBottom: "20px" }}>
              <img src={Banner} style={{ width: "100%" }} />
            </div>
            <Select
              name="filter"
              className="mb-4 select-width"
              placeholder="Select Week"
              options={options}
              onChange={handleChange}
            />
            <Row className="mx-5">
              <Col md={6}>
                <FormGroup row>
                  <Label sm={3}>Student Name</Label>
                  <Col sm={9} className="bg-1">
                    {data?.studentName}
                  </Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={3} className="text-center">
                    Batch Code
                  </Label>
                  <Col sm={9} className="bg-1">
                    {data?.batchCode}
                  </Col>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup row>
                  <Label sm={3}>Total No of Live Tech Classes</Label>
                  <Col sm={9} className="bg-2"></Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={6}>Attended Live Tech Classes</Label>
                  <Col sm={6} className="bg-1"></Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={3} className="text-center">
                    Absent
                  </Label>
                  <Col sm={9} className="bg-1"></Col>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup row>
                  <Label sm={3}>Attendance (Technical) %</Label>
                  <Col sm={9} className="bg-2">
                    {data?.technicalAttendance}%
                  </Col>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup row>
                  <Label sm={3}>Total No of Soft Skills Classes</Label>
                  <Col sm={9} className="bg-1">
                    {addSoftSkillsNumber}
                  </Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={6}>Attended Soft Skills Classes</Label>
                  <Col sm={6} className="bg-2">
                    {" "}
                  </Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={3} className="text-center">
                    Absent
                  </Label>
                  <Col sm={9} className="bg-2"></Col>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup row>
                  <Label sm={3}>Attendance (Soft skills) %</Label>
                  <Col sm={9} className="bg-1">
                    {data?.softSkillAttendance}
                  </Col>
                </FormGroup>
              </Col>
            </Row>

            <Row className="mx-5">
              <Col md={12}>
                <div className="table-responsive report-table" ref={ref}>
                  <div className="text-end my-3"></div>
                  <Table bordered className="mb-5" striped>
                    <thead>
                      <tr>
                        <th style={{ background: "#6C57D2", color: "#fff" }}>
                          Current Week Avg Score
                        </th>
                        <th style={{ background: "#8E78F9", color: "#fff" }}>
                          Previous Week Avg Score
                        </th>
                        <th style={{ background: "#6C57D2", color: "#fff" }}>
                          Total Avg Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data?.CurrentWeekAvgScore} %</td>
                        <td>No Data</td>
                        <td>{data?.totalAvgScore}%</td>
                      </tr>

                      {/* <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    
                  </tr> */}
                    </tbody>
                  </Table>
                  <Table bordered className="mb-5 my-table-border" striped>
                    {/* <thead className="bg-transparent">
                  <tr>
                    <th colSpan={7}>
                      <div className="d-flex">
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          <strong>Name :</strong> {data?.name}
                        </div>
                        <div
                          style={{ fontSize: "16px", fontWeight: "500" }}
                          className="ms-5"
                        >
                          <strong>ID number :</strong> {data?.id}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead> */}
                    <thead>
                      <tr>
                        <th style={{ background: "#6C57D2", color: "#fff" }}>
                          S.No.
                        </th>
                        <th style={{ background: "#8E78F9", color: "#fff" }}>
                          Class
                        </th>
                        <th style={{ background: "#6C57D2", color: "#fff" }}>
                          Score (Max.100)
                        </th>
                        <th style={{ background: "#8E78F9", color: "#fff" }}>
                          Aggregate Score(Max. 100)
                        </th>
                        <th style={{ background: "#6C57D2", color: "#fff" }}>
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>Technical Assignment Score </td>
                        <td>
                          {data?.techchnicalAssignmentScore},{" "}
                          {data?.technicalWeeklyAssessmentScore}
                        </td>
                        <td>{data?.technicalAggregateScore}</td>

                        <td>{data?.technicalgrade}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Soft Skills</td>
                        <td>
                          {data?.softSkillAssignmentScore},{" "}
                          {data?.softskillWeeklyAssessmentScore}
                        </td>
                        <td>{data?.softskillAggregateScore}</td>

                        <td>{data?.softskillgrade}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Module Clearance Test</td>
                        <td>No Data</td>
                        <td>No Data</td>

                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <div className="total">Total Avg Score</div>
                        </td>
                        <td colSpan={2}>
                          <div className="total">{data?.totalAvgScore}</div>
                        </td>
                        <td>
                          <div className="total">{data?.totalGrade}</div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table bordered className="mb-5 my-table-border">
                    <tbody>
                      <tr>
                        <th
                          style={{ backgroundColor: "#6C57D2", color: "#fff" }}
                        >
                          Grades
                        </th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                        <th className="bg-3">A+</th>
                      </tr>
                      <tr>
                        <th style={{ background: "#8E78F9", color: "#fff" }}>
                          Grades
                        </th>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                        <td>A+</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    color="success"
                    onClick={() => {
                      downloadPdf(DOWNLOAD_FILE_URL)
                    }}
                  >
                    Email To Student
                  </Button>
                  <Button
                    color="primary"
                    className="ms-4"
                    onClick={() => console.log("Clicked")}
                  >
                    Download PDF
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default ReportCard

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
  const [selectedWeek, setSelectedWeek] = useState(28)

  useEffect(() => {
    const newData = async () => {
      try {
        const response = await axios(
          `${process.env.REACT_APP_API_URL}${url.REPORT_CARD_DESIGN}/${viewData.unikodeuserid}/${viewData.unikodecourseid}/${selectedWeek}/${viewData.id} 
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
  }, [modal, selectedWeek])

  // const options = [
  //   { label: "7", value: "7" },
  //   { label: "14", value: "14" },
  //   { label: "21", value: "21" },
  //   { label: "28", value: "28" },
  // ]

  // const handleChange = (selectedOption, e) => {
  //   setSelectedWeek(e.target.value)
  // }

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
          <Row className="mx-5 mb-3">
            <Col md={2}>
              <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => (
                  <Button onClick={toPdf} color="success">
                    Download PDF
                  </Button>
                )}
              </Pdf>
            </Col>
            <Col md={3}>
              <Button
                color="primary"
                className="ms-4"
                onClick={() => console.log("Clicked")}
              >
                Email To Student
              </Button>
            </Col>
          </Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <div></div>
              <div></div>
            </div>
            <div style={{ background: "#6C57D2", marginBottom: "20px" }}>
              <img src={Banner} style={{ width: "100%" }} />
            </div>
            {/* <Select
              name="filter"
              value={selectedWeek}
              className="mb-4 select-width"
              placeholder="Select Week"
              options={options}
              onChange={event => {
                setSelectedWeek(event)
              }}
            /> */}
            <div ref={ref}>
              <Row className="mx-5">
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={3}>Select Weekly Report</Label>
                    <Col sm={9}>
                      <Input
                        sm={6}
                        type="select"
                        value={selectedWeek}
                        onChange={event => {
                          setSelectedWeek(event.target.value)
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}></Col>
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
            </div>
            <Row className="mx-5">
              <Col md={12}>
                <div className="table-responsive report-table">
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

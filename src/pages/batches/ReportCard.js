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

import Banner from "../../assets/images/report-card-banner.png"

const ref = React.createRef()

const ReportCard = ({ modal, toggle, viewData }) => {
  const params = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const newData = async () => {
      try {
        const response = await axios(
          `https://lms.unikaksha.dev/api/lms/moodle/getStudentsReport/145/${viewData.id}`
        )
        setData(response?.data?.data[0])
      } catch (error) {
        setData(error)
      }
    }
    if (modal) {
      newData()
    }
  }, [modal])

  const DOWNLOAD_FILE_URL = "http://localhost:3000/batch-detail/edit/163cfef0-ce40-490b-a1e5-b27d142f759d?unikodecourseid=145"

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
            <Row className="mx-5">
              <Col md={6}>
                <FormGroup row>
                  <Label sm={3}>Student Name</Label>
                  <Col sm={9} className="bg-1">
                    ABC
                  </Col>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup row>
                  <Label sm={3} className="text-center">
                    Batch Code
                  </Label>
                  <Col sm={9} className="bg-1"></Col>
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
                  <Col sm={9} className="bg-2"></Col>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup row>
                  <Label sm={3}>Total No of Soft Skills Classes</Label>
                  <Col sm={9} className="bg-1"></Col>
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
                  <Col sm={9} className="bg-1"></Col>
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
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
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
                        {/* <th colSpan={2}>Weekly Assessments</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
                        <td>No Data</td>
                        {/* <td>{data?.Assignment - 11}</td>
                  <td>{data?.Assignment - 21}</td> */}
                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
                        <td>No Data</td>
                        {/* <td>{data?.Assignment - 11}</td>
                  <td>{data?.Assignment - 21}</td> */}
                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td>{data?.Attendance?.toFixed(2)} %</td>
                        <td>No Data</td>
                        <td>No Data</td>
                        <td>No Data</td>
                        {/* <td>{data?.Assignment - 11}</td>
                  <td>{data?.Assignment - 21}</td> */}
                        <td>No Data</td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <div className="total">Total Avg Score</div>
                        </td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
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
                    onClick={() => {downloadPdf(DOWNLOAD_FILE_URL)}}
                  >
                    Email To Student
                  </Button>
                  <Button color="primary" className="ms-4" onClick={() => console.log("Clicked")}>
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

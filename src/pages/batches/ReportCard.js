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
      <ModalBody className="w-100">
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
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/batch-list">Batch</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>Report</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
            <h4 className="mb-4">REPORTS</h4>

            <div className="table-responsive report-table" ref={ref}>
              <div className="text-end my-3"></div>
              <Table bordered className="mb-5">
                <thead className="bg-transparent">
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
                </thead>
                <thead>
                  <tr>
                    <th>Attendance</th>
                    <th>Total Assessment</th>
                    <th>Total Assignment</th>
                    <th>DSA MCT</th>
                    {/* <th colSpan={2}>Weekly Assessments</th> */}
                    <th>Total</th>
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
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colSpan={7}>
                      <strong>Note :</strong>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button color="success">Email To Student</Button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default ReportCard

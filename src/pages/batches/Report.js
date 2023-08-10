import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  Col,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Button,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

import BootstrapTable from "react-bootstrap-table-next"
import axios from "axios"

const ref = React.createRef()

const Report = () => {
  const params = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const newData = async () => {
      try {
        const response = await axios(
          `https://lms.unikaksha.dev/api/lms/moodle/getStudentsReport/145/${params.id}`
        )
        setData(response?.data?.data[0])
      } catch (error) {
        setData(error)
      }
    }
    newData()
  }, [])

  return (
    <div className="page-content report">
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

          <div className="table-responsive report-table">
            <div className="text-end my-3">
              <Button>Download</Button>
            </div>
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
                  <th colSpan={2}>Weekly Assessments</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data?.Attendance}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>{data?.Assignment - 11}</td>
                  <td>{data?.Assignment - 21}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
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
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    <strong>Note :</strong> qwerty
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Report

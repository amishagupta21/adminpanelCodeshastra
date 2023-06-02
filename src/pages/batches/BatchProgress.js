import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap";
import ChartCircle from "../../assets/images/Chart-circle.png";

const BatchProgress = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between mb-3">
            <span className="chart-heading">Batch Progress</span>
          </div>
          <Row>
            <Col md={6}>
              <p className="mb-3 chart-subheading">Total Lectures</p>
              <p className="mb-3">
                <strong style={{ fontSize: "15px" }}>4</strong> /9 Completed
              </p>
              <p className="mb-3 chart-subheading">Avg. Present </p>
              <p className="mb-3" style={{ fontSize: "16px" }}>
                <strong>60%</strong>
              </p>
              <p className="mb-3 chart-subheading">
                <span className="text-green" style={{ background: "none" }}>
                  12% <i className="mdi mdi-arrow-up"></i>
                </span>
                Last Month
              </p>
              <p className="mb-3 chart-subheading">Avg. Time Spent </p>
              <p className="mb-3" style={{ fontSize: "16px" }}>
                <strong>23 Min</strong>
              </p>
              <p className="mb-3 chart-subheading">Avg. Present </p>
              <p className="mb-4 chart-subheading">
                <span
                  className="text-green"
                  style={{ background: "none", color: "#F46A6A" }}
                >
                  12%
                  <i className="mdi mdi-arrow-down"></i>
                </span>
                Last Month
              </p>
              <p className="mb-3 chart-subheading">
                Next Lecture On: <strong>08 Oct 22</strong>
              </p>
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <img src={ChartCircle} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default BatchProgress

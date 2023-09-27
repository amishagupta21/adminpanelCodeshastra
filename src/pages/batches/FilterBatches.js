import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import Nav from "react-bootstrap/Nav"

const FilterBatches = ({
  setIsSelected,
  onGetBatchesList,
  isSelected,
  dashboard,
  filterData,
  FilterPastBatches,
}) => {
  return (
    <>
      <Row>
        <Col>
          <div className="batches-box">
            <Card>
              <Nav.Link
                eventKey="first"
                onClick={() => {
                  setIsSelected("first")
                  onGetBatchesList()
                }}
                style={{ background: isSelected === "first" && "#E5E9FF" }}
              >
                <CardBody>
                  <div className="box">
                    <div>
                      <p className="box-heading">All Batches</p>
                      <p className="score">{dashboard?.totalBatch}</p>
                    </div>
                    <div className="icon-circle">
                      <span className="mdi mdi-account-circle" />
                    </div>
                  </div>
                </CardBody>
              </Nav.Link>
            </Card>
          </div>
        </Col>
        <Col>
          <div className="batches-box">
            <Card>
              <Nav.Link
                eventKey="second"
                onClick={() => {
                  setIsSelected("second")
                  filterData(true)
                }}
                style={{ background: isSelected === "second" && "#E5E9FF" }}
              >
                <CardBody>
                  <div className="box">
                    <div>
                      <p className="box-heading">Active Batches</p>
                      <p className="score">{dashboard?.activeBatch}</p>
                    </div>
                    <div className="icon-circle">
                      <span className="mdi mdi-account-circle" />
                    </div>
                  </div>
                </CardBody>
              </Nav.Link>
            </Card>
          </div>
        </Col>
        <Col>
          <div className="batches-box">
            <Card>
              <Nav.Link
                eventKey="third"
                onClick={() => {
                  setIsSelected("third")
                  filterData(false)
                }}
                style={{ background: isSelected === "third" && "#E5E9FF" }}
              >
                <CardBody>
                  <div className="box">
                    <div>
                      <p className="box-heading">Inactive Batches</p>
                      <p className="score">{dashboard?.disableBatch}</p>
                    </div>
                    <div className="icon-circle">
                      <span className="mdi mdi-account-circle" />
                    </div>
                  </div>
                </CardBody>
              </Nav.Link>
            </Card>
          </div>
        </Col>
        <Col>
          <div className="batches-box">
            <Card>
              <Nav.Link
                eventKey="fourth"
                onClick={() => {
                  FilterPastBatches()
                  setIsSelected("fourth")
                }}
                style={{ background: isSelected === "fourth" && "#E5E9FF" }}
              >
                <CardBody>
                  <div className="box">
                    <div>
                      <p className="box-heading">Past Batches</p>
                      <p className="score">{dashboard?.postBatch}</p>
                    </div>
                    <div className="icon-circle">
                      <span className="mdi mdi-account-circle" />
                    </div>
                  </div>
                </CardBody>
              </Nav.Link>
            </Card>
          </div>
        </Col>
        <Col>
          <div className="batches-box">
            <Card>
              <Nav.Link
                eventKey="five"
                onClick={() => {
                  filterData("Ending")
                  setIsSelected("five")
                }}
                style={{ background: isSelected === "five" && "#E5E9FF" }}
              >
                <CardBody>
                  <div className="box">
                    <div>
                      <p className="box-heading">Ending This Week</p>
                      <p className="score">{dashboard?.endThisWeek}</p>
                    </div>
                    <div className="icon-circle">
                      <span className="mdi mdi-account-circle" />
                    </div>
                  </div>
                </CardBody>
              </Nav.Link>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default FilterBatches

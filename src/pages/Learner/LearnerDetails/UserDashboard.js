import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import Nav from "react-bootstrap/Nav"

const UserDashboard = ({ usersCount }) => {
  return (
    <Row>
      <Col>
        <div className="batches-box">
          <Card>
            <Nav.Link eventKey="first">
              <CardBody>
                <div className="box">
                  <div>
                    <p className="box-heading">Today New learner</p>
                    <p className="score">{usersCount?.todayNewLearner}</p>
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
            <Nav.Link eventKey="second">
              <CardBody>
                <div className="box">
                  <div>
                    <p className="box-heading">Total Learner</p>
                    <p className="score">{usersCount?.count}</p>
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
            <Nav.Link eventKey="third">
              <CardBody>
                <div className="box">
                  <div>
                    <p className="box-heading">
                      Learner Enrolled in active batches
                    </p>
                    <p className="score">
                      {usersCount?.learnersFromActiveBatches}
                    </p>
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
            <Nav.Link eventKey="fourth">
              <CardBody>
                <div className="box">
                  <div>
                    <p className="box-heading">
                      Learner Enrolled in All batches
                    </p>
                    <p className="score">
                      {usersCount?.learnersFromAllBatches}
                    </p>
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
  )
}

export default UserDashboard

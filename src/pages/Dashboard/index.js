import React, { Component } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"
import { apiFetch } from "store/actions"
import PropTypes from "prop-types"
import CourseList from "pages/Course/CourseList"
import "../Dashboard/dashboard.css"
import Chart from "../../assets/images/chart.png"
import circleChart from "../../assets/images/circle-chart.png"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      update: 0,
    }
  }

  componentDidMount() {
    const { learnersData, userRoles, onGetDashboard } = this.props
    // if (learnersData && !learnersData.length) {
    onGetDashboard({ search: "", day: "All" })
    // }
    this.setState({ learnersData, userRoles })
  }

  options = [
    { label: "All", value: "All" },
    { label: "Today", value: "0" },
    { label: "Yesterday", value: "1" },
    { label: "Last 7 days ", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 60 days", value: "60" },
    { label: "Last 90 days", value: "90" },
    { label: "Last year", value: "365" },
  ]

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* <Row>
              <Col md={8}>
                <div className="top-date-box">
                  <Select 
                    name="filter"
                    className="mb-4 select-width"
                    placeholder="Update"
                    options={this.options}
                    defaultValue={this.options[0]}
                    onChange={e => {
                      this.setState({ update: e.value })
                      this.props.onGetDashboard({ search: "", day: e.value })
                    }}
                  />
                </div>
              </Col>
              <Col md={4} className="d-flex justify-content-md-end align-items-start">
                <div>Welcome to Dashboard</div>
              </Col>
            </Row> */}
            <Row>
              <Col md={8}>
                <div className="top-date-box">
                  <span className="px-2 top-dash-heading">Dashboard</span>
                  <span className="px-2">From :</span>
                  <Select
                    name="filter"
                    className="mb-4 select-width"
                    placeholder="Update"
                    options={this.options}
                    defaultValue={this.options[0]}
                    onChange={e => {
                      this.setState({ update: e.value })
                      this.props.onGetDashboard({ search: "", day: e.value })
                    }}
                  />
                  <span className="px-2">To : </span>
                  <Select
                    name="filter"
                    className="mb-4 select-width"
                    placeholder="Update"
                    options={this.options}
                    defaultValue={this.options[0]}
                    onChange={e => {
                      this.setState({ update: e.value })
                      this.props.onGetDashboard({ search: "", day: e.value })
                    }}
                  />
                </div>
              </Col>
              <Col
                md={4}
                className="d-flex justify-content-md-end align-items-start"
              >
                <div>Welcome to Dashboard</div>
              </Col>
            </Row>

            {/* <Row className="mt-5">
              <Col sm={4} xxl={3}>
                <Card className="card-height">
                  <CardBody>
                    <h5>Learner Listing</h5>
                    <h4 className="mt-3">{this.props.learnerCount}</h4>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-height">
                  <CardBody>
                    <h5>Application Listing</h5>
                    <h4 className="mt-3">{this.props.applicationCount}</h4>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-height">
                  <CardBody>
                    <h5>Courses Listing</h5>
                    <h4 className="mt-3">0</h4>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}

            <Row className="mt-5">
              <Col sm={4} xxl={3}>
                <Card className="card-shadow">
                  <CardBody>
                    <div className="dashboard-box">
                      <div>
                        <p className="dashboard-box-heading">
                          New Registrations
                        </p>
                        <p className="score">69</p>
                      </div>
                      <div className="circle">
                        <span className="bx bx-search-alt bx-badge-check" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-shadow">
                  <CardBody>
                    <div className="dashboard-box">
                      <div>
                        <p className="dashboard-box-heading">
                          Average Attendance Rate
                        </p>
                        <p className="score">96.09%</p>
                      </div>
                      <div className="circle">
                        <span className="bx bx-search-alt bx-badge-check" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-shadow">
                  <CardBody>
                    <div className="dashboard-box">
                      <div>
                        <p className="dashboard-box-heading">
                          Average Session Duration
                        </p>
                        <p className="score">420 mins</p>
                      </div>
                      <div className="circle">
                        <span className="bx bx-search-alt bx-badge-check" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-shadow">
                  <CardBody>
                    <div className="dashboard-box">
                      <div>
                        <p className="dashboard-box-heading">Live Session</p>
                        <p className="score">36</p>
                      </div>
                      <div className="circle">
                        <span className="bx bx-search-alt bx-badge-check" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-shadow">
                  <CardBody>
                    <div className="dashboard-box">
                      <div>
                        <p className="dashboard-box-heading">
                          Enrollments Applications
                        </p>
                        <p className="score">320</p>
                      </div>
                      <div className="circle">
                        <span className="bx bx-search-alt bx-badge-check" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={4} xxl={3}>
                <Card className="card-shadow">
                  <CardBody>
                    <div className="dashboard-box">
                      <div>
                        <p className="dashboard-box-heading">
                          Course Published
                        </p>
                        <p className="score">6</p>
                      </div>
                      <div className="circle">
                        <span className="bx bx-search-alt bx-badge-check" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={7}>
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between mb-4">
                      <span className="chart-heading">Registrations</span>
                      <span className="chart-subheading">
                        01 Jan 2023 To 31 Jan 2023
                      </span>
                    </div>
                    <Row>
                      <Col md={6}>
                        <p className="mb-4 chart-subheading">January</p>
                        <p className="mb-4" style={{ fontSize: "22px" }}>
                          <strong>768</strong>
                        </p>
                        <p className="mb-4 chart-subheading">
                          <span className="text-green">+0.2%</span> From
                          Previous Period
                        </p>
                        <p className="mb-4 chart-subheading">Last Month </p>
                        <p className="mb-4" style={{ fontSize: "16px" }}>
                          <strong>696</strong>
                        </p>
                      </Col>
                      <Col md={6}>
                        <img src={Chart} alt="" className="img-height" />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={5}>
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between mb-4">
                      <span className="chart-heading">
                        Course Analysis: courses applied
                      </span>
                      <span className="chart-subheading">Last 1 month</span>
                    </div>
                    {/* <Row>
                      <Col md={6}><img src={circleChart} alt="" className="img-fluid" /></Col>
                      <Col md={6}>
                        <p className="mb-4">January</p>
                        <p className="mb-4">768</p>
                        <p className="mb-4"><span className="text-green">+0.2%</span> From Previous Period</p>
                        <p className="mb-4">Last Month </p>
                        <p className="mb-4">696</p>
                      </Col>
                    </Row> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Dashboard: PropTypes.array,
}

const mapStateToProps = ({ Dashboard, state, count }) => ({
  manageUser: Dashboard?.manageUser,
  applicationCount: Dashboard?.applicationCount,
  learnerCount: Dashboard?.learnerCount,
})

const mapDispatchToProps = dispatch => ({
  onGetDashboard: data => {
    dispatch(apiFetch(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

import React, { Component } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Table,
  Progress,
  Button,
} from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"
import { apiFetch } from "store/actions"
import PropTypes from "prop-types"
import CourseList from "pages/Course/CourseList"
import "../Dashboard/dashboard.css"
import Chart from "../../assets/images/chart.png"
import circleChart from "../../assets/images/circle-chart.png"
import Linechart from "./Linechart"
import DoughnutChart from "./DoughnutChart"
import getDashboardData, { getDashboardApi, getDashboardApi_ } from "../../helpers/fakebackend_helper"
import BarGraph from "./BarGraph"


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalUsers: 0, 
      todayUsers: 0, 
      dashboardData: null,
    };
  }

  componentDidMount() {
    const { onGetDashboard } = this.props;
  
    getDashboardApi_({})
      .then(response => {
  
        if (response || response.data.signupform && response.data.fullstack && response.data.collaborationlandingform && response.data.industryReadyFrom && response.data.jobready && response.code === 200 && response.data.contactus && response.data && response.data.totalusers && response.data.vTiger && response.data.todayusers && response.data.userTable &&  response.data.zoomData && response.data.techFitApplication && response.data.zoomwebinartechfit && response.data.sendInBlue && response.data.industryReadyProForm && response.data.homePagePopUp && response.data.signup && response.data.login && response.data.hirefromus) {
          this.setState({
            totalUsers: response.data.totalusers,
            todayUsers: response.data.todayusers,
            dashboardData: response.data,
            vTiger:response.data.vTiger,
            userTable:response.data.userTable,
            zoomData: response.data.zoomData,
            techFitApplication: response.data.techFitApplication,
            zoomwebinartechfit:response.data.zoomwebinartechfit,
            sendInBlue:response.data.sendInBlue,
            industryReadyProForm:response.data.industryReadyProForm,
            homePagePopUp:response.data.homePagePopUp,
            signup:response.data.signup,
            login:response.data.login,
            hirefromus:response.data.hirefromus,
            contactus:response.data.contactus,
            jobready:response.data.jobready,
            fullstack:response.data.fullstack,
            signupform:response.data.signupform,
            collaborationlandingform:response.data.collaborationlandingform,
            industryReadyFrom:response.data.industryReadyFrom,
          }, () => {
            this.forceUpdate();
          });
        } else {
          console.error("Unexpected API response:", response);
        }
      })
      .catch(error => {
        console.error("Error fetching dashboard data:", error);
      });
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
    const { dashboardData, jobready ,signupform, collaborationlandingform,industryReadyFrom,fullstack,totalUsers, todayUsers ,vTiger ,contactus,userTable,zoomData,techFitApplication,zoomwebinartechfit,sendInBlue,industryReadyProForm,homePagePopUp,signup,login,hirefromus} = this.state;
    const courseData = dashboardData && dashboardData.courseData ? dashboardData.courseData : [];
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
                    onChange={(selectedOption) => {
                      const e = { value: selectedOption.value }; // Define e here
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
              <Col md={6} xxl={7}>
                <Card className="card-height">
                  <CardBody>
                    <div className="d-flex justify-content-between mb-4">
                      <span className="chart-heading">Registrations</span>
                      <span className="chart-subheading">
                        01 Jan 2023 To 31 Jan 2023
                      </span>
                    </div>
                    <Row>
                      <Col md={4}>
                        <p className="mb-4 chart-subheading">January</p>
                        <p className="mb-4" style={{ fontSize: "22px" }}>
                          <strong>768</strong>
                        </p>
                        <p className="mb-4 chart-subheading">
                          <span className="text-green">+0.2%</span> From
                          Previous Period
                        </p>
                        <p className="mb-4 chart-subheading">Last Month </p>
                        <p className="" style={{ fontSize: "16px" }}>
                          <strong>696</strong>
                        </p>
                      </Col>
                      <Col md={8}>
                        <Linechart />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6} xxl={5}>
                <Card className="card-height">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-baseline mb-4">
                      <div className="chart-heading">
                        Course Analysis: courses applied
                      </div>
                      <div className="chart-subheading">
                        <FormGroup>
                          <Input id="exampleSelect" name="select" type="select">
                            <option selected>Last 1 month</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </Input>
                        </FormGroup>
                      </div>
                    </div>
                    <Row>
                    <Col md={12}>
                        <DoughnutChart />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={10} xxl={10}>
                <Card className="card-height">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-baseline mb-4">
                      <div className="chart-heading">
                        Total Users and Daily Users Chart
                      </div>
                      <div className="chart-subheading">
                        {/* <FormGroup>
                          <Input id="exampleSelect" name="select" type="select">
                            <option selected>Last 1 month</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </Input>
                        </FormGroup> */}
                      </div>
                    </div>
                    <Row>
                      <Col md={12}>
                        <BarGraph signupform={signupform} collaborationlandingform={collaborationlandingform} industryReadyFrom={industryReadyFrom} fullstack={fullstack} jobready={jobready} totalUsers={totalUsers} contactus={contactus} todayUsers={todayUsers} vTiger={vTiger} userTable={userTable} zoomData={zoomData}  techFitApplication={techFitApplication} zoomwebinartechfit={zoomwebinartechfit} sendInBlue={sendInBlue} industryReadyProForm={industryReadyProForm} homePagePopUp={homePagePopUp} signup={signup} login={login} hirefromus={hirefromus}/>
                      </Col>
                      {/* <div className="mt-3 text-center"> */}
                        {/* <button className="btn btn-primary btn-blue">
                          View All
                        </button> */}
                      {/* </div> */}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6} xxl={4}>
                <Card className="card-height">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-baseline mb-4">
                      <div className="chart-heading">Ongoing Batches </div>
                      <div className="chart-subheading d-flex">
                        <FormGroup>
                          <Input id="exampleSelect" name="select" type="select">
                            <option selected>Sort By</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </Input>
                        </FormGroup>
                        <FormGroup className="ms-3">
                          <Input id="exampleSelect" name="select" type="select">
                            <option selected>All Courses</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </Input>
                        </FormGroup>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table className="ongoing-table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Batch_32</div>
                              <div className="ongoing-light">
                                Full Stack web development
                              </div>
                            </td>
                            <td>
                              <div className="circle-progress-bar">
                                <progress value="30" min="0" max="100" style={{ visibility: 'hidden', height: '0', width: '0' }}>20%</progress>
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light">Completed</div>
                              <div className="ongoing-bold">37%</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Batch_32</div>
                              <div className="ongoing-light">
                                Full Stack web development
                              </div>
                            </td>
                            <td>
                              <div className="circle-progress-bar gradient-1">
                                <progress value="30" min="0" max="100" style={{ visibility: 'hidden', height: '0', width: '0' }}>20%</progress>
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light">Completed</div>
                              <div className="ongoing-bold">37%</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Batch_19</div>
                              <div className="ongoing-light">
                                Full Stack web development
                              </div>
                            </td>
                            <td>
                              <div className="circle-progress-bar gradient-2">
                                <progress
                                  value="30"
                                  min="0"
                                  max="100"
                                  style={{
                                    visibility: "hidden",
                                    height: "0",
                                    width: "0",
                                  }}
                                >
                                  20%
                                </progress>
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light">Completed</div>
                              <div className="ongoing-bold">72%</div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="text-end">
                      <Button color="primary">View All </Button>
                      <Button color="primary" outline className="ms-2">
                        Export{" "}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6} xxl={4}>
                <Card className="card-height">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div className="chart-heading">Classes </div>
                      <div className="chart-subheading d-flex">
                        <FormGroup>
                          <Input id="exampleSelect" name="select" type="select">
                            <option selected>Today</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </Input>
                        </FormGroup>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table className="ongoing-table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Class_23</div>
                              <div className="ongoing-light">
                                #Batch_12 - Full Stack Web Developer
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light red">Live now</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Class_12</div>
                              <div className="ongoing-light">
                                #Batch_5 - Java Full Stack Web Developer
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light red">Live now</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Class_28</div>
                              <div className="ongoing-light">
                                #Batch_24 - Python Full Stack Web Developer
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light">
                                10:00 AM - 05:00 PM
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="ongoing-bold">Class_28</div>
                              <div className="ongoing-light">
                                #Batch_24 - Python Full Stack Web Developer
                              </div>
                            </td>
                            <td>
                              <div className="ongoing-light">
                                10:00 AM - 05:00 PM
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
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
  onGetDashboard: async data => {
    try {
      const action = await dispatch(apiFetch(data));

      if (action.type === "API_FETCH") {
        const response = action.payload;


        const responseData = response.data;

        return responseData;
      } else {
        console.error("Unexpected action type:", action.type);
        throw new Error("Unexpected action type");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },
});




export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

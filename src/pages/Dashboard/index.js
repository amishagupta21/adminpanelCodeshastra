import React, { Component } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"
import { apiFetch } from "store/actions"
import PropTypes from "prop-types"

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
            <Row>
              <Col md={2}>
                <Select
                  name="filter"
                  className="mb-4"
                  placeholder="Update"
                  options={this.options}
                  defaultValue={this.options[0]}
                  onChange={e => {
                    this.setState({ update: e.value })
                    this.props.onGetDashboard({ search: "", day: e.value })
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={4}>
                <Card className="card-height">
                  <CardBody>
                    <h5>Learner Listing</h5>
                    <h4 className="mt-3">{this.props.learnerCount}</h4>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-height">
                  <CardBody>
                    <h5>Application Listing</h5>
                    <h4 className="mt-3">{this.props.applicationCount}</h4>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-height">
                  <CardBody>
                    <h5>Courses Listing</h5>
                    <h4 className="mt-3">0</h4>
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

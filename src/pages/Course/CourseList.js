import { React, useEffect, useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  ListGroup,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import dateFormate from "common/dateFormatter"
import Select from "react-select"
import { DeBounceSearch } from "common/DeBounceSearch"
import { ErrorMessage, Field, Formik } from "formik"
import * as Yup from "yup"
import tosterMsg from "components/Common/toster"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import {
//   getLearner,
//   deleteLearner,
//   getStatusFilter,
//   registerUser,
// } from "store/actions"
import { getCourses } from "store/Courses/actions"
import { useParams } from "react-router-dom"
import paginationFactory from "react-bootstrap-table2-paginator"
import "./courseList.css"
import { Tab, Tabs } from "react-bootstrap"
import LiveCourses from "./LiveCourses"
import Nav from "react-bootstrap/Nav"

function CourseList(props) {
  const params = useParams()

  document.title = "Users List"

  const { manageUser, usersCount } = props
  const [item, setItem] = useState(manageUser)
  const [activeTab, setActiveTab] = useState("Live")

  useEffect(() => {
    const { onGetCourses } = props
    onGetCourses(params.id)
  }, [])

  useEffect(() => {
    filterData("Live")
  }, [manageUser])

  const handleSearch = e => {
    const { onGetCourses } = props
    const data = {
      search: e,
    }
    onGetCourses(data)
    const { Courses } = props
    setState({ Courses })
  }

  const filterData = liveCourse => {
    setActiveTab(liveCourse)
    const filterItem = manageUser.filter(item => {
      return item.course_type === liveCourse
    })

    setItem(filterItem)
  }

  return (
    <>
      <Container fluid className="courseList">
        <Row>
          <h5>COURSES</h5>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Nav variant="pills">
                <Col sm={3}>
                  <Nav.Item>
                    <Card>
                      <CardBody
                        className="live-courses"
                        style={{ padding: "0" }}
                      >
                        <Nav.Link
                          eventKey="first"
                          onClick={() => filterData("Live")}
                        >
                          <div className="app-search p-2">
                            <div className="title-div">
                              <p>Live Courses</p>
                              <h5 className="pt-2">
                                {usersCount?.live_course_count}
                              </h5>
                            </div>
                          </div>
                        </Nav.Link>
                      </CardBody>
                    </Card>
                  </Nav.Item>
                </Col>
                <Col sm={1}></Col>
                <Col sm={3}>
                  <Nav.Item>
                    <Card>
                      <CardBody
                        className="live-courses"
                        style={{ padding: "0" }}
                      >
                        <Nav.Link
                          eventKey="second"
                          onClick={() => filterData("Library")}
                        >
                          <div className="app-search p-2">
                            <div className="title-div">
                              <p>Library Courses</p>
                              <h5 className="pt-2">
                                {usersCount?.library_course_count}
                              </h5>
                            </div>
                          </div>
                        </Nav.Link>
                      </CardBody>
                    </Card>
                  </Nav.Item>
                </Col>
              </Nav>
            </Row>
            <Col className="mt-5" sm={12}>
              <Tab.Content>
                <LiveCourses
                  activeTab={activeTab}
                  item={item}
                  manageUser={manageUser}
                  handleSearch={handleSearch}
                  usersCount={usersCount}
                />
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </>
  )
}

CourseList.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Courses: PropTypes.array,
}

const mapStateToProps = ({ Courses, state, count }) => ({
  manageUser: Courses?.manageUser,
  usersCount: Courses?.count,
  userRoles: Courses?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetCourses: data => dispatch(getCourses(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)

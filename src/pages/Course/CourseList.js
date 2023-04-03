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

function CourseList(props) {
  const params = useParams()

  document.title = "Users List"
  const [isExpanded, setIsExpanded] = useState(null)

  const [usersListData, setUsersListData] = useState([])
  const { manageUser, usersCount } = props
  const selectRow = {
    mode: "checkbox",
  }
  const options = [
    { label: "Full Stack Web Developer(Full Time)", value: "invited" },
    { label: "Full Stack Web Developer(Full Time)", value: "onboarded" },
    { label: "Python Full Stack Web Developer", value: "suspended" },
    { label: "Data Science Program", value: "de-activated" },
  ]

  useEffect(() => {
    const { onGetCourses } = props
    onGetCourses(params.id)
  }, [])

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{row?.id}</>,
      },
      {
        dataField: "course_title",
        text: "Course Name",
        sort: true,
      },

      {
        dataField: "variant_count",
        text: "Variant Counts",
        sort: true,
      },
      {
        dataField: "mentors",
        text: "Mentors",
        sort: true,
      },
      {
        dataField: "course_duration",
        text: "Duration",
        sort: true,
        formatter: (cellContent, user) => <>{user?.course_duration} months</>,
      },
      {
        dataField: "ongoing_batches",
        text: "Ongoing Batches",
        sort: true,
      },
      // {
      //   dataField: "email",
      //   text: "Learners",
      //   sort: true,
      // },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            {/* <DropdownToggle className="card-drop" tag="a">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle> */}
            {/* <DropdownMenu className="dropdown-menu-end"> */}
            <div className="me-2" onClick={() => onClickDelete(user)}>
              <i className="mdi mdi-eye font-size-16 text-primary" />
            </div>
            <div className="me-2" onClick={() => handleUserClick(user)}>
              <i className="mdi mdi-pencil font-size-16 text-success" />
            </div>

            {/* </DropdownMenu> */}
          </div>
        ),
      },
    ],
  }

  const handleSearch = e => {
    const { onGetCourses } = props
    const data = {
      search: e,
    }
    onGetCourses(data)
    const { Courses } = props
    setState({ Courses })
  }

  return (
    <>
      <Container fluid className="courseList">
        <Row>
          <h5>COURSES</h5>
          {/* <span>
          <Link to="/courses/edit">Edit</Link>
          </span> */}

          <Col sm="3">
            <div className="app-search p-2">
              <Card className="cardStyle">
                <CardBody>
                  <div className="title-div">
                    <p>Live Courses</p>
                    <h5 className="pt-2">{usersCount?.live_course_count}</h5>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col sm="3">
            <div className="app-search p-2">
              <Card className="cardStyle">
                <CardBody>
                  <div className="title-div">
                    <p>Library Courses</p>
                    <h5 className="pt-2">{usersCount?.library_course_count}</h5>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col sm="6">
            <div className="app-search p-2">
              <h5>LIBRARY COURSES</h5>
            </div>
          </Col>

          <Col sm="6">
            <div className="text-sm-end p-2">
              <Button
                type="button"
                variant="success"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={e => {
                  history.push("/courses/create")
                }}
              >
                <i className="mdi mdi-plus me-1" /> Create Library Course
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <>
                  <ToolkitProvider
                    key={isExpanded}
                    keyField="id"
                    columns={state.columns}
                    data={manageUser}
                  >
                    {toolkitProps => (
                      <>
                        <Row className="mb-3">
                          <Col sm="2">
                            <div className="app-search p-0">
                              <div className="position-relative">
                                <DeBounceSearch handleSearch={handleSearch} />

                                <span className="bx bx-search-alt" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="6"></Col>

                          <Col sm="2">
                            <Select
                              name="filter"
                              placeholder="Course Name"
                              options={options}
                            />
                          </Col>

                          <Col className="text-end" sm="2">
                            <Button
                              type="button"
                              className="btn mb-2 me-2"
                              // onClick={this.applyFilter}
                            >
                              <i className="mdi mdi-filter me-1" /> Apply Filter
                            </Button>

                            <Button
                              type="button"
                              color="secondary"
                              className="btn mb-2 me-2"
                            >
                              Export
                            </Button>
                          </Col>
                        </Row>
                        <Col xl="12">
                          <div className="table-responsive">
                            <h6 className="mt-2">
                              Total Live Courses: {usersCount?.count}{" "}
                            </h6>
                            <BootstrapTable
                              keyField={"id"}
                              responsive
                              bordered={false}
                              striped={false}
                              // defaultSorted={defaultSorted}
                              selectRow={selectRow}
                              classes={"table align-middle table-nowrap"}
                              headerWrapperClasses={"thead-light"}
                              {...toolkitProps.baseProps}
                              pagination={paginationFactory()}
                              noDataIndication={"No data found"}
                            />
                          </div>
                        </Col>
                      </>
                    )}
                  </ToolkitProvider>
                </>
              </CardBody>
            </Card>
          </Col>
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

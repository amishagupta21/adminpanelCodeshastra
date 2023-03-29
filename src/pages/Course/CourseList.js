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
import DeleteModal from "components/Common/DeleteModal"
import { ErrorMessage, Field, Formik } from "formik"
import * as Yup from "yup"
import tosterMsg from "components/Common/toster"
import PropTypes from "prop-types"
import { connect } from "react-redux"
// import {
//   getLearner,
//   deleteLearner,
//   getStatusFilter,
//   registerUser,
// } from "store/actions"
import { getCourses } from "store/Courses/actions"

function CourseList(props) {
  document.title = "Users List"
  const [isExpanded, setIsExpanded] = useState(null)

  const [usersListData, setUsersListData] = useState([])
  const { userProfile, data, profilePictureUrl } = props

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
    // onGetCourses(params.id)
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
        dataField: "nickName",
        text: "Course Name",
        sort: true,
      },

      {
        dataField: "created_at",
        text: "Variant Counts",
        sort: true,
        formatter: (cellContent, user) => dateFormate(user.created_at),
      },
      {
        dataField: "email",
        text: "Mentors",
        sort: true,
      },
      {
        dataField: "email",
        text: "Duration",
        sort: true,
      },
      {
        dataField: "email",
        text: "Ongoing Batches",
        sort: true,
      },
      {
        dataField: "email",
        text: "Learners",
        sort: true,
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <UncontrolledDropdown>
            <DropdownToggle className="card-drop" tag="a">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => handleUserClick(user)}>
                <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => onClickDelete(user)}>
                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
      },
    ],
  }

  return (
    <>
      <Container fluid>
        <Row>
          <h5>COURSES</h5>
          <Col sm="4">
            <div className="app-search p-2">
              <Card className="cardStyle">
                <CardBody>
                  <div className="title-div">
                    <p>Live Courses</p>
                    <h5 className="pt-2">8</h5>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col sm="4">
            <div className="app-search p-2">
              <Card className="cardStyle">
                <CardBody>
                  <div className="title-div">
                    <p>Library Courses</p>
                    <h5 className="pt-2">39</h5>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
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
                {usersListData && (
                  <>
                    <ToolkitProvider
                      key={isExpanded}
                      keyField="id"
                      columns={state.columns}
                      data={usersListData}
                    >
                      {toolkitProps => (
                        <>
                          <Row>
                            <Col sm="2">
                              <div className="app-search p-0">
                                <div className="position-relative">
                                  <DeBounceSearch
                                  // handleSearch={this.handleSearch}
                                  />

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
                                <i className="mdi mdi-filter me-1" /> Apply
                                Filter
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
                              />
                            </div>
                          </Col>
                        </>
                      )}
                    </ToolkitProvider>
                  </>
                )}
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
  // usersCount: Learner?.count,
  // userRoles: Learner?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetCourses: data => dispatch(getCourses(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)

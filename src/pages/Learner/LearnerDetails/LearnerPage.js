import React, { Component } from "react"
import _debounce from "lodash/debounce"
import { isEmpty, size } from "lodash"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getLearner,
  deleteLearner,
  getStatusFilter,
  registerUser,
} from "store/actions"
import dateFormate from "common/dateFormatter"
import { DeBounceSearch } from "components/Common/DeBounceSearch"
import paginationFactory from "react-bootstrap-table2-paginator"
import Select, { components } from "react-select"
import { Link } from "react-router-dom"
import "../learnerListing.css"
import ModalDelete from "components/Common/ModalDelete"
import { default as ReactSelect } from "react-select"
import LearnerTable from "../LearnerTable"

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}
class Learner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      deleteData: false,
      uid: "",
      user: {},
      manageUser: [],
      manageUserDataCount: 20,
      userRoles: [],
      selectedMulti: [],
      expanded: false,
      currentPage: 1,
      selected: [],
      selectedTestResult: [],
      selectedStatus: [],
      selectedCourseType: [],
      multiSelectTestResult: [],
      optionSelected: null,
      isFilterApplied: false,
      columns: [
        {
          dataField: "_id",
          sort: true,
          hidden: true,
          // formatter: (cellContent, user) => <>{row?._id}</>,
        },
        {
          dataField: "userProfileData.personal_details.full_name",
          text: "Name",
          sort: true,
        },
        {
          dataField: "email",
          text: "Email",
          sort: true,
        },
        {
          dataField: "userProfileData.occupation",
          text: "Occupation",
          sort: true,
        },
        {
          dataField: "phone",
          text: "Mobile",
          sort: true,
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
        },

        {
          dataField: "Updated At",
          text: "Updated At",
          sort: true,
          formatter: (cellContent, user) => dateFormate(user.updatedAt),
        },
        {
          dataField: "created_at",
          text: "Created At",
          sort: true,
          formatter: (cellContent, user) => dateFormate(user.createdAt),
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
                <Link to={`/learner-details/${user.uid}`}>
                  <DropdownItem>
                    <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                    Edit
                  </DropdownItem>
                </Link>
                <DropdownItem
                  onClick={() => {
                    this.toggle()
                    this.setState({ uid: user.uid })
                  }}
                  // onClick={() => this.deleteRow(user.uid)}
                >
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ),
        },
      ],
    }
    // this.toggle = this.toggle.bind(this)
    // this.handleOnSelect = this.handleOnSelect.bind(this)
    // this.handleOnSelectAll = this.handleOnSelectAll.bind(this)
  }

  deleteRow = uid => {
    const { onGetDeleteLearner } = this.props
    onGetDeleteLearner(uid)
    this.toggle(!this.state.modal)
  }

  componentDidMount() {
    const { manageUser, userRoles, onGetLearner, onGetStatusFilter } =
      this.props
    if (manageUser && !manageUser.length) {
      onGetLearner({ search: "" })
    }
    this.setState({ manageUser, userRoles })
  }

  componentDidUpdate(prevProps) {
    const { manageUser, userRoles, onGetLearner, deleteData } = this.props
    if (
      !isEmpty(manageUser) &&
      size(prevProps.manageUser) !== size(manageUser)
    ) {
      this.setState({ manageUser, isEdit: false })
    }
    if (prevProps.userRoles !== userRoles) {
      this.setState({ userRoles })
    }

    if (prevProps.deleteData !== deleteData) {
      onGetLearner({ search: "" })
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
    const data = {
      page: page,
      pageSize: this.state.manageUserDataCount,
    }
    this.props.onGetmanageUser(data)
  }

  handleSearch = e => {
    const { onGetLearner } = this.props
    const data = {
      search: e,
    }
    onGetLearner(data)
    const { Learner } = this.props
    this.setState({ Learner })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  options = [
    { label: "true ", value: "true" },
    { label: "false", value: "false" },
  ]

  testResult = [
    { label: "Student ", value: "STUDENT" },
    { label: "Professional", value: "PROFESSIONAL" },
    { label: "Unemployed", value: "UNEMPLOYED" },
  ]

  courseType = [
    { label: "Live", value: "Live" },
    { label: "Library", value: "Library" },
  ]

  handleFilterStatus = selectedOption => {
    if (this.state.selectedStatus.length === 0)
      this.setState({
        selectedStatus: [...this.state.selectedStatus, selectedOption.value],
      })
  }

  handleTestStatus = selectedOption => {
    let multiSelectTestResult = []
    selectedOption.map(item => {
      // test += "," + item.value
      multiSelectTestResult.push(item.value)
    })
    // test = test.substring(1)

    // if (this.state.selectedTestResult.length === 0)
    //   this.setState({
    //     selectedTestResult: [
    //       ...this.state.selectedTestResult,
    //       selectedOption.value,
    //       test,
    //     ],
    //   })
    this.setState({
      multiSelectTestResult: multiSelectTestResult.toString(),
    })
  }

  removeAll = () => {
    // let copy = [...this.state.selectedStatus]
    // this.setState({ selectedStatus: copy })
    this.setState({
      multiSelectTestResult: [],
      selectedStatus: [],
      selectedCourseType: [],
      isFilterApplied: false,
    })
    this.props.onGetLearner({ search: "" })
  }

  handleCourseType = selectedOption => {
    if (this.state.selectedCourseType.length === 0)
      this.setState({
        selectedCourseType: [
          ...this.state.selectedCourseType,
          selectedOption.value,
        ],
      })
  }

  applyFilter = () => {
    const {
      selectedTestResult,
      selectedStatus,
      selectedCourseType,
      multiSelectTestResult,
    } = this.state
    let params = {
      page: 1,
      perPage: 5102,
    }
    if (selectedStatus.length) {
      params.status = selectedStatus[0]
    }

    if (multiSelectTestResult.length) {
      params.learnerType = multiSelectTestResult
    }

    if (selectedCourseType.length) {
      params.courseType = selectedCourseType[0]
    }
    this.setState({ isFilterApplied: true })
    this.props.onGetStatusFilter(params)
  }

  removeStatus = removeItem => {
    const options = this?.state?.selectedStatus?.filter(
      item => item !== removeItem
    )
    this.setState({ selectedStatus: options })
  }
  removeTest = removeItem => {
    const dataArr = this?.state?.multiSelectTestResult?.split(",")
    const index = dataArr.indexOf(removeItem)
    if (index > -1) {
      dataArr.splice(index, 1)
    }

    const deleteItem = dataArr.join(",")
    this.setState({ multiSelectTestResult: deleteItem })
  }

  removeCourse = removeItem => {
    const options = this?.state?.selectedCourseType?.filter(
      item => item !== removeItem
    )
    this.setState({ selectedCourseType: options })
  }

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row._id],
      }))
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row._id),
      }))
    }
  }

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r._id)
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }))
    } else {
      this.setState(() => ({
        selected: [],
      }))
    }
  }

  render() {
    const { options, value, isFilterApplied } = this.state
    const { manageUserDataCount } = this.state
    const { usersCount, manageUser } = this.props
    const pageCount = parseInt(
      (usersCount + manageUserDataCount - 1) / manageUserDataCount
    )
    // const paginationPage = Array.apply(null, new Array(pageCount))

    const defaultSorted = [
      {
        dataField: "id",
        order: "desc",
      },
    ]

    const handleChange = selected => {
      this.setState({
        optionSelected: selected,
      })
    }

    const selectRow = {
      mode: "checkbox",
      clickToSelect: false,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
    }

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid className="learnerListing">
            <Breadcrumbs title="Unikaksha" breadcrumbItem="Learner" />

            <ModalDelete
              isOpen={this.state.modal}
              toggle={this.toggle}
              deleteRow={this.deleteRow}
              uid={this.state.uid}
            />
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <ToolkitProvider
                      key={this.state.expanded}
                      keyField="_id"
                      columns={this.state.columns}
                      data={manageUser}
                    >
                      {toolkitProps => (
                        <React.Fragment>
                          <Row>
                            <Col sm="2">
                              <div className="app-search p-0">
                                <div className="position-relative">
                                  <DeBounceSearch
                                    handleSearch={this.handleSearch}
                                  />

                                  <span className="bx bx-search-alt" />
                                </div>
                              </div>
                            </Col>
                            <Col sm="2"></Col>
                            <Col sm="2">
                              <Select
                                name="filter"
                                placeholder="Status"
                                value={value}
                                onChange={this.handleFilterStatus}
                                options={this.options}
                              />
                            </Col>
                            <Col sm="2">
                              <Select
                                name="filter"
                                isMulti
                                placeholder="Learner Type"
                                onChange={this.handleTestStatus}
                                options={this.testResult}
                                components={{
                                  Option,
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Select
                                name="filter"
                                placeholder="Course Type"
                                onChange={this.handleCourseType}
                                options={this.courseType}
                              />
                            </Col>

                            <Col className="text-end" sm="2">
                              {this?.state.selectedStatus?.length > 0 ||
                              this.state.multiSelectTestResult?.length > 0 ||
                              this.state.selectedCourseType?.length > 0 ? (
                                <Button
                                  type="button"
                                  className="btn mb-2 me-2"
                                  onClick={this.applyFilter}
                                >
                                  <i className="mdi mdi-filter me-1" /> Apply
                                  Filter
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  className="btn mb-2 me-2"
                                  disabled
                                  onClick={this.applyFilter}
                                >
                                  <i className="mdi mdi-filter me-1" /> Apply
                                  Filter
                                </Button>
                              )}

                              <Button
                                type="button"
                                color="secondary"
                                className="btn mb-2 me-2"
                              >
                                Export
                              </Button>
                            </Col>
                          </Row>

                          {isFilterApplied && (
                            <Row className="mt-3">
                              <h6 className="filter-text">Filter Applied: </h6>
                              <h6 className="filter-text d-flex align-items-baseline mt-1 mb-0">
                                Status:{" "}
                                <div className="filter-status mb-3 d-flex">
                                  {this.state.selectedStatus?.length > 0 &&
                                    this.state.selectedStatus.map(item => {
                                      return (
                                        <>
                                          <div className="filter-chips me-3">
                                            {item}
                                            <span
                                              onClick={() =>
                                                this.removeStatus(item)
                                              }
                                              className="badge"
                                            >
                                              X
                                            </span>
                                          </div>
                                        </>
                                      )
                                    })}{" "}
                                </div>
                              </h6>
                              <h6 className="filter-text d-flex align-items-baseline mb-0">
                                Test Result:
                                <div className="filter-status mb-3 d-flex">
                                  {this.state.multiSelectTestResult?.length >
                                    0 &&
                                    this.state?.multiSelectTestResult
                                      .split(",")
                                      .map((item, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="filter-chips me-3 "
                                          >
                                            {item}
                                            <span
                                              className="badge"
                                              onClick={() =>
                                                this.removeTest(item)
                                              }
                                            >
                                              X
                                            </span>
                                          </div>
                                        )
                                      })}
                                </div>
                              </h6>
                              <h6 className="filter-text d-flex align-items-baseline">
                                Course Name:
                                <div className="filter-status d-flex">
                                  {this.state.selectedCourseType.map(
                                    (item, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="filter-chips me-3"
                                        >
                                          {item}
                                          <span
                                            className="badge"
                                            onClick={() =>
                                              this.removeCourse(item)
                                            }
                                          >
                                            X
                                          </span>
                                        </div>
                                      )
                                    }
                                  )}{" "}
                                </div>
                                <Link>
                                  <p onClick={this.removeAll}>Remove All</p>
                                </Link>
                              </h6>
                            </Row>
                          )}
                          <LearnerTable
                            manageUser={manageUser}
                            defaultSorted={defaultSorted}
                            selectRow={selectRow}
                            key={this.state.expanded}
                            columns={this.state.columns}
                          />
                        </React.Fragment>
                      )}
                    </ToolkitProvider>
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

Learner.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Learner: PropTypes.array,
}

const mapStateToProps = ({ Learner, state, count }) => ({
  manageUser: Learner?.manageUser,
  usersCount: Learner?.count,
  userRoles: Learner?.roles,
  deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetLearner: data => dispatch(getLearner(data)),
  onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Learner)
import React, { Component } from "react"
import _debounce from "lodash/debounce"
import { isEmpty, isNumber, size } from "lodash"
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
  Spinner,
  ModalFooter,
} from "reactstrap"
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import Breadcrumbs from "components/Common/Breadcrumb"
import Nav from "react-bootstrap/Nav"
import jsPDF from "jspdf"
import "jspdf-autotable"

import {
  getLearner,
  deleteLearner,
  getStatusFilter,
  registerUser,
  getAllLearner,
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
import blueTick from "../../../assets/fonts/blue-tick.svg"
import UserDashboard from "./UserDashboard"
import { ExportCSVButton } from "react-bootstrap-table"

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
class LearnerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      deleteData: false,
      uid: "",
      user: {},
      manageUser: [],
      manageUserLoader: "",
      manageUserDataCount: 20,
      userRoles: [],
      selectedMulti: [],
      expanded: false,
      usersCount: [],
      selected: [],
      selectedTestResult: [],
      selectedStatus: [],
      selectedCourseType: [],
      multiSelectTestResult: [],
      optionSelected: null,
      isFilterApplied: false,
      totalPages: 1,
      currentPage: 1,
      totalLearner: "",
      columns: [
        {
          dataField: "_id",
          sort: true,
          hidden: true,
          csvExport: false,
          // formatter: (cellContent, user) => <>{user?.id}</>
          // formatter: (cellContent, user) => <>{row?._id}</>,
        },
        {
          dataField: "fullName",
          text: "Name",
          sort: true,
          formatter: (cellContent, user) => (
            <div className="fw-bold">{user?.fullName}</div>
          ),
        },
        {
          dataField: "email",
          text: "Email",
          sort: true,
          formatter: (cellContent, user) => (
            <div>
              {user?.email}&nbsp;
              <img src={blueTick} />
            </div>
          ),
        },
        {
          dataField: "phone",
          text: "Mobile",
          sort: true,
          formatter: (cellContent, user) => (
            <div>
              {user?.phone}&nbsp;
              <img src={blueTick} />
            </div>
          ),
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
          formatter: (cellContent, user) => {
            if (user?.status === true) {
              return <span className="btn-status-active">Active</span>
            } else if (user?.status === false) {
              return <span className="btn-status-inactive">Inactive</span>
            } else {
              return <span></span>
            }
          },
        },
        {
          dataField: "userProfileData.education_details.highest_qualification",
          text: "Highest Education",
          sort: true,
        },
        {
          dataField: "userProfileData.occupation",
          text: "Learner Type",
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
            <div className="d-flex">
              <Link to={`/learner-details/${user.uid}`}>
                <i className="mdi mdi-pencil font-size-16 text-success me-2" />
              </Link>
              <Link
                onClick={() => {
                  this.toggle()
                  this.setState({ uid: user.uid })
                  // onClick={() => this.deleteRow(user.uid)}
                }}
              >
                <i className="mdi mdi-trash-can font-size-16 text-danger" />
              </Link>
            </div>
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

  componentDidMount(page, sizePerPage, currentPage, totalPages, duration) {
    const {
      manageUser,
      userRoles,
      onGetLearner,
      onGetAllLearner,
      onGetStatusFilter,
      usersCount,
    } = this.props
    if (manageUser && !manageUser.length) {
      onGetLearner({
        search: "",
        page: page,
        usersCount,
        duration,
        currentPage,
        sizePerPage,
        totalPages,
      })
    }

    this.setState({
      manageUser,
      userRoles,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      manageUser,
      userRoles,
      onGetLearner,
      deleteData,
      currentPage,
      totalPages,
    } = this.props
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

    if (prevState.currentPage !== this.state.currentPage) {
      onGetLearner({ currentPage: this.state.currentPage })
    }
  }
  // handlePageChange = page => {
  //   this.setState({ currentPage: page })
  //   const data = {
  //     page: page,
  //     pageSize: this.state.manageUserDataCount,
  //   }
  //   this.props.onGetmanageUser(data)
  // }

  handleSearch = e => {
    const { onGetLearner } = this.props
    const data = {
      search: e,
    }
    onGetLearner(data)
    const { Learner } = this.props
    this.setState({ Learner })
  }

  toggle = () => {
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

  handleDownloadPDF = () => {
    const doc = new jsPDF("landscape")

    const headers = this.state.columns.map(column => {
      return column.text
    })

    const data = this.state.manageUser.map(user => {
      return [
        "",
        user.fullName,
        user.email,
        user.phone,
        user.status === true ? "Active" : "Inactive",
        user.userProfileData?.education_details?.highest_qualification,
        user.userProfileData?.occupation,
        dateFormate(user.updatedAt),
        dateFormate(user.createdAt),
      ]
    })

    doc.autoTable({
      head: [headers],
      body: data,
    })

    doc.save("document.pdf")
  }

  exportToCSV = () => {
    const { manageUser } = this.state // Replace with your data source
    const headers = [
      "Name", // Replace with your column headers
      "Email",
      "Mobile",
      "Status",
      "Highest Education",
      "Learner Type",
      "Updated At",
      "Created At",
    ]

    const csvRows = []
    csvRows.push(headers.join(",")) // Add the headers as the first row

    manageUser.forEach(user => {
      const rowData = [
        user.fullName,
        user.email,
        user.phone,
        user.status,
        user.userProfileData?.education_details?.highest_qualification,
        user.userProfileData?.occupation,
        dateFormate(user.updatedAt),
        dateFormate(user.createdAt),
      ]
      csvRows.push(rowData.join(","))
    })

    const csvData = csvRows.join("\n")
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = url
    a.download = "data.csv"

    document.body.appendChild(a)
    a.click()

    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  handleTestStatus = selectedOption => {
    this.removeAll()
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
      perPage: 39548,
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

  // componentDidMount() {
  //   if()
  // }

  // handleOnSelectAll = (isSelect, rows) => {
  //   const ids = rows.map(r => r._id)
  //   if (isSelect) {
  //     this.setState(() => ({
  //       selected: ids,
  //     }))
  //   } else {
  //     this.setState(() => ({
  //       selected: [],
  //     }))
  //   }
  // }

  render() {
    const {
      options,
      value,
      isFilterApplied,
      currentPage,
      setCurrentPage,
      totalPages,
    } = this.state

    const { manageUserDataCount } = this.state
    const { usersCount, manageUser, manageUserLoader } = this.props

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
      // selected: this.state.selected,
      // onSelect: this.handleOnSelect,
      // onSelectAll: this.handleOnSelectAll,
    }

    const sendState = value => {
      this.setState({
        currentPage: value,
      })
    }

   
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid className="learnerListing">
            <Breadcrumbs title="Unikaksha" breadcrumbItem="Users" />
            <UserDashboard usersCount={usersCount} />
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
                            <Col md={12}>
                              <div className="top-search-box">
                                <Col md={12} lg={2}>
                                  <div className="app-search p-0 pb-2">
                                    <div className="position-relative">
                                      <DeBounceSearch
                                        handleSearch={this.handleSearch}
                                      />
                                      <span className="bx bx-search-alt" />
                                    </div>
                                  </div>
                                </Col>
                                <Col
                                  md={12}
                                  lg={10}
                                  className="d-lg-flex justify-content-lg-end"
                                >
                                  <div>
                                    <Select
                                      name="filter"
                                      placeholder="Status"
                                      value={value}
                                      onChange={this.handleFilterStatus}
                                      options={this.options}
                                      className="sel-width"
                                    />
                                  </div>
                                  <div>
                                    <Select
                                      className="sel-width"
                                      name="filter"
                                      isMulti
                                      placeholder="Learner Type"
                                      onChange={this.handleTestStatus}
                                      options={this.testResult}
                                      components={{
                                        Option,
                                      }}
                                    />
                                  </div>

                                  <div>
                                    {this?.state.selectedStatus?.length > 0 ||
                                    this.state.multiSelectTestResult?.length >
                                      0 ||
                                    this.state.selectedCourseType?.length >
                                      0 ? (
                                      <Button
                                        type="button"
                                        className="btn mb-2 me-2"
                                        onClick={this.applyFilter}
                                      >
                                        <i className="mdi mdi-filter me-1" />{" "}
                                        Apply Filter
                                      </Button>
                                    ) : (
                                      <Button
                                        type="button"
                                        className="btn mb-2 me-2"
                                        disabled
                                        onClick={this.applyFilter}
                                      >
                                        <i className="mdi mdi-filter me-1" />{" "}
                                        Apply Filter
                                      </Button>
                                    )}
                                  </div>
                                  <div className="text-end">
                                    {/* <Button color="secondary">Export</Button> */}
                                    <UncontrolledDropdown
                                      className="me-2"
                                      direction="down"
                                    >
                                      <DropdownToggle caret color="primary">
                                        Export{" "}
                                        <i className="mdi mdi-menu-down"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem
                                          onClick={this.handleDownloadPDF}
                                        >
                                          Download as pdf
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={this.exportToCSV}
                                        >
                                          Download as CSV
                                        </DropdownItem>{" "}
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
                                </Col>
                              </div>
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
                            manageUserLoader={manageUserLoader}
                            setState={data => this.setState(data)}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            usersCount={usersCount?.count}
                            setCurrentPage={sendState}
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

LearnerPage.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Learner: PropTypes.array,
  manageUserLoader: PropTypes.any,
}

const mapStateToProps = ({ Learner, state, count }) => ({
  manageUser: Learner?.manageUser,
  manageUserLoader: Learner?.manageUserLoader,
  usersCount: Learner?.count,
  userRoles: Learner?.roles,
  deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetLearner: data => dispatch(getLearner(data)),
  // onGetAllLearner: data => dispatch(getAllLearner(data)),
  onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LearnerPage)

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
import { getLearner, deleteLearner } from "store/actions"
import dateFormate from "common/dateFormatter"
import { DeBounceSearch } from "components/Common/DeBounceSearch"
import paginationFactory from "react-bootstrap-table2-paginator"
import Select from "react-select"
import { Link } from "react-router-dom"
import "./learnerListing.css"
import ModalDelete from "components/Common/ModalDelete"
import { use } from "i18next"

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
      columns: [
        {
          dataField: "id",
          sort: true,
          hidden: true,
          formatter: (cellContent, user) => <>{row?._id}</>,
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
                <Link to="/learner-details">
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
    this.toggle = this.toggle.bind(this)
  }

  deleteRow = uid => {
    const { onGetDeleteLearner } = this.props
    onGetDeleteLearner(uid)
    this.toggle(!this.state.modal)
  }

  componentDidMount() {
    const { manageUser, userRoles, onGetLearner } = this.props
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

  options = [
    { label: "INVITED ", value: "invited" },
    { label: "  ONBOARDED", value: "onboarded" },
    { label: "  SUSPENDED ", value: "suspended" },
    { label: "    DEACTIVATED ", value: "de-activated" },
  ]

  handleFilter = status => {
    setFilters(prev => ({ ...prev, page: 1, status: status.value }))
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
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

    const selectRow = {
      mode: "checkbox",
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
                      keyField="id"
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
                            <Col sm="1"></Col>
                            <Col sm="1">
                              <Select
                                name="filter"
                                // value={filter}
                                onChange={this.handleFilter}
                                placeholder="Status"
                                options={this.options}
                              />
                            </Col>
                            <Col sm="2">
                              <Select
                                name="filter"
                                placeholder="Test Result"
                                options={this.options}
                              />
                            </Col>
                            <Col sm="2">
                              <Select
                                name="filter"
                                placeholder="Course Type"
                                options={this.options}
                              />
                            </Col>
                            <Col sm="2">
                              <Select
                                name="filter"
                                placeholder="Course Name"
                                options={this.options}
                              />
                            </Col>
                            <Col className="text-end" sm="2">
                              <Button
                                type="button"
                                className="btn mb-2 me-2"
                                // onClick={this.handleUserClicks}
                              >
                                <i className="mdi mdi-filter me-1" /> Apply
                                Filter
                              </Button>
                              <Button
                                type="button"
                                color="secondary"
                                className="btn mb-2 me-2"
                                // onClick={this.handleUserClicks}
                              >
                                Export
                              </Button>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <h6 className="filter-text">Filter Applied: </h6>
                            <h6 className="filter-text d-flex align-items-baseline mt-1 mb-0">
                              Status:{" "}
                              <ul className="filter-status">
                                <li>
                                  <button
                                    type="button"
                                    className="btn filter-chips"
                                  >
                                    Student <span className="badge">X</span>
                                  </button>
                                </li>
                              </ul>
                            </h6>
                            <h6 className="filter-text d-flex align-items-baseline mb-0">
                              Test Result:
                              <ul className="filter-status">
                                <li>
                                  <button
                                    type="button"
                                    className="btn filter-chips"
                                  >
                                    Working Professional{" "}
                                    <span className="badge">X</span>
                                  </button>
                                </li>
                              </ul>
                            </h6>
                            <h6 className="filter-text d-flex align-items-baseline mb-3">
                              Course Name:
                              <ul className="filter-status">
                                <li>
                                  <button
                                    type="button"
                                    className="btn filter-chips"
                                  >
                                    Full Stack Web Developer (Full Time)
                                    <span className="badge">X</span>
                                  </button>
                                </li>
                              </ul>
                            </h6>
                          </Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                pagination={paginationFactory()}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Learner)

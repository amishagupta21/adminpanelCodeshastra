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
} from "reactstrap"
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import Breadcrumbs from "components/Common/Breadcrumb"
import { getApplicationListing } from "store/actions"
import dateFormate from "common/dateFormatter"
import { DeBounceSearch } from "components/Common/DeBounceSearch"
import paginationFactory from "react-bootstrap-table2-paginator"
import Select from "react-select"
import "./applicationListing.css"

const { SearchBar } = Search

class ApplicationListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteModal: false,
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
          dataField: "application_number",
          text: "Application No",
          sort: true,
        },
        {
          dataField: "created_at",
          text: "Created At",
          sort: true,
          formatter: (cellContent, user) => dateFormate(user.createdAt),
        },
        {
          dataField: "course_title",
          text: "Course",
          sort: true,
        },
        {
          dataField: "courseDetail.course_type",
          text: "Course Type",
          sort: true,
        },
        {
          dataField: "userDetail.email",
          text: "Email",
          sort: true,
        },
        {
          dataField: "userDetail.phone",
          text: "Phone",
          sort: true,
        },

        {
          dataField: "application_stage",
          text: "Application Stage",
          sort: true,
        },
        {
          dataField: "m_status",
          text: "Status",
          sort: true,
        },

        {
          dataField: "Actions",
          text: "Actions",
          formatter: (cellContent, user) => (
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
            >
              View
            </Button>
          ),
        },
      ],
    }
  }

  componentDidMount() {
    const { manageUser, userRoles, onGetApplicationListing } = this.props
    if (manageUser && !manageUser.length) {
      onGetApplicationListing({ search: "" })
    }
    this.setState({ manageUser, userRoles })
  }

  componentDidUpdate(prevProps) {
    const { manageUser, userRoles } = this.props
    if (
      !isEmpty(manageUser) &&
      size(prevProps.manageUser) !== size(manageUser)
    ) {
      this.setState({ manageUser, isEdit: false })
    }
    if (prevProps.userRoles !== userRoles) {
      this.setState({ userRoles })
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
    const { onGetApplicationListing } = this.props

    const data = {
      search: e,
    }
    onGetApplicationListing(data)
    const { ApplicationListing } = this.props
    this.setState({ ApplicationListing })
  }

  options = [
    { label: "INVITED ", value: "invited" },
    { label: "  ONBOARDED", value: "onboarded" },
    { label: "  SUSPENDED ", value: "suspended" },
    { label: "    DEACTIVATED ", value: "de-activated" },
  ]

  render() {
    const { manageUserDataCount } = this.state
    const { usersCount, manageUser } = this.props
    const pageCount = parseInt(
      (usersCount + manageUserDataCount - 1) / manageUserDataCount
    )
    const paginationPage = Array.apply(null, new Array(pageCount))

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
          <Container fluid>
            <Breadcrumbs title="Unikaksha" breadcrumbItem="All Applications" />
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <ToolkitProvider
                      key={this.state.expanded}
                      keyField="id"
                      columns={this.state.columns}
                      data={manageUser}
                      search
                    >
                      {toolkitProps => (
                        <React.Fragment>
                          <Row>
                            <Col sm="2">
                              <div className="app-search p-0">
                                <div className="position-relative">
                                  {/* <DeBounceSearch
                                    handleSearch={this.handleSearch}
                                  /> */}
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="search"
                                    handleSearch={this.handleSearch}
                                    placeholder="Search by Application No"
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
                                // onChange={this.handleFilter}
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
                                onClick={this.handleUserClicks}
                              >
                                <i className="mdi mdi-filter me-1" /> Apply
                                Filter
                              </Button>
                              <Button
                                type="button"
                                color="secondary"
                                className="btn mb-2 me-2"
                                onClick={this.handleUserClicks}
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
                    {/* <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                      {this.state.currentPage !== 1 && (
                        <>
                          <PaginationItem>
                            <PaginationLink
                              first
                              onClick={() => this.handlePageChange(1)}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() =>
                                this.handlePageChange(
                                  this.state.currentPage - 1
                                )
                              }
                              previous
                            />
                          </PaginationItem>
                        </>
                      )}

                      {paginationPage.map((page, index) => {
                        if (this.state.currentPage === index + 1) {
                          return (
                            <PaginationItem key={index + 1} active>
                              <PaginationLink
                                onClick={() => this.handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else {
                          return (
                            <PaginationItem key={index + 1}>
                              <PaginationLink
                                onClick={() => this.handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      })}

                      {this.state.currentPage !== pageCount && (
                        <>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() =>
                                this.handlePageChange(
                                  this.state.currentPage + 1
                                )
                              }
                              next
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => this.handlePageChange(pageCount)}
                              last
                            />
                          </PaginationItem>
                        </>
                      )}
                    </Pagination> */}
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

ApplicationListing.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  ApplicationListing: PropTypes.array,
}

const mapStateToProps = ({ ApplicationListing, state }) => (
  console.log(ApplicationListing, "ApplicationListing////"),
  {
    manageUser: ApplicationListing?.manageUser,
    usersCount: ApplicationListing?.count,
    userRoles: ApplicationListing?.roles,
  }
)

const mapDispatchToProps = dispatch => ({
  onGetApplicationListing: data => dispatch(getApplicationListing(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListing)

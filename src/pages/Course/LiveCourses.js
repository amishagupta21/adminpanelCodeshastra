import React, { useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import Select, { components } from "react-select"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link } from "react-router-dom"
import "./liveCourses.css"
import ViewCoursesModal from "./ViewCoursesModal"
import CourseTable from "./CourseTable"
import paginationFactory from "react-bootstrap-table2-paginator"

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

const LiveCourses = ({
  item,
  usersCount,
  handleSearch,
  activeTab,
  manageUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const [selectedDropdown, setSelectedDropdown] = useState("")
  const [dropdown, setDropdown] = useState([])
  const [modal, setModal] = React.useState(false)
  const [viewData, setViewData] = useState("")

  const toggle = () => setModal(!modal)

  // const [selectedValue, setSelectedValue] = useState([])

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
            <div className="me-2">
              <i
                onClick={e => toggle(e, setViewData(user))}
                className="mdi mdi-eye font-size-16 text-primary"
              />
            </div>
            <div className="me-2">
              <Link to={`/courses/edit/${user.id}`} className="text-muted">
                <i className="mdi mdi-pencil font-size-16 text-success" />
              </Link>
            </div>

            {/* </DropdownMenu> */}
          </div>
        ),
      },
    ],
  }

  const options = [
    { label: "Full Stack Web Developer(Full Time)", value: "fullStack" },
    { label: "Python Full Stack Web Developer", value: "pythonDeveloper" },
    { label: "Data Science Program", value: "dataScience" },
  ]

  const courseName = selectedOption => {
    // if (selectedDropdown.length === 0)
    setDropdown(oldItems => {
      return [...oldItems, selectedOption]
    })
  }

  const courseNameDelete = removeItem => {
    const deleteValue = dropdown.filter(
      item => item?.value !== removeItem?.value && item
    )
    setDropdown(deleteValue)
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const handleOnSelect = (row, isSelect) => {
    if (isSelect && row.id < 3) {
      alert("Oops, You can not select Product ID which less than 3")
      return false // return false to deny current select action
    }
    return true // return true or dont return to approve current select action
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      return rows.filter(r => r.id >= 3).map(r => r.id)
    }
  }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  }

  // const applyFilter = () => {
  //   if (selectedCourseType.length) {
  //     params.courseType = selectedCourseType[0]
  //   }
  //   this.setState({ isFilterApplied: true })
  //   this.props.onGetStatusFilter(params)
  // }

  return (
    <>
      <ViewCoursesModal modal={modal} toggle={toggle} viewData={viewData} />

      <Row className="align-items-center">
        <Col sm="6">
          <div className="app-search p-2">
            <h5>{activeTab === "Live" ? "Live" : "Library"} COURSES</h5>
          </div>
        </Col>

        <Col sm="6">
          <div className="text-sm-end p-2">
            <Button
              type="button"
              variant="success"
              color="success"
              className="btn-rounded mb-2 me-2"
              // onClick={e => {
              //   history.push("/courses/create")
              // }}
            >
              <i className="mdi mdi-plus me-1" /> Create{" "}
              {activeTab === "Live" ? "Live" : "Library"} Course
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
                  keyField="_id"
                  columns={state?.columns}
                  data={item}
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
                            //value={value}
                            components={{
                              Option,
                            }}
                            options={options}
                            onChange={courseName}
                          />
                        </Col>

                        <Col className="text-end" sm="2">
                          {dropdown.length > 0 ? (
                            <Button
                              type="button"
                              className="btn mb-2 me-2"
                              // onClick={applyFilter}
                            >
                              <i className="mdi mdi-filter me-1" /> Apply Filter
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              className="btn mb-2 me-2"
                              disabled
                              // onClick={applyFilter}
                            >
                              <i className="mdi mdi-filter me-1" /> Apply Filter
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
                        {dropdown.length > 0 && (
                          <h6 className="filter-text d-flex align-items-baseline mt-3 mb-0">
                            Test Result:
                            <div className="filter-status mb-3 d-flex">
                              {dropdown.map(item => {
                                return (
                                  <>
                                    <div className="filter-chips me-3">
                                      {item.label}
                                      <span
                                        className="badge"
                                        onClick={() => courseNameDelete(item)}
                                      >
                                        X
                                      </span>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                          </h6>
                        )}
                      </Row>
                      <CourseTable
                        activeTab={activeTab}
                        toolkitProps={toolkitProps}
                        usersCount={usersCount}
                      />
                    </>
                  )}
                </ToolkitProvider>
              </>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default LiveCourses

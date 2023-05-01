import React, { useState } from "react"

import { Row, Col, Card, CardBody, Button } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import Select from "react-select"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link } from "react-router-dom"
import paginationFactory from "react-bootstrap-table2-paginator"

const LiveCourses = ({ item, usersCount, handleSearch, activeTab }) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const [selectedDropdown, setSelectedDropdown] = useState([])

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
              <i className="mdi mdi-eye font-size-16 text-primary" />
            </div>
            <div className="me-2" onClick={() => handleUserClick(user)}>
              <Link to="/courses/edit" className="text-muted">
                <i className="mdi mdi-pencil font-size-16 text-success" />
              </Link>
            </div>

            {/* </DropdownMenu> */}
          </div>
        ),
      },
    ],
  }

  const selectRow = {
    mode: "checkbox",
  }

  const options = [
    { label: "Full Stack Web Developer(Full Time)", value: "fullStack" },
    // { label: "Full Stack Web Developer(Full Time)", value: "onboarded" },
    { label: "Python Full Stack Web Developer", value: "pythonDeveloper" },
    { label: "Data Science Program", value: "dataScience" },
  ]

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const courseName = selectedOption => {
    console.log(selectedOption, "//////selectedOption")
    if (selectedDropdown.length === 0)
      setSelectedDropdown({
        selectedDropdown: [...selectedDropdown, selectedOption.value],
      })
  }

  return (
    <>
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
                            options={options}
                            onChange={courseName}
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
                        {/* {selectedDropdown.map(item => {
                          return (
                            <>
                              <div className="filter-chips me-3">{item}</div>
                            </>
                          )
                        })} */}
                        {/* <h1>{selectedDropdown}</h1> */}
                      </Row>
                      <Col xl="12">
                        <div className="table-responsive">
                          <h6 className="mt-2">
                            Total {activeTab === "Live" ? "Live" : "Library"}{" "}
                            Courses:{" "}
                            {activeTab === "Live"
                              ? usersCount?.live_course_count
                              : usersCount?.library_course_count}{" "}
                          </h6>
                          <BootstrapTable
                            keyField={"_id"}
                            responsive
                            bordered={false}
                            striped={false}
                            defaultSorted={defaultSorted}
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
    </>
  )
}

export default LiveCourses

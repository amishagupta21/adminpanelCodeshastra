import { React, useState, Container } from "react"
import { DeBounceSearch } from "components/Common/DeBounceSearch"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import { CardGroup } from "react-bootstrap"
import courseIMG from "../../assets/images/stack.webp"
import liveIcon from "../../assets/images/live.png"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Form } from "react-bootstrap"
import dateFormate from "common/dateFormatter"
import "./CourseStyle.scss"
import { Pagination, PaginationLink, PaginationItem } from "reactstrap"
import Select from "react-select"
import { useHistory } from "react-router-dom";

export function CourseList({
  courseList,
  isLoading,
  handleSearch,
  handlePageChange,
  currentPage,
  handleFilter,
  filter,
}) {
  document.title = "Course List"
  let courses = courseList?.data?.result
  const columnsPerRow = 4
  const defaultPageCount = 5
  const history = useHistory();
  const pageCount = parseInt(
    (courseList.data.count + defaultPageCount - 1) / defaultPageCount
  )
  const filterOptions = [
    { label: "Draft ", value: "Draft" },
    { label: "Published", value: "Published" },
  ]
  const paginationPage = Array.apply(null, new Array(pageCount))
  const openCourse = (element) => {    
    history.push('/courses/create?c_id='+element.id)
  }

  const getColumnsForRow = () => {
    let items = courses.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="cardStyle">
              <Card.Img src={courseIMG} />
              <span className="best-seller-tag">
                <div className="best-seller-content">
                  <img src={liveIcon} style={{height : "20px", width: "40px"}} />
                </div>
              </span>
              <Card.Body>
                <div className="title-div">
                  <Card.Title>{element.course_title}</Card.Title>
                </div>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <Row>
                    <Col >{element.description}</Col>
                      
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <div className="text-center">
                  <Button variant="outline-primary" onClick={() => {openCourse(element)}}>Manage Course</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </CardGroup>
      )
    })
    return items
  }

  return (
    <>
      {!isLoading && courses.length && (
        <>
          <Row className="tool-bar">
            <Col sm="4">
              <div className="app-search p-2">
                <div className="position-relative">
                  <DeBounceSearch handleSearch={handleSearch} />
                  <span className="bx bx-search-alt" />
                </div>
              </div>
            </Col>
            <Col sm="3">
              <div className="app-search p-2">
                <Select
                  name="filter"
                  value={filter}
                  onChange={handleFilter}
                  placeholder="Select Status"
                  options={filterOptions}
                />
              </div>
            </Col>
            <Col sm="5">
              <div className="text-sm-end p-2">
                <Button
                  type="button"
                  variant="success"
                  className="btn-rounded mb-2 me-2"
                  onClick={e => {
                    history.push('/courses/create');
                  }}
                >
                  <i className="mdi mdi-plus me-1" /> Create Course
                </Button>
              </div>
            </Col>
          </Row>
          <Row xs={1} md={columnsPerRow}>
            {getColumnsForRow()}
          </Row>
          <Row>
            <Pagination className="pagination pagination-rounded justify-content-end mb-2">
              {currentPage !== 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      first
                      onClick={() => handlePageChange(1, defaultPageCount)}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        handlePageChange(currentPage - 1, defaultPageCount)
                      }
                      previous
                    />
                  </PaginationItem>
                </>
              )}

              {paginationPage.map((page, index) => {
                if (currentPage === index + 1) {
                  return (
                    <PaginationItem key={index + 1} active>
                      <PaginationLink
                        onClick={() =>
                          handlePageChange(index + 1, defaultPageCount)
                        }
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else {
                  return (
                    <PaginationItem key={index + 1}>
                      <PaginationLink
                        onClick={() =>
                          handlePageChange(index + 1, defaultPageCount)
                        }
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
              })}

              {currentPage !== pageCount && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        handlePageChange(currentPage + 1, defaultPageCount)
                      }
                      next
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        handlePageChange(pageCount, defaultPageCount)
                      }
                      last
                    />
                  </PaginationItem>
                </>
              )}
            </Pagination>
          </Row>
        </>
      )}
    </>
  )
}

export default CourseList

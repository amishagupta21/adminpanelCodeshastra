import { useEffect, useState } from "react"
import React from "react"
import { get } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import { Container } from "reactstrap"
import { Component } from "@fullcalendar/core"
import CourseList from "./CourseList"

export default function Courses() {
  const [courseList, setcourseList] = useState([])
  const [isLoading, setLoading] = useState([false])
  const [currentPage, setPage] = useState(1)
  const [filter, setFilter] = useState()

  useEffect(() => {
    setLoading(true)
    getSearchCourse()
  }, [])

  const handleSearch = e => {
    console.log("e", e)
    const data = {
      search: e,
    }
    getSearchCourse(data)
  }

  const handlePageChange = (page, pageCount) => {
    setPage(page)
    const data = {
      page: page,
      pageSize: pageCount,
    }
    getSearchCourse(data)
  }

  const handleFilter = filter => {
    console.log("filter",filter);
    const data = {
      status : filter.value,
    }
    getSearchCourse(data)
  }

  const getAllCourse = async () => {
    get(url.GET_COURSELIST)
      .then(async response => {
        console.log("course List", response)
        setLoading(false)
        setcourseList(response)
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  const getSearchCourse = React.useCallback(async filter => {
    const res = await get(
      url.GET_COURSELIST +
        `?sortBy=${filter?.sortBy || "created_at"}&sortOrder=${
          filter?.sortOrder || "DESC"
        }&pageSize=${filter?.pageSize || 5}&page=${filter?.page || 1}&status=${
          filter?.status || null
        }&keyword=${filter?.search || ""}`
    )
      .then(async response => {
        setLoading(false)
        console.log("search responce", response)
        setcourseList(response)
      })
      .catch(error => {
        console.log("search error")
      })
  }, [])

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {!isLoading && courseList?.data.result.length && (
            <>
              <CourseList
                courseList={courseList}
                isLoading={isLoading}
                handleSearch={handleSearch}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                handleFilter={handleFilter}
                filter={filter}
              />
            </>
          )}
        </Container>
      </div>
    </>
  )
}

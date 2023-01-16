import React from "react"

import { Table } from "reactstrap"

const CoursesEnrolled = () => {
  const courseTable = [
    {
      title: "Course Name",
      value: "Full Stack Web Developer",
    },
    {
      title: "Course type",
      value: "Full Time",
    },
    {
      title: "Mentor",
      value: "Venkatesh H.",
    },
    {
      title: "Starting Date",
      value: "12-10-2022",
    },
    {
      title: "Batch",
      value: "#Batch_25",
    },
    {
      title: "Status",
      value: "70% Completed",
    },
  ]

  const libraryCourse = [
    {
      title: "Course Name",
      value: "Introduction to Solftware Testing [English]",
    },
    {
      title: "Category",
      value: "Full Time",
    },
    {
      title: "Mentor",
      value: "Venkatesh H.",
    },
    {
      title: "Starting Date",
      value: "12-10-2022",
    },
    {
      title: "Status",
      value: "70% Completed",
    },
  ]

  return (
    <>
      <div>
        <h4 className="text-primary">Courses Enrolled</h4>
        <div className="mt-3">
          <h5>Live Course</h5>
          <Table>
            <thead>
              <tr>
                {courseTable.map(item => {
                  return (
                    <>
                      <th>{item.title}</th>
                    </>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {courseTable.map(item => {
                  return (
                    <>
                      <td>{item.value}</td>
                    </>
                  )
                })}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="mt-5">
          <h5>Library Course</h5>
          <Table>
            <thead>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <th>{item.title}</th>
                    </>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <td>{item.value}</td>
                    </>
                  )
                })}
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default CoursesEnrolled

import React from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import { DeBounceSearch } from "common/DeBounceSearch"
import Select from "react-select"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"

const CourseTable = ({ activeTab, usersCount, toolkitProps }) => {
  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    // onSelect: handleOnSelect,
    // onSelectAll: handleOnSelectAll,
  }

  return (
    <Col xl="12">
      <div className="table-responsive">
        <h6 className="mt-2">
          Total {activeTab === "Live" ? "Live" : "Library"} Courses:{" "}
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
  )
}

export default CourseTable

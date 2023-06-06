import React, { useState } from "react"
import { Input, Col, Button, Row } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import { Link } from "react-router-dom"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"

const MentorListTable = ({ mentor }) => {
  const [isExpanded, setIsExpanded] = useState(null)

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

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{user?.id}</>,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.name}</div>
        ),
      },

      {
        dataField: "email",
        text: "Email",
        sort: true,
      },

      {
        dataField: "topic",
        text: "Topic",
        sort: true,
      },

      {
        dataField: "Actions",
        text: "Action",
        formatter: (cellContent, user) => (
          <div className="d-flex">
            <div className="me-2">
              <Link className="text-muted ms-2">
                <i className="mdi mdi-trash-can mdi-18px text-danger" />
              </Link>
            </div>
          </div>
        ),
      },
    ],
  }

  const products = [
    {
      id: 1,
      name: " Shubham D",
      email: "shubhamd@gmail.com",
      topic: "Software Developer Program",
      action: <i className="mdi mdi-trash-can font-size-16 text-danger"></i>,
    },
    {
      id: 2,
      name: "Rajesh K",
      email: "RajeshK@gmail.com",
      topic: "Software Developer Program",
      action: <i className="mdi mdi-trash-can font-size-16 text-danger"></i>,
    },
  ]
  return (
    <>
      <div className="batches-home">
        <Row>
          <Col md={12} className="text-end">
            <Button color="success" className="rounded-pill mb-3">
              + Add New Learner
            </Button>
            <div className="text-start">
              <h4>Mentor</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="search-box">
              <div className="app-search p-0">
                <div className="position-relative mb-2">
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Search by Batch name"
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-end">
              <Button color="secondary">Export</Button>
            </div>
          </Col>
        </Row>
        <ToolkitProvider
          key={isExpanded}
          keyField="_id"
          columns={state?.columns}
          data={products}
        >
          {toolkitProps => (
            <>
              <Col xl="12">
                <div className="table-responsive">
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
      </div>
    </>
  )
}

export default MentorListTable

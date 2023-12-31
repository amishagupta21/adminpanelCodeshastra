import BootstrapTable from "react-bootstrap-table-next"
import React, { useMemo, useState } from "react"
import {
  Row,
  Col,
  Table,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link } from "react-router-dom"
import ResponsivePagination from "react-responsive-pagination"
import "react-responsive-pagination/themes/classic.css"

function LearnerTable({
  manageUser,
  defaultSorted,
  selectRow,
  key,
  columns,
  manageUserLoader,
  handlePerPageChange,
  currentPage,
  setCurrentPage,
  handleCurrentPageChange,
  usersCount,
  setState,
}) {
  return (
    <>
      <Row>
        <Col className="col-12">
          <ToolkitProvider
            key={key}
            keyField="_id"
            columns={columns}
            data={manageUser}
          >
            {toolkitProps => (
              <React.Fragment>
                {/* {selectRow?.selected?.length > 0 ? (
                  <h6 className="mt-5">
                    All {selectRow?.selected?.length} Learner on this page are
                    selected. <Link>Select All {usersCount} Learners</Link>{" "}
                  </h6>
                ) : (
                  <h6 className="mt-5"> Users: {usersCount}</h6>
                )} */}
                {usersCount ? (
                  <h6 className="mt-5"> Users: {usersCount}</h6>
                ) : (
                  <h6 className="mt-5"> Showing Result: {manageUser.length}</h6>
                )}
                <Col xl="12">
                  <div className="table-responsive">
                    <BootstrapTable
                      keyField="_id"
                      responsive
                      bordered={false}
                      striped={false}
                      defaultSorted={defaultSorted}
                      selectRow={selectRow}
                      columns={columns}
                      classes={"table align-middle table-nowrap"}
                      headerWrapperClasses={"thead-light"}
                      // pagination={paginationFactory()}
                      {...toolkitProps.baseProps}
                      noDataIndication={
                        manageUserLoader ? (
                          <div className="d-flex justify-content-center">
                            <Spinner size="" color="primary" />
                          </div>
                        ) : (
                          "No data found"
                        )
                      }
                    />
                    <ResponsivePagination
                      current={currentPage}
                      total={Math.ceil(usersCount / 10)}
                      maxWidth={3}
                      onPageChange={n => {
                        setCurrentPage(n)
                      }}
                    />{" "}
                  </div>
                </Col>
              </React.Fragment>
            )}
          </ToolkitProvider>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(LearnerTable)

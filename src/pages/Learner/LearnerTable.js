import BootstrapTable from "react-bootstrap-table-next"
import React, { useMemo } from "react"
import { Row, Col, Table, Spinner } from "reactstrap"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link } from "react-router-dom"

function LearnerTable({
  manageUser,
  defaultSorted,
  selectRow,
  key,
  columns,
  manageUserLoader,
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
                {selectRow?.selected?.length > 0 ? (
                  <h6 className="mt-5">
                    All {selectRow?.selected?.length} Learner on this page are
                    selected.{" "}
                    <Link>Select All {manageUser?.length} Learners</Link>{" "}
                  </h6>
                ) : (
                  <h6 className="mt-5">Total Learners: {manageUser?.length}</h6>
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
                      pagination={paginationFactory()}
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

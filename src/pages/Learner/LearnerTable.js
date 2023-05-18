import BootstrapTable from "react-bootstrap-table-next"
import React, { useMemo } from "react"
import { Row, Col,Table } from "reactstrap"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link } from "react-router-dom"

function LearnerTable({ manageUser, defaultSorted, selectRow, key, columns }) {
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

                      // noDataIndication={"No data found"}
                    />
                    {manageUser && manageUser.length === 0 && (
                      <div className="no_data_found_message">No data found</div>
                    )}
                    
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

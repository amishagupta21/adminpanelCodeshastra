import React, { useEffect } from "react"
import { Col, Row } from "reactstrap"
import firebase from "firebase/compat/app"

import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"

const FireBaseConfig = () => {
  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{user?.id}</>,
      },
      {
        dataField: "displayname",
        text: "Batch Name",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">All Courses</div>
        ),
      },
      {
        dataField: "27/08/2022",
        text: "Start Date",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">27/08/2022</div>
        ),
      },
      {
        dataField: "displayname",
        text: "Action",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.name}</div>
        ),
      },
    ],
  }

  const fetchUsers = async () => {
    try {
      const usersS = await firebase.firestore().collection("users").get()
      const ddddd = usersS.docs.map(doc => doc.data())
      console.log("============== users =============", firebase.database())
    } catch (error) {
      console.log(error)
    }
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div className="page-content">
      <Row>
        <Col className="col-12">
          <>
            <ToolkitProvider
              //   key={isExpanded}
              keyField="id"
              columns={state?.columns}
              //   data={item || []}
              data={state?.columns}
            >
              {toolkitProps => (
                <>
                  <Col xl="12">
                    <div className="table-responsive">
                      <h6 className="mt-2">Total Batches: &nbsp;10</h6>
                      <BootstrapTable
                        keyField={"id"}
                        // trClassName="clickable-row"
                        // onRowClick={onRowClick}
                        // rowEvents={rowEvents}
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
        </Col>
      </Row>
    </div>
  )
}

export default FireBaseConfig

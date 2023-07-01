import React, { useEffect, useState } from "react"
// import { FaStar } from 'react-icons/fa-solid';
import { FaStar } from "react-icons/fa"
import axios from "axios"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Table,
  Progress,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  Spinner,
  AccordionBody,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link } from "react-router-dom"
import paginationFactory from "react-bootstrap-table2-paginator"

const AddNewLearner = ({ newLearner, openNewLearner, closeNewLearner }) => {
  const [isExpanded, setIsExpanded] = useState(null)

  const products = [
    {
      id: 1,
      name: " Shubham D",
      email: "shubhamd@gmail.com",
      topic: "Software Developer Program",
      status: "Active",
    },
    {
      id: 2,
      name: "Rajesh K",
      email: "RajeshK@gmail.com",
      topic: "Software Developer Program",
      status: "Active",
    },
  ]

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
        text: "Mobile",
        sort: true,
      },

      {
        dataField: "status",
        text: "Status",
      },
    ],
  }

  return (
    <Modal
      isOpen={newLearner}
      openNewLearner={openNewLearner}
      fade={false}
      centered
      size="xl"
    >
      <ModalHeader openNewLearner={openNewLearner} className="my-modal-header">
        <span>Add New Learner</span>
        <CloseButton onClick={closeNewLearner} />
      </ModalHeader>
      <ModalBody>
        <div className="batches-home">
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
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <div>
          {/* <Button color="success" className="px-5">
            Clone
          </Button> */}
        </div>
        <div>
          <Button
            onClick={closeNewLearner}
            outline
            color="primary"
            className="px-5"
          >
            Cancel
          </Button>

          <Button color="primary" className="px-5 ms-3">
            Add
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default AddNewLearner

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

const AddNewLearner = ({ newLearner, openNewLearner, closeNewLearner }) => {
  return (
    <Modal
      isOpen={newLearner}
      openNewLearner={openNewLearner}
      fade={false}
      centered
      size="lg"
    >
      <ModalHeader openNewLearner={openNewLearner} className="my-modal-header">
        <span>Add New Learner</span>
        <CloseButton onClick={closeNewLearner} />
      </ModalHeader>
      <ModalBody>
        {/* <ToolkitProvider
          key={isExpanded}
          keyField="id"
          columns={state?.columns}
          data={batchesLearner}
        >
          {toolkitProps => (
            <>
              <Row>
                <Col md={6}>
                  <div className="search-box">
                    <div className="app-search p-0">
                      <div className="position-relative mb-2">
                        <DeBounceSearch handleSearch={handleSearch} />
                        <span className="bx bx-search-alt" />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="text-end">
                    <UncontrolledDropdown className="me-2" direction="down">
                      <DropdownToggle caret color="primary">
                        Export <i className="mdi mdi-menu-down"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem disabled>Download as pdf</DropdownItem>
                        <DropdownItem>Download as excel</DropdownItem>{" "}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Col>
              </Row>
              <Col xl="12">
                <div className="table-responsive">
                  <h6 className="mt-3">
                    Total Learners: {batchesLearner?.length}
                  </h6>
                  <BootstrapTable
                    keyField={"id"}
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
        </ToolkitProvider> */}
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <div>
          {/* <Button color="success" className="px-5">
            Clone
          </Button> */}
        </div>
        <div>
          <Button onClick={closeNewLearner} color="primary" className="px-5">
            Cancel
          </Button>

          <Button color="primary" className="px-5 ms-3">
            Create
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default AddNewLearner

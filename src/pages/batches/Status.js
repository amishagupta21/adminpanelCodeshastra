import React, { useState, useEffect } from "react"
import {
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Table,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getBatchesList } from "store/Batches/actions"
import ReportCard from "./ReportCard"

const Status = ({ active, confirmStatus, closeModal, handleEdit, user }) => {
  return (
    <Modal
      isOpen={active}
      confirmStatus={confirmStatus}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
    >
      <ModalHeader
        className="modalHeader"
        confirmStatus={confirmStatus}
      ></ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h2>
                Are you sure you want to {!user?.enable ? "Active" : "Inactive"}
                ?
              </h2>
              {/* <h4>{"You won't be able to revert this!"}</h4> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  handleEdit({ id: user?.id, enable: user?.enable })
                }}
                type="button"
                className="btn btn-success btn-lg ms-2"
              >
                {!user?.enable ? "Active" : "Inactive"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-danger btn-lg ms-2"
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default Status

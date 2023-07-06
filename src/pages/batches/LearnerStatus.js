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
import { del, post, patch, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"

const LearnerStatus = ({
  active,
  confirmLearnerStatus,
  closeModal,
  user,
  params,
  setActive,
}) => {
  const handleEdit = async data => {
    try {
      // Make the edit request
      const response = await patch(
        url.GET_LEARNER_STATUS + `/${params?.id}/learners/update/status`,
        {
          ids: [user?.id],
          unikodeuserids: [user?.unikodeuserid],
          status: !user.status,
        }
      )

      setActive(false)
      onGetBatchesLearner()
    } catch (error) {
      console.error("Error editing:", error)
    }
  }

  return (
    <Modal
      isOpen={active}
      confirmLearnerStatus={confirmLearnerStatus}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
    >
      <ModalHeader
        className="modalHeader"
        confirmLearnerStatus={confirmLearnerStatus}
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
                  handleEdit({ id: user?.id, status: user?.status })
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

export default LearnerStatus

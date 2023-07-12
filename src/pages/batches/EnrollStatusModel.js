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
import { connect } from "react-redux"
import { getBatchesLearner } from "store/Batches/actions"
import tosterMsg from "components/Common/toster"
import { use } from "i18next"
import axios from "axios"

const EnrollStatusModel = ({
  active,
  confirmEnrollStatus,
  closeModal,
  user,
  params,
  setActive,
  onGetBatchesLearner,
  batchesLearner,
}) => {
  const handleEnroll = async ({ id, courseId, userId }) => {
    try {
      // Make the unenroll request
      const response = await del(
        url.UNENROLL_STUDENT + `${courseId}/${userId}/${id}`
      )
      console.log(response)

      // if (response.data) {
      //   const resp = await del(url.FILTER_UNENROLL + `${courseId}/${unikodecoursei}/${id}}`)
      const finalItem = batchesLearner.filter(item => params.id !== item?.id)
      console.log(finalItem)
      // }

      setActive(false)
      onGetBatchesLearner({
        id: params.id,
      })
      tosterMsg(response?.message)
    } catch (error) {
      console.error("Error editing:", error)
    }
  }

  return (
    <Modal
      isOpen={active}
      confirmEnrollStatus={confirmEnrollStatus}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
    >
      <ModalHeader
        className="modalHeader"
        confirmEnrollStatus={confirmEnrollStatus}
      ></ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h2>Are you sure you want to Unenroll {user?.learnername}?</h2>
              {/* <h4>{"You won't be able to revert this!"}</h4> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  handleEnroll({
                    id: user?.id,
                    courseId: user?.unikodecourseid,
                    userId: user?.unikodeuserid,
                  })
                }}
                type="button"
                className="btn btn-success btn-lg ms-2"
              >
                UnEnroll
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

const mapStateToProps = ({ Batches, state, count }) => {
  return {
    batchesLearner: Batches?.batchesLearner,
    totalBatchesLearner: Batches?.totalBatchesLearner,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetBatchesLearner: data => dispatch(getBatchesLearner(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollStatusModel)

// export default LearnerStatus

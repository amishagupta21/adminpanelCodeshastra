import React from "react"

import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap"

const DeleteProfileModal = ({
  modal,
  openModal,
  closeModal,
  deleteProfilePicture,
}) => {
  return (
    <>
      <Modal
        isOpen={modal}
        openModal={openModal}
        modalTransition={{ timeout: 500 }}
        centered={true}
      >
        <ModalBody className="py-3 px-5">
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <i
                  className="mdi mdi-alert-circle-outline"
                  style={{ fontSize: "9em", color: "orange" }}
                />
                <h2>Are you sure?</h2>
                <h4>{"You won't be able to revert this!"}</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-success btn-lg ms-2"
                  // onClick={onDeleteClick}
                  onClick={() => deleteProfilePicture()}
                >
                  Yes, delete it!
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default DeleteProfileModal

import React from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import BatchAccordion from "./BatchAccordion"

const ViewBatchesModal = ({ modal, toggle, viewData }) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
      contentClassName="modal-dialog"
      size="lg"
      className="modal-dialog"
    >
      <ModalHeader toggle={toggle}>Batch Information</ModalHeader>
      <ModalBody>
        <div>
          <BatchAccordion viewData={viewData} />
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ViewBatchesModal

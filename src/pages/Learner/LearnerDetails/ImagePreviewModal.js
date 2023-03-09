import React from "react"
import "./imagePreview.css"

import { Modal, ModalBody, Row } from "reactstrap"
const ImagePreviewModal = ({
  modal,
  openModal,
  closeModal,
  closeProfilePicture,
  imagePreview,
  toggle,
}) => {
  return (
    <Modal
      className="image-modal"
      isOpen={modal}
      openModal={openModal}
      centered={true}
      fade={false}
      toggle={toggle}
      backdropClassName="modal-background-color"
    >
      <div className="adjust-image">
        <img
          style={{
            borderRadius: "50%",
            width: "100%",
            height: "100%",
          }}
          src={imagePreview}
        />
      </div>
    </Modal>
  )
}

export default ImagePreviewModal

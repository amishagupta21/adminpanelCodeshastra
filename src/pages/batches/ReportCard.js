import React from "react"
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
} from "reactstrap"
import Report from "./Report"

const ReportCard = ({ modal, toggle }) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
      contentClassName="modalContent"
      size="lg"
    >
      <ModalHeader className="modalHeader" toggle={toggle}></ModalHeader>
    </Modal>
  )
}

export default ReportCard

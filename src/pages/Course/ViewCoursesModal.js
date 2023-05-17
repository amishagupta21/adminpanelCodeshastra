import React from "react"
import { Modal, ModalHeader } from "reactstrap"

const ViewCoursesModal = ({ modal, toggle, viewData }) => {
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      modalTransition={{ timeout: 500 }}
      centered={true}
      fade={false}
      size="lg"
    >
      <ModalHeader className="modalHeader" toggle={toggle}></ModalHeader>
      <div className="courses-data mt-5">
        <h5>
          Course Title: <span>{viewData?.course_title}</span>
        </h5>
        <h5>
          Course Type: <span>{viewData?.course_type}</span>
        </h5>
        <h5>
          Student Enrolled: <span>{viewData?.students_enrolled}</span>
        </h5>
        <h5>
          Course Duration: <span>{viewData?.course_duration}</span>
        </h5>
        <h5>
          Ongoing Batches: <span>{viewData?.ongoing_batches}</span>
        </h5>
        <h5>
          Variant Count: <span>{viewData?.variant_count}</span>
        </h5>
      </div>
    </Modal>
  )
}

export default ViewCoursesModal

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

const ReportCard = ({ modal, toggle }) => {
  return (
    <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
      <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>Student Name</Label>
              <Input type="text" placeholder="Batch_10" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Assignment</Label>
              <Input type="text" placeholder="Freshers Only" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Assessments</Label>
              <Input type="select">
                <option selected>Full Stack Web Developer</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Week Test 1</Label>
              <Input type="select">
                <option selected>Full Time</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>Week Test 2</Label>
              <Input type="text" placeholder="www.google.meet/saq-faw-brs" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Week Test 3</Label>
              <Input type="text" placeholder="www.google.meet/saq-faw-brs" />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" outline onClick={toggle} className="px-5">
          Cancel
        </Button>
        <Button color="primary" onClick={toggle} className="px-5">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ReportCard

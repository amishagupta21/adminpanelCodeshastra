import React from "react"
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
  Label,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"

const BatchNewModal = ({ modal, toggle, createBatches }) => {
  return (
    <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
      <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>Batch Name</Label>
              <Input type="text" placeholder="Batch_10" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Description</Label>
              <Input type="text" placeholder="Freshers Only" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Course</Label>
              <Input type="select">
                <option selected>Full Stack Web Developer</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Variant Type</Label>
              <Input type="select">
                <option selected>Full Time</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Class Link</Label>
              <Input type="text" placeholder="www.google.meet/saq-faw-brs" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="batch-accord">
            <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="1">
                  Batch Configuration
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Mentor</th>
                        <th>Learners Limit</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup className="select_box border-0">
                            <Input
                              name="select"
                              type="select"
                              className="border-0"
                            >
                              <option selected>2 select</option>
                              <option>1</option>
                              <option>2</option>
                            </Input>
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup>
                            <Input
                              placeholder="75"
                              type="text"
                              className="bg-grey border-0"
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <Input type="date" />
                        </td>
                        <td>
                          <Input type="date" />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">
                  Batch Schedule
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Days</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="accordionItem-table">
                            <FormGroup>
                              <Input
                                type="text"
                                className="me-2 bg-grey border-0"
                                style={{ width: "64px" }}
                                placeholder="09:00"
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                                className="border-0"
                              >
                                <option selected>AM</option>
                                <option>PM</option>
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <FormGroup>
                              <Input
                                type="text"
                                className="me-2 bg-grey border-0"
                                style={{ width: "64px" }}
                                placeholder="05:00"
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                              >
                                <option>AM</option>
                                <option selected>PM</option>
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <div>
                            <FormGroup check inline>
                              <Input type="checkbox" checked />
                              <Label check>Sun</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" checked />
                              <Label check>Mon</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" checked />
                              <Label check>Tue</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Wed</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Thurs</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Fri</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Sat</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Sun</Label>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <span className="me-3">
                            <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={4}
                          style={{
                            paddingLeft: "0px",
                            paddingRight: "0px",
                          }}
                        >
                          <div
                            style={{
                              height: "1px",
                              background: "#CED4DA",
                            }}
                          ></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex">
                            <FormGroup>
                              <Input
                                type="text"
                                className="me-2 bg-grey border-0"
                                style={{ width: "64px" }}
                                placeholder="09:00"
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                                className="border-0"
                              >
                                <option selected>AM</option>
                                <option>PM</option>
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <FormGroup>
                              <Input
                                type="text"
                                className="me-2 bg-grey border-0"
                                style={{ width: "64px" }}
                                placeholder="05:00"
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                                className="border-0"
                              >
                                <option>AM</option>
                                <option selected>PM</option>
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <div>
                            <FormGroup check inline>
                              <Input type="checkbox" checked />
                              <Label check>Sun</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" checked />
                              <Label check>Mon</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" checked />
                              <Label check>Tue</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Wed</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Thurs</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Fri</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Sat</Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Input type="checkbox" />
                              <Label check>Sun</Label>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <span className="me-3">
                            <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Row>
                    <Col md={12}>
                      <button className="px-4 ms-3 create-new-appointment">
                        Add A Schedule +
                      </button>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" outline onClick={toggle} className="px-5">
          Cancel
        </Button>
        <Button color="primary" onClick={createBatches} className="px-5">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default BatchNewModal

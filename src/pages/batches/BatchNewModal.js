import React, { useState } from "react"
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
const axios = require('axios');

  const [batchName, setBatchName] = useState("")
  const [description, setDescription] = useState("")
  const [course, setCourse] = useState("")
  const [variantType, setVariantType] = useState("")
  const [classLink, setClassLink] = useState("")
  const [learnersLimit, setLearnersLimit] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setendTime] = useState("")

  const test = () => {
    // const apiUrl = '{{lms}}/admin/batch';
    // const data = {
    //   batchName: batchName,
    //   description: description,
    //   course: course,
    //   variantType: variantType,
    //   classLink: classLink
    // };
    // axios.post(apiUrl, data)
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });  
  }
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const SelectTime = ["AM", "PM"]
  const selectMentors=[1,2]
  return (
    <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
      <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>Batch Name</Label>
              <Input value={batchName} onChange={(e) => {
                setBatchName(e.target.value)
              }} type="text" placeholder="Batch_10" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Description</Label>
              <Input value={description} onChange={(e) => {
                setDescription(e.target.value
                )
              }} type="text" placeholder="Freshers Only" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Course</Label>
              <Input
                name="select"
                onChange={(e) => {
                  setCourse(e.target.value)
                }} type="select">
                <option>Select</option>
                <option>Full Stack Web Developer</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Variant Type</Label>
              <Input name="select" onChange={(e) => {
                setVariantType(e.target.value)
              }} type="select">
                <option>Select</option>
                <option selected>Full Time</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Class Link</Label>
              <Input value={classLink} onChange={(e) => {

                setClassLink(e.target.value)
              }} type="text" placeholder="www.google.meet/saq-faw-brs" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="batch-accord">
            <UncontrolledAccordion defaultOpen={["1", "2","3"]} stayOpen>
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
                              // value={mentor} onchange={(e) => {
                              //   setMentor(e.target.value)
                              // }}
                            >
                          {selectMentors.map((mentor,index)=>{
                            return(
                              <option key={index}>{mentor}</option>
                            )
                          })}
                              {/* <option selected> 2 select </option>
                              <option>1</option>
                              <option>2</option> */}
                            </Input>
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup>
                            <Input
                              placeholder="75"
                              type="text"
                              className="bg-grey border-0"
                              value={learnersLimit} onchange={(e) => {
                                setLearnersLimit(e.target.value)
                              }}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <Input type="date" value={startDate} onchange={(e) => {
                            setStartDate(e.target.value)
                          }} />
                        </td>
                        <td>
                          <Input type="date" value={endDate} onchange={(e) => {
                            setEndDate(e.target.value)
                          }} />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mb-2">
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
                                value={startTime} onchange={(e) => {
                                  setStartTime(e.target.value)
                                }}
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                                className="border-0"

                              >
                                {SelectTime.map((time, index) => {
                                  return (
                                    <option key={index}>{time}</option>
                                  )
                                })}
                                {/* <option selected>AM</option>
                                <option>PM</option> */}
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
                                value={endTime} onchange={(e) => {
                                  setendTime(e.target.value)
                                }}
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                              >
                                {SelectTime.map((time, index) => {
                                  return (
                                    <option key={index}>{time}</option>
                                  )
                                })}

                                {/* <option selected>PM</option> */}
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>


                          <div>
                            {days.map((day, index) => {
                              return (
                                <FormGroup key={index} check inline>
                                  <Input type="checkbox" />
                                  <Label check>{day}</Label>
                                </FormGroup>
                              )
                            })}

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
                                {SelectTime.map((time, index) => {
                                  return (
                                    <option key={index}>{time}</option>
                                  )
                                })}
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>

                          <div>
                            {days.map((day, index) => {
                              return (
                                <FormGroup key={index} check inline>
                                  <Input type="checkbox" />
                                  <Label check>{day}</Label>
                                </FormGroup>
                              )
                            })}

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
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="3">
                  Moodle Course ID
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  <Row>
                    <Col md={4} style={{paddingLeft:'33px'}}>
                      <FormGroup>
                        <Label>Course ID</Label>
                        <Input type="text" />
                      </FormGroup>
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
        <Button color="primary" onClick={test} className="px-5">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default BatchNewModal




{/* <div>
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
</div> */}
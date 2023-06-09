import React, { useEffect, useState } from "react"
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
import { Link, useParams } from "react-router-dom"
import { editNewBatch } from "store/actions"
import { connect } from "react-redux"

const EditNewModal = ({
  onEditNewBatch,
  editModal,
  batchApi,
  editNewModal,
  cancelNewModal,
  setEditModal,
}) => {
  const data = {
    name: batchApi?.name,
    description: batchApi?.description,
    course: batchApi?.course,
    id: batchApi?.id,
    //variant_type: batchApi?.variant_type,
    //class_link: batchApi?.class_link,
    mentors: [],
    // learner_limit: batchApi?.learner_limit,
    start_date: batchApi?.start_date,
    end_date: batchApi?.end_date,
    // batch_schedule: batchApi?.batch_schedule,
  }

  const [editData, setEditData] = useState(data)

  useEffect(() => {
    setEditData({
      name: batchApi?.name,
      description: batchApi?.description,
      course: batchApi?.course,
      id: batchApi?.id,
      //  variant_type: batchApi?.variant_type,
      //class_link: batchApi?.class_link,
      mentors: [],
      // learner_limit: batchApi?.learner_limit,
      start_date: batchApi?.start_date,
      end_date: batchApi?.end_date,
      // batch_schedule: batchApi?.batch_schedule,
    })
  }, [batchApi])

  const days = [
    { value: 1, name: "Mon", isSelected: false },
    { value: 2, name: "Tue", isSelected: false },
    { value: 3, name: "Wed", isSelected: false },
    { value: 4, name: "Thu", isSelected: false },
    { value: 5, name: "Fri", isSelected: false },
    { value: 6, name: "Sat", isSelected: false },
    { value: 7, name: "Sun", isSelected: false },
  ]

  const updateBatches = event => {
    event.preventDefault()
    onEditNewBatch(editData)
    setEditModal(false)
  }

  return (
    <Modal
      isOpen={editModal}
      editNewModal={editNewModal}
      fade={false}
      centered
      size="lg"
    >
      <ModalHeader editNewModal={editNewModal}>Edit Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>Batch Name</Label>
              <Input
                type="text"
                value={editData?.name}
                onChange={e =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }
                placeholder="Batch_10"
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Description</Label>
              <Input
                value={editData?.description}
                onChange={e =>
                  setEditData({
                    ...editData,
                    description: e.target.value,
                  })
                }
                type="text"
                placeholder="Freshers Only"
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Course</Label>
              <Input
                name="select"
                onChange={e =>
                  setEditData({
                    ...editData,
                    course: e.target.value,
                  })
                }
                value={editData?.course}
                type="select"
              >
                <option value="Select">Select</option>
                <option value="Full Stack Web Developer">
                  Full Stack Web Developer
                </option>
                <option value="Software Developer Program">
                  Software Developer Program
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Python Full Stack Developer">
                  Python Full Stack Developer
                </option>
              </Input>
            </FormGroup>
          </Col>
          {/* <Col md={3}>
            <FormGroup>
              <Label>Variant Type</Label>
              <Input
                name="select"
                value={editData?.variant_type}
                onChange={e =>
                  setEditData({
                    ...editData,
                    variant_type: e.target.value,
                  })
                }
                type="select"
              >
                <option value="Select">Select</option>
                <option value="full time">full time</option>
              </Input>
            </FormGroup>
          </Col> */}
        </Row>
        {/* <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Class Link</Label>
              <Input
                value={editData?.class_link}
                onChange={e =>
                  setEditData({
                    ...editData,
                    class_link: e.target.value,
                  })
                }
                type="text"
                placeholder="www.google.meet/saq-faw-brs"
              />
            </FormGroup>
          </Col>
        </Row> */}
        <Row>
          <Col md={12} className="batch-accord">
            <UncontrolledAccordion defaultOpen={["1", "2", "3"]} stayOpen>
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="1">
                  Batch Configuration
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <Table responsive>
                    <thead>
                      <tr>
                        {/* <th>Mentor</th> */}
                        {/* <th>Learners Limit</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>
                          <FormGroup>
                            <Input
                              type="text"
                              name="course_id"
                              value={editData?.mentors?.value}
                              onChange={e =>
                                setEditData({
                                  ...editData,
                                  mentors: e.target.value,
                                })
                              }
                            ></Input>
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="text"
                              name="course_id"
                              value={[]}
                              onChange={e =>
                                setEditData({
                                  ...editData,
                                  mentors: e.target.value,
                                })
                              }
                            ></Input>
                          </FormGroup>
                        </td> */}
                        {/* <td>
                          <FormGroup>
                            <Input
                              placeholder="75"
                              type="text"
                              //   className="bg-grey border-0"
                              value={editData?.learner_limit}
                              onChange={e =>
                                setEditData({
                                  ...editData,
                                  learner_limit: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </td> */}
                        <td>
                          <Input
                            type="date"
                            value={editData?.start_date}
                            onChange={e =>
                              setEditData({
                                ...editData,
                                start_date: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="date"
                            value={editData?.end_date}
                            onChange={e =>
                              setEditData({
                                ...editData,
                                end_date: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
              {/* <AccordionItem className="mb-2">
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
                      {editData?.batch_schedule?.value.map((item, index) => {
                        const data = item?.start_time?.split(" ").slice(-1)
                        const data1 = item?.end_time?.split(" ").slice(-1)
                        return (
                          <tr key={index}>
                            <td>
                              <div className="accordionItem-table">
                                <FormGroup>
                                  <Input
                                    type="text"
                                    // className="me-2 bg-grey border-0"
                                    style={{ width: "64px" }}
                                    placeholder="09:00"
                                    value={item?.start_time}
                                    onChange={e =>
                                      setEditData({
                                        ...editData,
                                        course: e.target.value,
                                      })
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="course_id"
                                    value={data[0]}
                                    onChange={e =>
                                      setEditData({
                                        ...editData,
                                        course: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="PM">PM</option>
                                    <option value="AM">AM</option>
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex">
                                <FormGroup>
                                  <Input
                                    type="text"
                                    // className="me-2 bg-grey border-0"
                                    style={{ width: "64px" }}
                                    placeholder="05:00"
                                    value={item?.end_time}
                                    onChange={e =>
                                      setEditData({
                                        ...editData,
                                        course: e.target.value,
                                      })
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="course_id"
                                    value={data1[0]}
                                    onClick={e =>
                                      setEditData({
                                        ...editData,
                                        course: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="PM">PM</option>
                                    <option value="AM">AM</option>
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            <td>
                              <div>
                                {days.map((dayValue, index) => {
                                  return (
                                    <FormGroup key={index} check inline>
                                      <Input
                                        type="checkbox"
                                        checked={dayValue?.value === item.day}
                                        onClick={e =>
                                          setEditData({
                                            ...editData,
                                            course: e.target.value,
                                          })
                                        }
                                      />
                                      <Label check>{dayValue?.name}</Label>
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
                        )
                      })}

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
              </AccordionItem> */}
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="3">
                  Moodle Course ID
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  <Row>
                    <Col md={4} style={{ paddingLeft: "33px" }}>
                      <FormGroup>
                        <Label>Course ID</Label>
                        <Input
                          type="select"
                          name="course_id"
                          //   onChange={e => {
                          //     setSelectedCourseId(e.target.value)
                          //   }}
                        >
                          <option value={null}>Select Course ID</option>
                          {/* {courseIdData.map((item, index) => {
                            return (
                              <option key={index} value={item?.courseid}>
                                {item?.coursename}
                              </option>
                            )
                          })} */}
                        </Input>
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
        <Button
          color="primary"
          outline
          onClick={cancelNewModal}
          className="px-5"
        >
          Cancel
        </Button>
        <Button color="primary" onClick={updateBatches} className="px-5">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  onEditNewBatch: data => dispatch(editNewBatch(data)),
})

export default connect(null, mapDispatchToProps)(EditNewModal)

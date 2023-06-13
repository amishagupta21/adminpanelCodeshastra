import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Button,
  Input,
  Table,
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
import { editNewBatch } from "store/actions"
import { connect } from "react-redux"
import BatchSchedule from "./BatchSchedule"
import { post, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"

const EditNewModal = ({
  onEditNewBatch,
  editModal,
  batchApi,
  editNewModal,
  cancelNewModal,
  setEditModal,
}) => {
  const [editData, setEditData] = useState({ ...batchApi })
  const [selectedCourseId, setSelectedCourseId] = useState("0")
  const [courseIdData, setCourseIdData] = useState([])

  useEffect(() => {
    setEditData(batchApi)
  }, [batchApi])

  useEffect(() => {
    if (editModal) {
      const getNewBatches = async () => {
        const resp = await getCourseData(url.GET_MOODLE_COURSE)
        setCourseIdData(resp.data)
        return resp
      }
      getNewBatches()
    }
  }, [editModal])

  const updateBatches = event => {
    event.preventDefault()

    onEditNewBatch(editData)
    setEditModal(false)
  }

  const handleChange = (event, index) => {
    const data = { ...batchApi }
    const result = [...batchApi.batch_schedule.value]
    let indexValue = batchApi.batch_schedule.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.batch_schedule.value = result
    setEditData(data)
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
                onChange={e => {
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }}
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
          <Col md={3}>
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
                <option value="full Time">full Time</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
        </Row>
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
                        {/* <th>Mentor</th>
                        <th>Learners Limit</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>
                          <FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                className="border-0"
                                value={editData?.mentors?.value}
                                required
                                onChange={e => {
                                  setEditData({
                                    ...editData,
                                    mentors: e.target.value,
                                  })
                                }}
                              >
                                <option value="select">select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                              </Input>
                            </FormGroup>
                          </FormGroup>
                        </td>
                        <td>
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
              {editData && (
                <BatchSchedule
                  editData={editData}
                  handleChange={handleChange}
                  setEditData={setEditData}
                />
              )}
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
                          <option value="0">Select Course ID</option>
                          {courseIdData.map((item, index) => {
                            return (
                              <option key={index} value={editData?.courseid}>
                                {item?.coursename}
                              </option>
                            )
                          })}
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
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  onEditNewBatch: data => dispatch(editNewBatch(data)),
})

export default connect(null, mapDispatchToProps)(EditNewModal)

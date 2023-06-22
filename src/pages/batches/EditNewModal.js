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
  CloseButton,
} from "reactstrap"
import { editNewBatch } from "store/actions"
import { connect } from "react-redux"
import BatchSchedule from "./BatchSchedule"
import { post, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Select from "react-select"
import { formatFunction } from "./utils"

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
  const [isClearable, setIsClearable] = useState(true)
  const [selectedValue, setSelectedValue] = useState("0")
  const [batchId, setBatchId] = useState("")

  console.log(editData, "/////////editData")

  const [moodleDetail, setMoodleDetail] = useState([
    {
      fullname: "",
      displayname: "",
      startDate: "",
    },
  ])

  const [options, setOptions] = useState([
    {
      label: "Select Course Name",
      value: "0",
    },
  ])
  const moodleDetailfunction = async () => {
    const resp = await getCourseData(
      url.GET_MOODLE_DETAIL + `/${selectedCourseId?.value}`
    )
    setEditData(await formatFunction(resp.data[0]))
  }

  useEffect(() => {
    setEditData(batchApi)
    setBatchId(batchApi?.id)
  }, [batchApi])

  useEffect(() => {
    const selectedID = options.find(item => {
      return item?.value.toString() === batchApi?.unikodecourseid
    })
    setSelectedCourseId({
      label: selectedID?.label,
      value: selectedID?.value,
    })
  }, [batchApi, options])

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

  useEffect(() => {
    const formatedCourseId = []
    courseIdData.map(item =>
      formatedCourseId.push({ label: item.coursename, value: item.courseid })
    )
    setOptions([...options, ...formatedCourseId])
  }, [courseIdData])

  const updateBatches = event => {
    event.preventDefault()

    onEditNewBatch({ data: editData, id: batchId })
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

  useEffect(() => {
    if (editModal && selectedCourseId.label !== "Select Course Name") {
      moodleDetailfunction()
    }
  }, [editModal, selectedCourseId])

  useEffect(() => {
    if (selectedCourseId?.label === "Select Course Name") {
      setEditData([
        {
          fullname: "",
          displayname: "",
          startDate: "",
        },
      ])
    }
  }, [selectedCourseId])

  return (
    <Modal
      isOpen={editModal}
      editNewModal={editNewModal}
      fade={false}
      centered
      size="lg"
    >
      <ModalHeader editNewModal={editNewModal} className="my-modal-header">
        <span>Edit Batch</span>
        <CloseButton onClick={cancelNewModal} />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={12} className="batch-accord">
            <UncontrolledAccordion defaultOpen={["1", "2", "3"]} stayOpen>
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="3">
                  Moodle Course
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  <Row>
                    <Col md={4} style={{ paddingLeft: "33px" }}>
                      <FormGroup>
                        <Label>Course</Label>
                        {/* <Input
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
                          <option value="0">Select Course</option>
                          {courseIdData.map((item, index) => {
                            return (
                              <option key={index} value={editData?.courseid}>
                                {item?.coursename}
                              </option>
                            )
                          })}
                        </Input> */}
                        <Select
                          name="filter"
                          placeholder="Course Name"
                          onChange={e => {
                            setEditData({
                              ...editData,
                              unikodecourseid: e?.value.toString(),
                            })
                            setSelectedCourseId(e)
                          }}
                          value={selectedCourseId}
                          // defaultValue={colourOptions[0]}
                          options={options}
                          isClearable={isClearable}
                          className="couserId-width"
                        />
                        {/* <Input
                          name="select"
                          onChange={e => {
                            return setEditData({
                              ...editData,
                              unikodecourseid: e.target.value,
                            })
                          }}
                          value={editData?.unikodecourseid}
                          type="select"
                        >
                          <option value="0">Select Course ID</option>
                          {courseIdData.map((item, index) => {
                            return (
                              <option key={index} value={item?.courseid}>
                                {item?.coursename}
                              </option>
                            )
                          })}
                        </Input> */}
                      </FormGroup>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="1">
                  Batch Configuration
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="1" className="my-padding">
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label>
                          Batch Name{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          type="text"
                          value={editData?.name}
                          // onChange={e => {
                          //   setEditData({
                          //     ...editData,
                          //     name: e.target.value,
                          //   })
                          // }}
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...editData]
                              data[0].fullname = e.target.value
                              setEditData(data)
                            }
                          }}
                          placeholder="Batch_10"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label>
                          Description{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          // value={editData?.description}
                          value={
                            selectedCourseId?.label === "Select Course Name"
                              ? ""
                              : editData?.description
                          }
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...editData]
                              data[0].description = e.target.value
                              setEditData(data)
                            }
                          }}
                          type="text"
                          placeholder="Freshers Only"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label>
                          Course{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          name="select"
                          // onChange={e =>
                          //   setEditData({
                          //     ...editData,
                          //     course: e.target.value,
                          //   })
                          // }
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...editData]
                              data[0].course = e.target.value
                              setEditData(data)
                            }
                          }}
                          // value={editData?.course}
                          value={
                            selectedCourseId?.label === "Select Course Name"
                              ? ""
                              : editData?.course
                          }
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
                        <Label>
                          Variant Type{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          name="select"
                          // value={editData?.variant_type}
                          value={
                            selectedCourseId?.label === "Select Course Name"
                              ? ""
                              : editData?.variant_type
                          }
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...editData]
                              data[0].variant_type = e.target.value
                              setEditData(data)
                            }
                          }}
                          // onChange={e =>
                          //   setEditData({
                          //     ...editData,
                          //     variant_type: e.target.value,
                          //   })
                          // }
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
                          // value={editData?.class_link}
                          value={
                            selectedCourseId?.label === "Select Course Name"
                              ? ""
                              : editData?.class_link
                          }
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...editData]
                              data[0].class_link = e.target.value
                              setEditData(data)
                            }
                          }}
                          type="text"
                          placeholder="www.google.meet/saq-faw-brs"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3} className="my-date-icon">
                      <Label>
                        Start Date{" "}
                        <span
                          className="mandotary star"
                          style={{ color: "red" }}
                        >
                          *
                        </span>
                      </Label>
                      <Input
                        type="date"
                        // value={editData?.start_date}
                        value={
                          selectedCourseId?.label === "Select Course Name"
                            ? ""
                            : editData?.start_date
                        }
                        onChange={e =>
                          setEditData({
                            ...editData,
                            start_date: e.target.value,
                          })
                        }
                        className="date-bg"
                      />
                    </Col>
                    <Col md={3} className="my-date-icon">
                      <Label>
                        End Date{" "}
                        <span
                          className="mandotary star"
                          style={{ color: "red" }}
                        >
                          *
                        </span>
                      </Label>
                      <Input
                        type="date"
                        // value={editData?.end_date}
                        value={
                          selectedCourseId?.label === "Select Course Name"
                            ? ""
                            : editData?.end_date
                        }
                        min={editData?.start_date}
                        onChange={e =>
                          setEditData({
                            ...editData,
                            end_date: e.target.value,
                          })
                        }
                        className="date-bg"
                      />
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
              {editData && (
                <BatchSchedule
                  editData={editData}
                  handleChange={handleChange}
                  setEditData={setEditData}
                />
              )}
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
  onEditNewBatch: (data, id) => dispatch(editNewBatch(data, id)),
})

export default connect(null, mapDispatchToProps)(EditNewModal)

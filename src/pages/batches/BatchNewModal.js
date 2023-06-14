import React, { useEffect, useState } from "react"
// import { FaStar } from 'react-icons/fa-solid';
import { FaStar } from "react-icons/fa"
import axios from "axios"
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
  Spinner,
  AccordionBody,
} from "reactstrap"
import { createNewBatch } from "store/actions"
import { connect } from "react-redux"
import { post, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import TimeField from "react-simple-timefield"

const CheckBox = ({ isSelected, name, selectDays }) => {
  const [isChecked, setIsChecked] = useState(isSelected)

  return (
    <>
      <input
        type="checkbox"
        id={name}
        value={isChecked}
        // checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked)
          // console.log(name)
          selectDays({ isSelected, name })
        }}
      />
      <label htmlFor={name}>{name}</label>
    </>
  )
}
const BatchNewModal = ({
  modal,
  toggle,
  setModal,
  setItem,
  item,
  createNewBatch,
  onCreateNewBatch,
}) => {
  const axios = require("axios")
  const [isFormValid, setIsFormValid] = useState(false)

  const [batchName, setBatchName] = useState("")
  const [description, setDescription] = useState("")
  const [course, setCourse] = useState("")
  const [variantType, setVariantType] = useState("")
  const [classLink, setClassLink] = useState("")
  const [learnersLimit, setLearnersLimit] = useState()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setendTime] = useState("")
  const [courseIdData, setCourseIdData] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState("0")
  const [isLoading, setIsLoading] = useState(false)

  const [updateDays, setUpdateDays] = useState([
    {
      day: "",
      start_time: "",
      end_time: "",
      started_time: "",
      ended_time: "",
    },
  ])
  const SelectTime = ["AM", "PM"]

  const mentors = ["select", 1, 2]
  const [mentor, setMentor] = useState("")
  useEffect(() => {
    // Check if all mandatory fields have values
    const isValid =
      batchName !== "" &&
      description !== "" &&
      course !== "Select" &&
      variantType !== "Select" &&
      classLink !== "" &&
      mentor !== "Select" &&
      learnersLimit !== "" &&
      startDate !== "" &&
      endDate !== ""

    setIsFormValid(isValid)
  }, [
    batchName,
    description,
    course,
    variantType,
    classLink,
    mentor,
    learnersLimit,
    startDate,
    endDate,
  ])

  const [days, setDays] = useState([
    { day: 1, name: "Mon", isSelected: false },
    { day: 2, name: "Tue", isSelected: false },
    { day: 3, name: "Wed", isSelected: false },
    { day: 4, name: "Thu", isSelected: false },
    { day: 5, name: "Fri", isSelected: false },
    { day: 6, name: "Sat", isSelected: false },
    { day: 7, name: "Sun", isSelected: false },
  ])

  const selectDays = day => {
    // console.log(day)
    const updateDays = days.map(_day => {
      if (day.name === _day.name) {
        const temp = {
          name: _day.name,
          isSelected: !_day.isSelected,
          day: _day.day,
        }
        return temp
      }
      return _day
    })
    // console.log("updateday", updateDays)
    setDays(updateDays)
  }

  const temp = {
    name: batchName,
    description: description,
    course: course,
    variant_type: variantType,
    class_link: classLink,
    mentors: ["28a6216b-4ac6-4398-8766-f0d274e56afc"],
    learner_limit: learnersLimit || 23,
    start_date: startDate,
    end_date: endDate,
    batch_schedule: {
      name: batchName,
      value: updateDays,
    },
    unikodecourseid:
      selectedCourseId === "Select Course ID" ? "0" : selectedCourseId,
  }

  const createBatch = data1 => {
    setIsLoading(true)

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}${url.CREATE_NEW_BATCHES}`,
      data: temp,
    })
      .then(res => {
        console.log("res", res)
        setIsLoading(false)
        setModal(false)
        setItem([...item, res.data.data])
      })
      .catch(err => {
        console.log("err", err)
      })

    // return resp
  }

  useEffect(() => {
    if (modal) {
      const getNewBatches = async () => {
        const resp = await getCourseData(url.GET_MOODLE_COURSE)
        setCourseIdData(resp.data)
        return resp
      }
      getNewBatches()
    }
  }, [modal])

  const handleBatchScheduleChange = (e, index, item) => {
    const updateObj = {
      ...item,
      [e.target.name]: e.target.value,
    }
    const updateArray = [...updateDays]
    updateArray[index] = updateObj
    setUpdateDays(updateArray)
  }

  return (
    <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
      <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>
                Batch Name{" "}
                <span className="mandotary star" style={{ color: "red" }}>
                  *
                </span>
              </Label>
              <Input
                value={batchName}
                onChange={e => {
                  setBatchName(e.target.value)
                }}
                type="text"
                placeholder="Batch_10"
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>
                Description{" "}
                <span className="mandotary star" style={{ color: "red" }}>
                  *
                </span>
              </Label>
              <Input
                value={description}
                onChange={e => {
                  setDescription(e.target.value)
                }}
                type="text"
                placeholder="Freshers Only"
                required
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>
                Course{" "}
                <span className="mandotary star" style={{ color: "red" }}>
                  *
                </span>
              </Label>
              <Input
                name="select"
                onChange={e => {
                  setCourse(e.target.value)
                }}
                type="select"
                required
              >
                <option>Select</option>
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
                <span className="mandotary star" style={{ color: "red" }}>
                  *
                </span>
              </Label>
              <Input
                name="select"
                onChange={e => {
                  setVariantType(e.target.value)
                }}
                type="select"
                required
              >
                <option>Select</option>
                <option>full Time</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Class Link </Label>
              <Input
                value={classLink}
                onChange={e => {
                  setClassLink(e.target.value)
                }}
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
                        {/* <th>
                          Mentor{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th>
                        <th>
                          Learners Limit{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th> */}
                        <th>
                          Start Date{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th>
                        <th>
                          End Date{" "}
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>
                          <FormGroup className="select_box border-0">
                            <Input
                              name="select"
                              type="select"
                              className="border-0"
                              value={mentor}
                              required
                              onChange={e => {
                                setMentor(e.target.value)
                              }}
                            >
                              {mentors.map((mentor, index) => {
                                return <option key={index}>{mentor}</option>
                              })}
                            </Input>
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup>
                            <Input
                              placeholder="75"
                              type="text"
                              className="bg-grey border-0"
                              value={learnersLimit}
                              onChange={e => {
                                setLearnersLimit(e.target.value)
                              }}
                              required
                            />
                          </FormGroup>
                        </td> */}
                        <td>
                          <Input
                            type="date"
                            value={startDate}
                            onChange={e => {
                              setStartDate(e.target.value)
                            }}
                            required
                          />
                        </td>
                        <td>
                          <Input
                            type="date"
                            min={startDate}
                            value={endDate}
                            onChange={e => {
                              setEndDate(e.target.value)
                            }}
                            required
                          />
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
                        <th>
                          Start Time
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th>
                        <th>
                          End Time
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th>
                        <th>
                          Days
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {updateDays.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="accordionItem-table">
                                <FormGroup>
                                  <TimeField
                                    // className="me-2 bg-grey border-0"
                                    style={{ width: "64px" }}
                                    value={item.start_time}
                                    name="start_time"
                                    onChange={e => {
                                      handleBatchScheduleChange(e, index, item)
                                    }}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup className="select_box border-0">
                                  <Input
                                    name="started_time"
                                    type="select"
                                    style={{ width: "64px" }}
                                    // className="border-0"
                                    value={item.started_time}
                                    onChange={e =>
                                      handleBatchScheduleChange(e, index, item)
                                    }
                                    required
                                  >
                                    {SelectTime.map((time, index) => {
                                      return <option key={index}>{time}</option>
                                    })}
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex">
                                <FormGroup>
                                  <TimeField
                                    name="end_time"
                                    type="text"
                                    className="me-2 bg-grey border-0"
                                    style={{ width: "64px" }}
                                    placeholder="05:00"
                                    value={item.end_time}
                                    onChange={e => {
                                      handleBatchScheduleChange(e, index, item)
                                    }}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup className="select_box border-0">
                                  <Input
                                    name="ended_time"
                                    type="select"
                                    style={{ width: "64px" }}
                                    required
                                    value={item.ended_time}
                                    onChange={e => {
                                      handleBatchScheduleChange(e, index, item)
                                    }}
                                  >
                                    {SelectTime.map((time, index) => {
                                      return <option key={index}>{time}</option>
                                    })}
                                  </Input>
                                </FormGroup>
                              </div>
                            </td>
                            <td>
                              <div></div>
                              <div>
                                {days.map((day, index) => {
                                  return (
                                    <FormGroup key={index} check inline>
                                      <CheckBox
                                        {...day}
                                        selectDays={selectDays}
                                      />
                                    </FormGroup>
                                  )
                                })}
                              </div>
                            </td>
                            <td>
                              <span
                                className="me-3"
                                onClick={() => {
                                  if (updateDays.length > 1) {
                                    const newUpdateDays = [...updateDays]
                                    newUpdateDays.splice(index, 1)
                                    setUpdateDays(newUpdateDays)
                                  }
                                }}
                              >
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
                      <button
                        className="px-4 ms-3 create-new-appointment"
                        onClick={() =>
                          setUpdateDays([
                            ...updateDays,
                            {
                              day: "",
                              start_time: "",
                              end_time: "",
                            },
                          ])
                        }
                      >
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
                    <Col md={4} style={{ paddingLeft: "33px" }}>
                      <FormGroup>
                        <Label>Course ID</Label>
                        <Input
                          type="select"
                          name="course_id"
                          onChange={e => {
                            setSelectedCourseId(e.target.value)
                          }}
                        >
                          <option value="0">Select Course ID</option>
                          {courseIdData.map((item, index) => {
                            return (
                              <option key={index} value={item?.courseid}>
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
        <Button color="primary" outline onClick={toggle} className="px-5">
          Cancel
        </Button>
        {isLoading ? (
          <Button
            color="primary"
            onClick={createBatch}
            className="px-5"
            disabled
          >
            <Spinner style={{ width: "1rem", height: "1rem" }} />
            &nbsp;&nbsp; Creating...
          </Button>
        ) : (
          <Button
            color="primary"
            onClick={createBatch}
            className="px-5"
            disabled={!isFormValid}
          >
            Create
          </Button>
        )}
      </ModalFooter>
    </Modal>
  )
}
const mapDispatchToProps = dispatch => ({
  onCreateNewBatch: data => dispatch(createNewBatch(data)),
})

export default connect(null, mapDispatchToProps)(BatchNewModal)

// export default BatchNewModal

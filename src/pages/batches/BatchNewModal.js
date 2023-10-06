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
import Select from "react-select"
import { Link, useParams } from "react-router-dom"

// const CheckBox = ({ isSelected, name, selectDays }) => {
//   const [isChecked, setIsChecked] = useState(isSelected)
//   const params = useParams()

//   return <></>
// }
const BatchNewModal = ({ modal, toggle, setModal, setItem, item }) => {
  const INITIAL_BATCH_SCHEDULE_OBJ = {
    day: [],
    start_time: "",
    end_time: "",
  }

  const axios = require("axios")
  const [isFormValid, setIsFormValid] = useState(false)
  const [isDeleteIconEnabled, setIsDeleteIconEnabled] = useState(false)

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
  const [selectedCourseId, setSelectedCourseId] = useState({
    label: "Select Course Name",
    value: "0",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [moodleDetail, setMoodleDetail] = useState([
    {
      fullname: "",
      displayname: "",
      startDate: "",
    },
  ])

  const [selectedDays, setSelectedDays] = useState([])

  const [updateDays, setUpdateDays] = useState([
    {
      day: [],
      start_time: "",
      end_time: "",
      started_time: "AM",
      ended_time: "AM",
    },
  ])

  const [options, setOptions] = useState([
    {
      label: "Select Course Name",
      value: "0",
    },
  ])

  const CheckBox = ({ isSelected, name, selectDays }) => {
    const [isChecked, setIsChecked] = useState(isSelected)
    const params = useParams()

    return (
      <>
        <input
          type="checkbox"
          id={name}
          checked={isChecked}
          onClick={event => {
            console.log(event.target)
          }}
        />
        <label
          htmlFor={name}
          className="check-label"
          style={{ marginLeft: "6px" }}
        >
          {name}
        </label>
      </>
    )
  }

  useEffect(() => {
    const formatedCourseId = []
    courseIdData.map(item =>
      formatedCourseId.push({ label: item.coursename, value: item.courseid })
    )
    setOptions([...options, ...formatedCourseId])
  }, [courseIdData])
  const SelectTime = ["AM", "PM"]

  const mentors = ["select", 1, 2]
  const [mentor, setMentor] = useState("")
  useEffect(() => {
    // Check if all mandatory fields have values
    const isValid =
      // batchName !== "" &&
      // description !== "" &&
      course !== "Select" &&
      variantType !== "Select" &&
      // classLink !== "" &&
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
    { day: 7, name: "Sun", isSelected: false },
    { day: 1, name: "Mon", isSelected: false },
    { day: 2, name: "Tue", isSelected: false },
    { day: 3, name: "Wed", isSelected: false },
    { day: 4, name: "Thu", isSelected: false },
    { day: 5, name: "Fri", isSelected: false },
    { day: 6, name: "Sat", isSelected: false },
  ])

  // const selectDays = day => {
  //   // console.log(day)
  //   const updateDays = days.map(_day => {
  //     if (day.name === _day.name) {
  //       const temp = {
  //         name: _day.name,
  //         isSelected: !_day.isSelected,
  //         day: _day.day,
  //       }
  //       return temp
  //     }
  //     return _day
  //   })
  //   // console.log("updateday", updateDays)
  //   setDays(updateDays)
  // }

  // const temp = {
  //   name: batchName ,
  //   description: description,
  //   course: course,
  //   variant_type: variantType,
  //   class_link: classLink,
  //   mentors: ["28a6216b-4ac6-4398-8766-f0d274e56afc"],
  //   learner_limit: learnersLimit || 23,
  //   start_date: startDate,
  //   end_date: endDate,
  //   batch_schedule: {
  //     name: "Batch Schedule",
  //     value: updateDays,
  //   },
  //   unikodecourseid: selectedCourseId?.value,
  // }

  const temp = {
    name: moodleDetail[0]?.fullname,
    description: moodleDetail[0]?.displayname,
    course: course,
    variant_type: variantType,
    class_link: classLink,
    mentors: ["28a6216b-4ac6-4398-8766-f0d274e56afc"],
    learner_limit: learnersLimit || 23,
    start_date: startDate,
    end_date: endDate,
    batch_schedule: {
      name: "Batch Schedule",
      value: updateDays,
    },
    unikodecourseid: selectedCourseId?.value,
  }
  const createBatch = data1 => {
    setIsLoading(true)

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}${url.CREATE_NEW_BATCHES}`,
      data: temp,
    })
      .then(res => {
        setIsLoading(false)
        setModal(false)
        setItem([...item, res.data.data])
        setClassLink("")
        setStartDate("")
        setEndDate("")
        setMoodleDetail("")
        setCourse("")
        setVariantType("")
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

  useEffect(() => {
    if (modal && selectedCourseId.label !== "Select Course Name") {
      const moodleDetail = async () => {
        const resp = await getCourseData(
          url.GET_MOODLE_DETAIL + `/${selectedCourseId?.value}`
        )
        setMoodleDetail(resp.data)
        return resp
      }
      moodleDetail()
    }
  }, [modal, selectedCourseId])

  /****
   *
   * index => It's parent array index
   * e => It is checkbox event when someone click on checkbox
   *
   * ***/

  const handleDaysChange = (e, index) => {
    const indexDays = { ...updateDays[index] }
    const mainArray = [...updateDays]
    const result = [...indexDays.day]
    if (indexDays.day.includes(e.target.value)) {
      // If exits, then we'll delete the record
      result.splice(indexDays.day.indexOf(e.target.value), 1)
    } else {
      // If  not exist we will add the record in array
      result.push(e.target.value)
    }
    // Reinitialize the updatedDays Array
    indexDays.day = result
    mainArray[index] = indexDays
    setUpdateDays(mainArray)
  }

  useEffect(() => {
    const startFormatDate = new Date(moodleDetail[0]?.startdate * 1000)
      .toLocaleString()
      .split(",")
    const parts = startFormatDate[0].split("/")
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
    setStartDate(formattedDate)
  }, [moodleDetail])

  useEffect(() => {
    if (selectedCourseId?.label === "Select Course Name") {
      setMoodleDetail([
        {
          fullname: "",
          displayname: "",
          startDate: "",
        },
      ])
    }
  }, [selectedCourseId])

  return (
    <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
      <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={12} className="batch-accord">
            <UncontrolledAccordion defaultOpen={["1", "2", "3"]} stayOpen>
              <AccordionItem className="mb-3">
                <AccordionHeader targetId="3">
                  Moodle Course
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="3" className="my-padding">
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Course</Label>
                        <Select
                          name="filter"
                          placeholder="Course Name"
                          onChange={e => {
                            setSelectedCourseId(e)
                          }}
                          value={selectedCourseId}
                          options={options}
                          className="couserId-width"
                        />
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
                          // value={batchName}
                          value={moodleDetail[0]?.fullname || ""}
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...moodleDetail]
                              data[0].fullname = e.target.value
                              setMoodleDetail(data)
                            } else {
                              const data = [...moodleDetail]
                              data[0].fullname = e.target.value
                              setMoodleDetail(data)
                            }
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
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </Label>
                        <Input
                          // value={description}
                          value={moodleDetail[0]?.displayname || ""}
                          // onChange={e => {
                          //   setDescription(e.target.value)
                          // }}
                          onChange={e => {
                            if (
                              selectedCourseId.label === "Select Course Name"
                            ) {
                              const data = [...moodleDetail]
                              data[0].displayname = e.target.value
                              setMoodleDetail(data)
                            }
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
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
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
                          <span
                            className="mandotary star"
                            style={{ color: "red" }}
                          >
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
                        value={startDate}
                        onChange={e => {
                          setStartDate(e.target.value)
                        }}
                        // onChange={e => {
                        //   if (selectedCourseId.label === "Select Course Name") {
                        //     const data = [...moodleDetail]
                        //     console.log("test", data)
                        //     data[0].startDate = e.target.value
                        //     setMoodleDetail(data)
                        //   }
                        // }}
                        required
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
                        value={endDate}
                        onChange={e => {
                          setEndDate(e.target.value)
                        }}
                        min={startDate}
                        required
                        className="date-bg"
                      />
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mb-2">
                <AccordionHeader targetId="2">
                  Batch Schedule
                  <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  <Table responsive>
                    <thead className="bg-transparent">
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
                      {updateDays?.map((item, index) => {
                        return (
                          <tr key={index} className="tr-border">
                            <td>
                              <div className="accordionItem-table">
                                <FormGroup>
                                  <TimeField
                                    // className="me-2 bg-grey border-0"
                                    className="form-control me-2"
                                    style={{ width: "64px" }}
                                    value={item.start_time}
                                    name="start_time"
                                    onChange={e => {
                                      handleBatchScheduleChange(e, index, item)
                                    }}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup className="select_box1 border-0">
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
                                    className="me-2 form-control"
                                    style={{ width: "64px" }}
                                    placeholder="05:00"
                                    value={item.end_time}
                                    onChange={e => {
                                      handleBatchScheduleChange(e, index, item)
                                    }}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup className="select_box1 border-0">
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
                              <div>
                                {days.map((day, daysIndex) => {
                                  return (
                                    <FormGroup
                                      key={daysIndex}
                                      check
                                      inline
                                      className="checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        id={day.day}
                                        value={day.day}
                                        onChange={event => {
                                          handleDaysChange(event, index)
                                        }}
                                      />
                                      <label
                                        htmlFor={day.name}
                                        className="check-label"
                                        style={{ marginLeft: "6px" }}
                                      >
                                        {day.name}
                                      </label>
                                      {/* <CheckBox
                                        {...day}
                                        selectDays={selectDays}
                                      /> */}
                                    </FormGroup>
                                  )
                                })}
                              </div>
                            </td>
                            <td>
                              {updateDays.length > 1 && (
                                <span
                                  className="me-3"
                                  onClick={() => {
                                    const newUpdateDays = [...updateDays]
                                    newUpdateDays.splice(index, 1)
                                    setUpdateDays(newUpdateDays)

                                    // Enable the delete icon after removing a batch schedule
                                    setIsDeleteIconEnabled(true)
                                  }}
                                >
                                  <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <Row>
                    <Col md={12}>
                      <button
                        className="px-4 ms-3 create-new-appointment"
                        onClick={() =>
                          setUpdateDays([
                            ...updateDays,
                            INITIAL_BATCH_SCHEDULE_OBJ,
                          ])
                        }
                      >
                        Add A Schedule
                      </button>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <div>
          {/* <Button color="success" className="px-5">
            Clone
          </Button> */}
        </div>
        <div>
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
              className="px-5 ms-3"
              disabled={!isFormValid}
            >
              Create
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  )
}
const mapDispatchToProps = dispatch => ({
  onCreateNewBatch: data => dispatch(createNewBatch(data)),
})

export default connect(null, mapDispatchToProps)(BatchNewModal)

// export default BatchNewModal

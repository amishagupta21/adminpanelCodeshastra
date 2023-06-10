import React, { useEffect, useState } from "react"
// import { FaStar } from 'react-icons/fa-solid';
import { FaStar } from 'react-icons/fa';
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
  AccordionBody,
} from "reactstrap"
import { createNewBatch } from "store/actions"
import { connect } from "react-redux"
// import { post, getCourseData } from "../../helpers/api_helper"
import {post,getCourseData} from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"

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

  // return <>
  //   <Input
  //     type="checkbox"
  //     id={name}
  //     name={name}
  //     value={isChecked}
  //     onChange={() => {
  //       setIsChecked(!isChecked)
  //       // console.log(name)
  //       // alert("data")
  //        selectDays({isSelected,name});
  //     }}
  //   />
  //   <Label check={isChecked}>{name}</Label>
  // </>
}
const BatchNewModal = ({ modal, toggle, setModal, setItem, item,createNewBatch,onCreateNewBatch }) => {
  const axios = require("axios")
  const [isFormValid, setIsFormValid] = useState(false);

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
  const SelectTime = ["AM", "PM"]

  const mentors = ["select", 1, 2]
  const [mentor, setMentor] = useState("")
  useEffect(() => {
    // Check if all mandatory fields have values
    const isValid =
      batchName !== '' &&
      description !== '' &&
      course !== 'Select' &&
      variantType !== 'Select' &&
      classLink !== '' &&
      mentor !== 'Select' &&
      learnersLimit !== '' &&
      startDate !== '' &&
      endDate !== '';
  
    setIsFormValid(isValid);
  }, [batchName, description, course, variantType, classLink, mentor, learnersLimit, startDate, endDate]);
  

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
    console.log("updateday", updateDays)
    setDays(updateDays)
  }

  // const createBatch = () => {
    useEffect(() => {
    const filterDay = days.filter(day => day.isSelected)

    const updateDays = filterDay.map(day => {
      return {
        day: day.day,
        start_time: "2023-03-21T06:58:58.648Z",
        end_time: "2023-03-21T07:58:58.648Z",
      }
    })

    const temp = {
      name: batchName,
      description: description,
      course: course,
      variant_type: variantType,
      class_link: classLink,
      mentors: ["28a6216b-4ac6-4398-8766-f0d274e56afc"],
      learner_limit: learnersLimit,
      start_date: startDate,
      end_date: endDate,
      batch_schedule: {
        name: batchName,
        value: updateDays,
      },
      moodle_course:
        selectedCourseId === "Select Course ID" ? "0" : selectedCourseId,
    }
    // axios({
    //   method: "POST",
    //   url: "https://lms.unikaksha.dev/api/lms/admin/batch",
    //   data: temp,
    // })
    //   .then(res => {
    //     setModal(false)
    //     setItem([...item, res.data.data])
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // console.log(JSON.stringify(temp))
  // }
}, [createNewBatch])




  const createBatch = async () => {
    const filterDay = days.filter(day => day.isSelected)
    const updateDays = filterDay.map(day => {
      return {
        day: day.day,
        start_time: "2023-03-21T06:58:58.648Z",
        end_time: "2023-03-21T07:58:58.648Z",
      }
    })
    const temp = {
      name: batchName,
      description: description,
      course: course,
      variant_type: variantType,
      class_link: classLink,
      mentors: ["28a6216b-4ac6-4398-8766-f0d274e56afc"],
      learner_limit: learnersLimit,
      start_date: startDate,
      end_date: endDate,
      batch_schedule: {
        name: batchName,
        value: updateDays,
      },
      unikodecourseid:
        selectedCourseId === "Select Course ID" ? "0" : selectedCourseId,
    }
    const resp = await post(url.CREATE_NEW_BATCHES, {
      data: temp,
    })
      .then(res => {
        setModal(false)
        setItem([...item, res.data.data])
      })
      .catch(err => {
        console.log(err)
      })
    return resp
}
useEffect(() => {
  if (modal) {
    const getNewBatches = async () => {
      const resp = await getCourseData(url.GET_MOODLE_COURSE)
      setCourseIdData(resp.data)
      return resp
    }
    getNewBatches()
    // axios("https://lms.unikaksha.dev/api/lms/moodle/getCourseids")
    //   .then(res => setCourseIdData(res.data.data))
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
}, [modal])



  return (
    <Modal isOpen={modal} toggle={toggle} fade={false} centered size="lg">
      <ModalHeader toggle={toggle}>Create Batch</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label>Batch Name  <span className="mandotary star" style={{color:"red"}}>*</span></Label>
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
              <Label>Description  <span className="mandotary star" style={{color:"red"}}>*</span></Label>
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
              <Label>Course  <span className="mandotary star" style={{color:"red"}}>*</span></Label>
              <Input
                name="select"
                onChange={e => {
                  setCourse(e.target.value)
                }}
                type="select"
                required
              >
                <option>Select</option>
                <option>Full Stack Web Developer</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Variant Type  <span className="mandotary star" style={{color:"red"}}>*</span></Label>
              <Input
                name="select"
                onChange={e => {
                  setVariantType(e.target.value)
                }}
                type="select"
                required
              >
                <option>Select</option>
                <option>Full Time</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Class Link 
                <span className="mandotary star" style={{color:"red"}}>*</span>
              </Label>
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
                        <th>Mentor  <span className="mandotary star" style={{color:"red"}}>*</span></th>
                        <th>Learners Limit  <span className="mandotary star" style={{color:"red"}}>*</span></th>
                        <th>Start Date  <span className="mandotary star" style={{color:"red"}}>*</span></th>
                        <th>End Date  <span className="mandotary star" style={{color:"red"}}>*</span></th>
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
                              value={mentor}
                              required
                              onChange={e => {
                                setMentor(e.target.value)
                              }}
                              
                            >
                              {mentors.map((mentor, index) => {
                                return <option key={index}>{mentor}</option>
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
                              value={learnersLimit}
                              onChange={e => {
                                setLearnersLimit(e.target.value)
                              }}
                              required
                            />
                          </FormGroup>
                        </td>
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
                        <th>Start Time <span className="mandotary star" style={{color:"red"}}>*</span></th>
                        <th>End Time <span className="mandotary star" style={{color:"red"}}>*</span></th>
                        <th>Days <span className="mandotary star" style={{color:"red"}}>*</span></th>
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
                                value={startTime}
                                onChange={e => {
                                  setStartTime(e.target.value)
                                }}

                                required
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                                className="border-0"
                                required
                              >
                                {SelectTime.map((time, index) => {
                                  return <option key={index}>{time}</option>
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
                                value={endTime}
                                onChange={e => {

                                  setendTime(e.target.value)
                                }}
                                required
                              />
                            </FormGroup>
                            <FormGroup className="select_box border-0">
                              <Input
                                name="select"
                                type="select"
                                style={{ width: "64px" }}
                                required
                              >
                                {SelectTime.map((time, index) => {
                                  return <option key={index}>{time}</option>
                                })}

                                {/* <option selected>PM</option> */}
                              </Input>
                            </FormGroup>
                          </div>
                        </td>
                        <td>
                          <div>
                            {/* {days.map((day, index) => {
                              return (
                                <FormGroup key={index} check inline>
                                  <Input type="checkbox" />
                                  <Label check>{day}</Label>
                                </FormGroup>
                              )
                            })} */}
                          </div>
                          <div>
                            {days.map((day, index) => {
                              return (
                                <FormGroup key={index} check inline>
                                  <CheckBox {...day} selectDays={selectDays} />
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
                                  return <option key={index}>{time}</option>
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
                                  <CheckBox {...day} selectDays={selectDays} />
                                </FormGroup>
                              )

                              // return <h1 key={index} onClick={()=>{
                              //   console.log("working")
                              // }}>days</h1>
                              return (
                                <div className="day" key={index}>
                                  <input
                                    type="checkbox"
                                    id={day.name}
                                    name={day.name}
                                    // checked={day.isSelected}
                                    onChange={() => {
                                      selectDays(day)
                                    }}
                                  />
                                  <label htmlFor={day.name}>{day.name}</label>
                                </div>
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
        <Button color="primary" onClick={createBatch} className="px-5" disabled={!isFormValid}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}
const mapDispatchToProps = dispatch => ({
  onCreateNewBatch: data => dispatch(createNewBatch(data)),
})

export default connect(null, mapDispatchToProps)(BatchNewModal)


// export default BatchNewModal

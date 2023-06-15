import React, { memo } from "react"
import { connect } from "react-redux"
import {
  Row,
  Col,
  Input,
  Table,
  FormGroup,
  Label,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"
import TimeField from "react-simple-timefield"

const days = [
  { value: 7, name: "Sun", isSelected: false },
  { value: 1, name: "Mon", isSelected: false },
  { value: 2, name: "Tue", isSelected: false },
  { value: 3, name: "Wed", isSelected: false },
  { value: 4, name: "Thu", isSelected: false },
  { value: 5, name: "Fri", isSelected: false },
  { value: 6, name: "Sat", isSelected: false },

]

function BatchSchedule({ editData, handleChange, setEditData }) {
  return (
    <AccordionItem className="mb-2">
      <AccordionHeader targetId="2">
        Batch Schedule
        <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
      </AccordionHeader>
      <AccordionBody accordionId="2">
        <Table responsive>
          <thead className="bg-transparent">
            <tr>
              <th>Start Time <span className="mandotary star" style={{ color: "red" }}>*</span></th>
              <th>End Time <span className="mandotary star" style={{ color: "red" }}>*</span></th>
              <th>Days <span className="mandotary star" style={{ color: "red" }}>*</span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {editData?.batch_schedule?.value.map((item, index) => {
              // const timestamp = item?.start_time
              // const date = new Date(timestamp)
              // const options = {
              //   hour: "2-digit",
              //   minute: "2-digit",
              //   hour12: true,
              // }
              // const time = date.toLocaleTimeString([], options)
              const time = item?.start_time
              const response = time?.split(" ")

              const endTime = item?.end_time
              const response1 = endTime?.split(" ")

              return (
                <tr key={index} className="tr-border">
                  <td>
                    <div className="accordionItem-table">
                      <FormGroup>
                        <TimeField
                          name="start_time"
                          type="text"
                          // className="me-2 bg-grey border-0"
                          className="form-control me-2"
                          style={{ width: "64px" }}
                          placeholder="09:00"
                          value={response?.length ? response[0] : ""}
                          onChange={e => handleChange(e, index)}
                        />
                      </FormGroup>
                      <FormGroup className="select_box1 border-0">
                        <Input
                          style={{ width: "64px" }}
                          type="select"
                          name="started_time"
                          value={item?.started_time}
                          onChange={
                            e => handleChange(e, index)
                            // setEditData({
                            //   ...editData,
                            //   editData: e.target.value,
                            // })
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
                        <TimeField
                          type="text"
                          name="end_time"
                          // className="me-2 bg-grey border-0"
                          className="me-2 form-control"
                          style={{ width: "64px" }}
                          placeholder="05:00"
                          value={response1[0]}
                          onChange={e => handleChange(e, index)}
                        />
                      </FormGroup>
                      <FormGroup className="select_box1 border-0">
                        <Input
                          style={{ width: "64px" }}
                          type="select"
                          name="ended_time"
                          value={item?.ended_time}
                          onChange={
                            e => handleChange(e, index)
                            // setEditData({
                            //   ...editData,
                            //   editData: e.target.value,
                            // })
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
                          <FormGroup key={index} check inline  >
                            <Input
                              name="day"
                              type="checkbox"
                              checked={dayValue?.value === item.day}
                              onChange={
                                e => handleChange(e, index)
                                // setEditData({
                                //   ...editData,
                                //   course: e.target.value,
                                // })
                              }
                            />
                            <Label check className="check-label">{dayValue?.name}</Label>
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
            {/* <tr>
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
            </tr> */}
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
  )
}

const mapStateToProps = ({ Batches, state, count }) => {
  return {
    batchApi: Batches?.batchApi,
  }
}

export default memo(connect(mapStateToProps)(BatchSchedule))

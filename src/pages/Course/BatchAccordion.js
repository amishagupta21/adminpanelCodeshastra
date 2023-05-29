import React, { useState } from "react"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
  Table,
  FormGroup,
  Input,
  Label,
} from "reactstrap"

function BatchAccordion({ viewData }) {
  return (
    <div className="bacth-accordion">
      <div className="d-flex mb-3">
        <FormGroup>
          <Label>Batch Name</Label>
          <Input
            type="text"
            placeholder="Batch Name"
            className="bg-grey border-0"
            value={viewData?.name}
          />
        </FormGroup>
        <FormGroup className="ms-4">
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="For the learners batch"
            className="bg-grey border-0"
            value={viewData?.description}
          />
        </FormGroup>
      </div>
      <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
        <AccordionItem >
          <AccordionHeader targetId="1">
            Batch Configuration{" "}
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
                      <Input name="select" type="select" className="border-0">
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
                    <Input type="date" value={viewData?.start_date} />
                  </td>
                  <td>
                    <Input type="date" value={viewData?.end_date} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">
            Batch Schedule{" "}
            <i className="mdi mdi-information-outline font-size-16 ms-2"></i>
          </AccordionHeader>
          <AccordionBody accordionId="2">
            <Table responsive>
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
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
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <div style={{ height: "1px", background: "#CED4DA" }}></div>
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
                </tr>
              </tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </div>
  )
}

export default BatchAccordion

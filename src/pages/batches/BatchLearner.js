import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Progress,
  FormGroup,
  Input,
  Table,
  UncontrolledAccordion,
  AccordionHeader,
  AccordionBody,
  AccordionItem
} from "reactstrap"

const BatchLearner = ({ newBatch }) => {
  const [state, setState] = useState(true)

  return (
    <div className="prog-bar-accordion">

<Card>
  <UncontrolledAccordion >
    <AccordionItem>
      <AccordionHeader targetId="1">
        <div className="d-flex">
          <div>
            <h5 className="progress-bar-heading">Learners Batch</h5>
          </div>
          <div className="ms-3 d-flex" style={{marginTop:'5px'}}>
            <Label check className="me-2">
              Enable
            </Label>
            <FormGroup switch>
              <Input
                type="switch"
                checked={state}
                onChange={() => {
                  setState(!state)
                }}
              />
            </FormGroup>
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody accordionId="1">
      <div className="mt-4 table-style">

<p className="mb-1 progress-bar-subheading">Course Name:</p>
<p className="mb-3 progress-bar-para">
  {newBatch?.course}
</p>
<p className="mb-1 progress-bar-subheading">Description:</p>
<p className="mb-3 progress-bar-para text-limit">
  {newBatch?.description}
  {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu */}
</p>
<p className="mb-1 progress-bar-subheading">Variant Type:</p>
<p className="mb-3 progress-bar-para">{newBatch?.variant_type}</p>
<p className="mb-1 progress-bar-subheading">Start Date:</p>
<p className="mb-3 progress-bar-para">{newBatch?.start_date}</p>
<p className="mb-1 progress-bar-subheading">End Date:</p>
<p className="mb-3 progress-bar-para">{newBatch?.end_date}</p>
<p className="mb-1 progress-bar-subheading">Lectures:</p>
<p className="mb-3 progress-bar-para">{newBatch?.lectures}</p>
<p className="mb-1 progress-bar-subheading">Learners:</p>
<p className="mb-3 progress-bar-para">{newBatch?.learner_limit}</p>

{/* <Table className="mt-5">
  <tbody>
    <tr>
      <td>Course Name:</td>
      <th>{newBatch?.name}</th>
    </tr>
    <tr>
      <td>Description:</td>
      <th>{newBatch?.description}</th>
    </tr>
    <tr>
      <td>Variant Type:</td>
      <th>{newBatch?.variant_type}</th>
    </tr>
    <tr>
      <td>Start Date:</td>
      <th>{newBatch?.start_date}</th>
    </tr>
    <tr>
      <td>End Date:</td>
      <th>{newBatch?.end_date}</th>
    </tr>
    <tr>
      <td>Lectures:</td>
      <th>{newBatch?.lectures}</th>
    </tr>
    <tr>
      <td>Learners:</td>
      <th>{newBatch?.learner_limit}</th>
    </tr>
  </tbody>
</Table> */}
</div>
      </AccordionBody>
    </AccordionItem>
  </UncontrolledAccordion>
</Card>

      
    </div>
  )
}

export default BatchLearner

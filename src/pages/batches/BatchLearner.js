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
} from "reactstrap"

const BatchLearner = () => {
  const [state, setState] = useState(true)

  return (
    <div>
      <Card>
        <CardBody>
        <div className="d-flex">
            <div><h5>Learners Batch</h5></div>
            <div className="ms-3 d-flex">
              <Label check className='me-2'>Enable</Label>
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
          <div className="mt-4 table-style">
            <Table>
              <tbody>
                <tr>
                  <td>Course Name:</td>
                  <th>Full Stack Web Developer Program</th>
                </tr>
                <tr>
                  <td>Description:</td>
                  <th>For Freshers Only</th>
                </tr>
                <tr>
                  <td>Variant Type:</td>
                  <th>Full Time</th>
                </tr>
                <tr>
                  <td>Start Date:</td>
                  <th>07 Oct 22</th>
                </tr>
                <tr>
                  <td>End Date:</td>
                  <th>12 Oct 22</th>
                </tr>
                <tr>
                  <td>Lectures:</td>
                  <th>9</th>
                </tr>
                <tr>
                  <td>Learners:</td>
                  <th>40</th>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default BatchLearner

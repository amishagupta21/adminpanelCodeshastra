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

const BatchLearner = ({ newBatch }) => {
  const [state, setState] = useState(true)

  return (
    <div>
      <Card>
        <CardBody className="card-height">
          <div className="d-flex">
            <div>
              <h5>Learners Batch</h5>
            </div>
            <div className="ms-3 d-flex">
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
          <div className="mt-4 table-style">
            <Table>
              <tbody>
                <tr>
                  <td>Course Name:</td>
                  <th>{newBatch?.course}</th>
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
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default BatchLearner

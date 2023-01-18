import React from "react"
import Select from "react-select"

import { Table } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  FormGroup,
  Label,
} from "reactstrap"

const DocumentKyc = () => {
  let inputRef

  const options = [
    { label: "Accept Application ", value: "invited" },
    { label: "Reject Application", value: "onboarded" },
    { label: "Hold Application", value: "suspended" },
  ]

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const handleFileUpload = event => {
    console.log(event.target.files[0].name)
  }

  const libraryCourse = [
    {
      title: "Document Name",
      value: "Pan Card",
    },
    {
      title: "File Name",
      value: "PAN_card.jpeg",
    },
    {
      title: "Uploaded On",
      value: "12-10-2020, 09:45",
    },
    {
      title: "File Size",
      value: "09 KB",
    },
    {
      title: "Action",
      value: "Present",
    },
  ]

  return (
    <>
      <div>
        <h4 className="text-primary">Documents & KYC</h4>

        <Col xl="12">
          <Table>
            <thead>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <th>{item.title}</th>
                    </>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <td>{item.value}</td>
                    </>
                  )
                })}
              </tr>
            </tbody>
          </Table>
          <div className="mt-3">
            <p className="mb-3">Action Required :</p>
            <Row>
              <Col className="mb-3" sm={3}>
                <Select
                  name="filter"
                  placeholder="Select Action"
                  options={options}
                />
              </Col>
            </Row>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              placeholder="All Comment here"
            />
            <FormGroup className="mt-3" check>
              <Input type="checkbox" />{" "}
              <Label check>I have read and I understand</Label>
            </FormGroup>
            <Button color="primary" className="mt-3" type="submit">
              Submit
            </Button>
          </div>
        </Col>
      </div>
    </>
  )
}

export default DocumentKyc

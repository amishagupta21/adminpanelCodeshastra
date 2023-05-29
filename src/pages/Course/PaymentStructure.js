import React, { useState, useEffect } from "react"
import {
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Input,
  FormGroup,
  Label,
  InputGroupText,
  InputGroup,
} from "reactstrap"
import Select from "react-select"
import plus from "../../assets/images/add-plus.svg"

const PaymentStructure = ({ paymentStructureData }) => {
  const [inputFields, setInputFields] = useState(paymentStructureData)
  const [paymentTemplateValue, setPaymentTemplateValue] = useState({
    value: 1,
    label: 1,
  })

  useEffect(() => {
    setInputFields(paymentStructureData)
  }, [paymentStructureData])

  const addPaymentStructure = () => {
    const arr = [...inputFields?.feesStructure?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      description: "",
      course_fees: "",
      payment_template: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.feesStructure.value = arr

    setInputFields(result)
  }

  const paymentStructureChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.feesStructure.value]
    let indexValue = inputFields.feesStructure.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.feesStructure.value = result
    setInputFields(data)
  }

  const paymentTemplate = e => {
    setPaymentTemplateValue(e)
  }

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ]

  return (
    <AccordionItem>
      <AccordionHeader targetId="3">
        Payment Structure
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
            fill="#74788D"
          />
        </svg>
        <FormGroup className="ms-2" switch>
          <Input type="switch" name="enable" />
        </FormGroup>
      </AccordionHeader>
      <AccordionBody accordionId="3" className="card-infor-space">
        {paymentStructureData?.feesStructure?.value?.map((overview, index) => (
          <div key={index} className="table-form">
            <table className="table-full table-full-course">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Course Fees</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>
                  <Input
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    type="text"
                    onChange={e => paymentStructureChange(e, index)}
                    value={overview?.title}
                  />
                </td>
                <td>
                  {/* <div
                    name="description"
                    className="form-control"
                    contentEditable="true"
                    onChange={e => paymentStructureChange(e, index)}
                    dangerouslySetInnerHTML={{
                      __html: overview?.description,
                    }}
                  /> */}
                  <Input
                    name="description"
                    className="form-control form-control-color text-area"
                    placeholder="Description"
                    type="textarea"
                    onChange={e => paymentStructureChange(e, index)}
                    value={overview?.description}
                  />
                </td>
                <td>
                  <InputGroup>
                    <InputGroupText>Rs</InputGroupText>
                    <Input
                      name="course_fees"
                      placeholder="Course Fees"
                      onChange={e => paymentStructureChange(e, index)}
                      value={overview?.course_fees}
                    />
                  </InputGroup>

                  <FormGroup className="mt-3">
                    <Label for="exampleSelect">Payment Template</Label>

                    <Select
                      options={options}
                      name="payment_template"
                      onChange={e => paymentTemplate(e, index)}
                      value={paymentTemplateValue}
                    />

                    {/* </Input> */}
                  </FormGroup>
                  <a>View Details</a>
                </td>
                <td>
                  <Input
                    name="position"
                    className="form-control sml"
                    placeholder="Position"
                    type="text"
                    onChange={e => paymentStructureChange(e, index)}
                    value={overview?.position}
                  />
                </td>
                <td>
                  <div className="actions d-flex align-items-center justify-content-end">
                    <FormGroup switch>
                      <Input
                        type="switch"
                        name="enable"
                        onChange={e => paymentStructureChange(e, index)}
                        checked={overview?.enable}
                      />
                    </FormGroup>
                    {overview.url === "" ? (
                      ""
                    ) : (
                      <div className="actions">
                        <i className="mdi mdi-trash-can font-size-18 text-danger" />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </table>
          </div>
        ))}

        <div>
          <button
            className="px-4 ms-3 create-new-appointment"
            // color="primary"
            // outline
            onClick={addPaymentStructure}
            // type="submit"
          >
            Add New Payment Template
            <img height="20px" width="20px" src={plus} />
          </button>
        </div>
      </AccordionBody>
    </AccordionItem>
  )
}

export default PaymentStructure

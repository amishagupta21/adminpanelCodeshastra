import React, { useEffect, useState } from "react"
import {
  Input,
  Modal,
  ModalHeader,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  FormGroup,
} from "reactstrap"
import plus from "../../assets/images/add-plus.svg"

const Highlights = ({ highlightsData }) => {
  const [inputFields, setInputFields] = useState(highlightsData)

  useEffect(() => {
    setInputFields(highlightsData)
  }, [highlightsData])

  const newHighlight = () => {
    const arr = [...inputFields?.highlights?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.highlights.value = arr

    setInputFields(result)
  }

  const handleChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.highlights.value]
    let indexValue = inputFields.highlights.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.highlights.value = result
    setInputFields(data)
  }

  return (
    <AccordionItem>
      <AccordionHeader targetId="2">
        Highlights
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
      </AccordionHeader>
      <AccordionBody accordionId="2" className="card-infor-space">
        {highlightsData?.highlights?.value.map((item, index) => {
          return (
            <div key={index} className="table-form">
              <table className="table-full-width">
                <tr>
                  <th>Title</th>
                  <th>Position</th>
                  <th>Action</th>
                </tr>

                <tr>
                  <td>
                    <Input
                      name="title"
                      className="form-control lg"
                      placeholder="Title"
                      type="text"
                      onChange={e => handleChange(e, index)}
                      value={item?.title}
                    />
                  </td>
                  <td>
                    <Input
                      name="position"
                      className="form-control sml"
                      placeholder=" Positon"
                      type="text"
                      onChange={e => handleChange(e, index)}
                      value={item?.position}
                    />
                  </td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <FormGroup switch>
                        <Input
                          type="switch"
                          name="enable"
                          checked={item?.enable}
                          onClick={e => handleChange(e, index)}
                          // checked={state}
                          // onClick={() => {
                          //   setState(!state)
                          // }}
                        />
                      </FormGroup>

                      <a href="">
                        <i className="mdi mdi-trash-can font-size-18 text-danger" />
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          )
        })}

        <div>
          <button
            className="px-4 ms-3 create-new-appointment"
            onClick={newHighlight}
          >
            Create New Highlight <img height="20px" width="20px" src={plus} />
          </button>
        </div>
      </AccordionBody>
    </AccordionItem>
  )
}

export default Highlights

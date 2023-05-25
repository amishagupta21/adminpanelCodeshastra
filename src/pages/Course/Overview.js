import React, { useState, useEffect } from "react"
import {
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Input,
  FormGroup,
} from "reactstrap"
import plus from "../../assets/images/add-plus.svg"

const Overview = ({ overViewData }) => {
  const [inputFields, setInputFields] = useState(overViewData)

  useEffect(() => {
    setInputFields(overViewData)
  }, [overViewData])

  const addOverview = () => {
    const arr = [...inputFields?.overview?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      description: "",
      icon: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.overview.value = arr

    setInputFields(result)
  }

  const handleChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.overview.value]
    let indexValue = inputFields.overview.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.overview.value = result
    setInputFields(data)
  }

  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        Overview
        <FormGroup className="ms-2" switch>
          <Input type="switch" name="enable" />
        </FormGroup>
      </AccordionHeader>
      <AccordionBody accordionId="1" className="card-infor-space">
        {overViewData?.overview?.value?.map((overview, index) => {
          const documentName = overview.icon
          const array = documentName.split("/")

          const iconName = array[array.length - 1]

          return (
            <div key={index} className="table-form">
              <table className="table-full table-full-course">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Icon</th>
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
                      onChange={e => handleChange(e, index)}
                      value={overview?.title}
                    />
                  </td>
                  <td>
                    <Input
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      type="text"
                      value={overview?.description}
                      onChange={e => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    {overview?.icon === "" ? (
                      <div className="input-file-space">
                        <input type="file" multiple />
                        {/* <span className="input-image">
                                    100 X 200 px, JPEG/PNG , Max 10 mb
                                  </span> */}
                      </div>
                    ) : (
                      <div className="image-name d-flex align-items-center">
                        <p>{iconName}</p>
                        <i className="mdi mdi-close text-danger font-size-20"></i>
                      </div>
                    )}
                  </td>
                  <td>
                    <Input
                      name="position"
                      className="form-control sml"
                      placeholder="Position"
                      type="text"
                      onChange={e => handleChange(e, index)}
                      value={overview?.position}
                    />
                  </td>
                  <td>
                    <div className="actions d-flex justify-content-end align-items-center">
                      <FormGroup switch>
                        <Input
                          type="switch"
                          name="enable"
                          checked={overview?.enable}
                          onClick={e => handleChange(e, index)}
                          // checked={state}
                          // onClick={() => {
                          //   setState(!state)
                          // }}
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
          )
        })}

        <div>
          <button
            className="px-4 ms-3 create-new-appointment"
            // color="primary"
            // outline
            onClick={addOverview}
            // type="submit"
          >
            Create New Highlight <img height="20px" width="20px" src={plus} />
          </button>
        </div>
      </AccordionBody>
    </AccordionItem>
  )
}

export default Overview

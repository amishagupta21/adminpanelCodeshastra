import React from "react"
import {
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Input,
  FormGroup,
} from "reactstrap"
import plus from "../../assets/images/add-plus.svg"

const WhatYouWillLearn = ({
  inputFields,
  addWhatYouWillLearn,
  whatWillLearnChange,
}) => {
  return (
    <AccordionItem>
      <AccordionHeader targetId="4">
        What you will learn
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
      <AccordionBody accordionId="4" className="card-infor-space">
        {inputFields?.course_detail_page?.whatWillYouLearn?.value?.map(
          (overview, index) => (
            <div key={index} className="table-form">
              <table className="table-full table-full-course">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
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
                      onChange={e => whatWillLearnChange(e, index)}
                      value={overview?.title}
                    />
                  </td>
                  <td>
                    {/* <div
                    className="form-control"
                    contentEditable="true"
                    name="descrption"
                    onChange={e => whatWillLearnChange(e, index)}
                    dangerouslySetInnerHTML={{
                      __html: overview?.description,
                    }}
                  /> */}
                    <Input
                      name="description"
                      className="form-control form-control-color text-area"
                      placeholder="Description"
                      type="textarea"
                      onChange={e => whatWillLearnChange(e, index)}
                      value={overview?.description}
                    />
                  </td>

                  <td>
                    <Input
                      name="position"
                      className="form-control sml"
                      placeholder=" 1"
                      type="text"
                      onChange={e => whatWillLearnChange(e, index)}
                      value={overview?.position}
                    />
                  </td>
                  <td>
                    <div className="actions d-flex align-items-center justify-content-end">
                      <FormGroup switch>
                        <Input
                          type="switch"
                          name="enable"
                          checked={overview?.enable}
                          onChange={e => whatWillLearnChange(e, index)}
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
        )}

        <div>
          <button
            className="px-4 ms-3 create-new-appointment"
            // color="primary"
            // outline
            onClick={addWhatYouWillLearn}
            // type="submit"
          >
            Create New Field
            <img height="20px" width="20px" src={plus} />
          </button>
        </div>
      </AccordionBody>
    </AccordionItem>
  )
}

export default WhatYouWillLearn

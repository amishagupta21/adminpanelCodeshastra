import React from "react"
import {
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Input,
  FormGroup,
} from "reactstrap"
import plus from "../../assets/images/add-plus.svg"

const CurriculumCourse = () => {
  return (
    <AccordionItem>
      <AccordionHeader targetId="3">
        Curriculum
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
        <div className="custom-input-file">
          <span>
            Upload <img height="20px" width="20px" src={plus} />
          </span>
          <Input
            type="file"
            className="custom-file-label"
            id="inputGroupFile01"
            custom
          />
        </div>
      </AccordionBody>
    </AccordionItem>
  )
}

export default CurriculumCourse

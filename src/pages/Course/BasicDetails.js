import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Formik } from "formik"
import { FormButton } from "./formbutton"

export default function BasicDetails({
  courseDetails,
  setcourseDetails,
  banner_assets,
  setbanner_assets,
  isLoading,
  saveCourse,
}) {
  const addmoreBanerAssets = () => {
    let obj = {
      url: "",
      type: "image",
    }
    setbanner_assets(event => [...event, obj])
  }
  const removeAsset = index => {
    if (banner_assets.length > 1) {
      setbanner_assets(assets => assets?.filter((_, idx) => idx !== index))
    } else if (banner_assets.length === 1) {
      let curType = banner_assets[0].type
      setbanner_assets([
        ...banner_assets.slice(0, index),
        { url: "", type: curType },
        ...banner_assets.slice(index + 1),
      ])
    }
  }
  const uploadFile = index => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.click()
    input.onchange = async () => {
      const file = input.files[0]
      setbanner_assets([
        ...banner_assets.slice(0, index),
        { url: file.name, file: file, type: file.type },
        ...banner_assets.slice(index + 1),
      ])
    }
  }
  const changeMediaType = (index, type) => {
    setbanner_assets([
      ...banner_assets.slice(0, index),
      { url: "", type: type },
      ...banner_assets.slice(index + 1),
    ])
  }
  return (
    <>
      {!isLoading && (
        <Formik
          initialValues={{
            course_title: courseDetails.course_title ?? "",
            about_course: courseDetails.about_course ?? "",
            course_type: courseDetails.course_type ?? "",
          }}
          validate={values => {
            const errors = {}
            if (!values.course_title) {
              errors.course_title = "Required"
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values", values)
            values.course_status = "Draft"
            saveCourse(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId={"course_title"}>
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  name="course_title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course_title}
                  placeholder="Enter Course Title"
                />
                {errors.course_title &&
                  touched.course_title &&
                  errors.course_title}
              </Form.Group>
              <Form.Group className="mb-3" controlId={"course_title"}>
                <Form.Label>About</Form.Label>
                <Form.Control
                  as="textarea"
                  name="about_course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.about_course}
                  placeholder="About"
                  rows={5}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"course_type"}>
                <Form.Label>Course Type</Form.Label>
                <select
                  name="course_type"
                  className="form-select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course_type}
                >
                  <option>Live</option>
                  <option>Pre-Recorded</option>
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Banner Assets
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="light"
                    id="button-addon2"
                    className="align-self-end"
                    onClick={() => addmoreBanerAssets()}
                  >
                    Add more
                  </Button>
                </Form.Label>
                {banner_assets.map((element, index) => {
                  return (
                    <React.Fragment key={index}>
                      <InputGroup className="mb-1" style={{ width: "70%" }}>
                        {element.type != "youtube" && (
                          <>
                            <Form.Control
                              placeholder={
                                element.url ? element.type : "No file uploaded"
                              }
                              aria-describedby="basic-addon2"
                              className="align-self-end"
                              style={{ height: "40px" }}
                              disabled={true}
                            />
                            <Button
                              variant="outline-secondary"
                              id={"upload-button" + index}
                              className="align-self-end"
                              style={{ height: "40px", marginRight: "5px" }}
                              onClick={() => uploadFile(index)}
                              disabled={element.type === "youtube"}
                            >
                              Uplode
                            </Button>
                          </>
                        )}
                        {element.type === "youtube" && (
                          <>
                            <Form.Control
                              placeholder={
                                element.url ? element.url : "Enter the URL"
                              }
                              aria-describedby="basic-addon2"
                              className="align-self-end"
                              style={{ height: "40px" }}
                              onChange={event => {
                                setbanner_assets([
                                  ...banner_assets.slice(0, index),
                                  {
                                    url: event.target.value,
                                    type: "youtube",
                                  },
                                  ...banner_assets.slice(index + 1),
                                ])
                              }}
                            />
                          </>
                        )}
                        <Button
                          variant="outline-secondary"
                          id={"button-addon2" + index}
                          className="align-self-end"
                          style={{ height: "40px", marginRight: "5px" }}
                          onClick={() => removeAsset(index)}
                        >
                          Remove
                        </Button>
                        <Form.Group className="mb-2 align-self-end">
                          <Form.Check
                            inline
                            label="Youtube"
                            type="radio"
                            name={"mediatype" + index}
                            id={"youtube" + index}
                            defaultChecked={element.type === "youtube"}
                            onChange={() => changeMediaType(index, "youtube")}
                          />
                          <Form.Check
                            inline
                            label="Media"
                            type="radio"
                            name={"mediatype" + index}
                            id={"media" + index}
                            defaultChecked={element.type === "media"}
                            onChange={() => changeMediaType(index, "media")}
                          />
                        </Form.Group>
                      </InputGroup>
                    </React.Fragment>
                  )
                })}
              </Form.Group>
              <FormButton isLoading={isLoading}></FormButton>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}

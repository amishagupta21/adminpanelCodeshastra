import React, { useState } from "react"

import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { Formik } from "formik"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Col, Collapse, Label, Row } from "reactstrap"
import { FormButton } from "./formbutton"

import classnames from "classnames"
import { InputGroup } from "react-bootstrap"

export default function BasicDetails({
  courseDetails,
  setcourseDetails,
  isLoading,
  saveCourse,
}) {
  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    language: "en",
  }
  const [qualification, setqualification] = useState(
    courseDetails.sections?.eligibilityCriteria?.value[0]?.value
  )
  const [documentsRequired, setdocumentsRequired] = useState(
    courseDetails.sections?.eligibilityCriteria?.value[1]?.value
  )
  const [ageLimit, setageLimit] = useState(
    courseDetails.sections?.eligibilityCriteria?.value[2]?.value
  )
  const [hardwareRequirement, sethardwareRequirement] = useState(
    courseDetails.sections?.eligibilityCriteria?.value[3]?.value
  )
  const [skillsRequired, setskillsRequired] = useState(
    courseDetails.sections?.eligibilityCriteria?.value[4]?.value
  )
  const [course_overview, setcourse_overview] = useState(
    courseDetails.sections?.courseOverview?.value ?? [
      {
        label: "",
        content: "",
      },
    ]
  )
  const [highlights, sethighlights] = useState(
    courseDetails.sections?.highlights?.value ?? [
      {
        value: "",
      },
    ]
  )
  const [learnings, setlearnings] = useState(
    courseDetails.sections?.learnings?.value ?? [
      {
        label: "",
        content: "",
      },
    ]
  )
  const [rate, setRate] = useState(courseDetails.sections?.rating ?? "")
  const [job_roles, setjob_roles] = useState(
    courseDetails.sections?.whatYouCanBecome?.value ?? []
  )
  const starStyle = {}
  const [col1, setcol1] = useState(true)
  const [col2, setcol2] = useState(false)
  const [col3, setcol3] = useState(false)
  const [col4, setcol4] = useState(false)
  const [col5, setcol5] = useState(false)
  const [col6, setcol6] = useState(false)
  const t_col1 = () => {
    setcol1(!col1)
    setcol2(false)
    setcol3(false)
    setcol4(false)
    setcol5(false)
    setcol6(false)
  }

  const t_col2 = () => {
    setcol2(!col2)
    setcol1(false)
    setcol3(false)
    setcol4(false)
    setcol5(false)
    setcol6(false)
  }

  const t_col3 = () => {
    setcol3(!col3)
    setcol6(false)
    setcol5(false)
    setcol4(false)
    setcol2(false)
    setcol1(false)
  }
  const t_col4 = () => {
    setcol4(!col4)
    setcol6(false)
    setcol5(false)
    setcol3(false)
    setcol2(false)
    setcol1(false)
  }
  const t_col5 = () => {
    setcol5(!col5)
    setcol6(false)
    setcol4(false)
    setcol3(false)
    setcol2(false)
    setcol1(false)
  }
  const t_col6 = () => {
    setcol6(!col6)
    setcol5(false)
    setcol4(false)
    setcol3(false)
    setcol2(false)
    setcol1(false)
  }
  const addMoreOverview = () => {
    setcourse_overview(event => [
      ...event,
      {
        label: "",
        content: "",
      },
    ])
  }
  const removeOverview = index => {
    setcourse_overview(assets => assets?.filter((_, idx) => idx !== index))
  }
  const addmoreHighlights = () => {
    sethighlights(event => [
      ...event,
      {
        value: "",
      },
    ])
  }
  const removeHighlights = index => {
    sethighlights(assets => assets?.filter((_, idx) => idx !== index))
  }
  const addMoreLearnings = () => {
    setlearnings(event => [
      ...event,
      {
        label: "",
        content: "",
      },
    ])
  }
  const removeLearnings = index => {
    setlearnings(assets => assets?.filter((_, idx) => idx !== index))
  }
  const handleDelete = () => {}
  return (
    <>
      {!isLoading && (
        <Formik
          initialValues={{
            students_enrolled: courseDetails?.students_enrolled ?? null,
            ratings: courseDetails?.sections?.ratings?.value ?? null,
            description: courseDetails?.description ?? null,
            course_url: courseDetails?.course_url ?? null,
          }}
          onSubmit={(values, { setSubmitting }) => {
            values.sections = {}
            values.sections.eligibilityCriteria = {
              label: "Eligibility Criteria",
              value: [
                { key: "qualification", value: qualification },
                { key: "documentsRequired", value: documentsRequired },
                { key: "ageLimit", value: ageLimit },
                { key: "skillsRequired", value: skillsRequired },
                { key: "hardwareRequirement", value: hardwareRequirement },
              ],
              type: "blocks",
            }
            values.sections.courseOverview = {
              label: "Course Overview",
              value: course_overview,
              type: "blocks",
            }
            values.sections.learnings = {
              label: "Learnings",
              value: learnings,
              type: "blocks",
            }
            values.sections.whatYouCanBecome = {
              label: "The Best Job Roles You Can Get",
              type: "blocks",
              value: job_roles,
            }
            values.sections.ratings = {
              label: "Ratings",
              type: "string",
              value: values.ratings,
            }
            values.sections.highlights = {
              label: "Highlights",
              type: "block",
              value: highlights,
            }
            values.sections.batches = courseDetails.sections?.batches
            values.sections.feesStructure =
              courseDetails.sections?.feesStructure
            values.sections.placementPartner =
              courseDetails.sections?.placementPartner
            ;(values.course_status = "Published"), console.log("values", values)
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
              <Row>
                <Col lg={12}>
                  <div className="mt-4">
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFlushOne">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col1 }
                            )}
                            type="button"
                            onClick={t_col1}
                            style={{ cursor: "pointer" }}
                          >
                            Course Overview
                          </button>
                        </h2>

                        <Collapse isOpen={col1} className="accordion-collapse">
                          <div className="accordion-body">
                            <div className="text-muted">
                              <Row>
                                <Form.Group className="mb-3">
                                  <Form.Label>
                                    Course Overview
                                    <Button
                                      style={{ marginLeft: "10px" }}
                                      variant="light"
                                      id="button-addon2"
                                      className="align-self-end"
                                      onClick={() => addMoreOverview()}
                                    >
                                      Add more
                                    </Button>
                                  </Form.Label>
                                  {course_overview.map((element, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Row>
                                          <Col lg="4">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                Label
                                              </Label>

                                              <Form.Control
                                                type="text"
                                                onChange={event => {
                                                  setcourse_overview([
                                                    ...course_overview.slice(
                                                      0,
                                                      index
                                                    ),
                                                    {
                                                      label: event.target.value,
                                                      content: element.content,
                                                    },
                                                    ...course_overview.slice(
                                                      index + 1
                                                    ),
                                                  ])
                                                }}
                                                value={element.label}
                                                placeholder="Enter Title"
                                              />
                                            </div>
                                          </Col>
                                          <Col lg="8">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                content
                                              </Label>
                                              <InputGroup className="mb-1">
                                                <Form.Control
                                                  type="text"
                                                  onChange={event => {
                                                    setcourse_overview([
                                                      ...course_overview.slice(
                                                        0,
                                                        index
                                                      ),
                                                      {
                                                        label: element.label,
                                                        content:
                                                          event.target.value,
                                                      },
                                                      ...course_overview.slice(
                                                        index + 1
                                                      ),
                                                    ])
                                                  }}
                                                  value={element.content}
                                                  placeholder="Enter value"
                                                />
                                                <Button
                                                  variant="outline-secondary"
                                                  id={"button-addon2" + index}
                                                  className="align-center"
                                                  style={{
                                                    height: "auto",
                                                  }}
                                                  onClick={() =>
                                                    removeOverview(index)
                                                  }
                                                >
                                                  Remove
                                                </Button>
                                              </InputGroup>
                                            </div>
                                          </Col>
                                        </Row>
                                      </React.Fragment>
                                    )
                                  })}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFlushTwo">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col2 }
                            )}
                            type="button"
                            onClick={t_col2}
                            style={{ cursor: "pointer" }}
                          >
                            Eligiblity criteria
                          </button>
                        </h2>

                        <Collapse isOpen={col2} className="accordion-collapse">
                          <div className="accordion-body">
                            <div className="text-muted">
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Qualification
                                    </Label>

                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={qualification}
                                      onReady={editor => {}}
                                      onChange={(event, editor) => {
                                        const data = editor.getData()
                                        setqualification(data)
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      ID
                                    </Label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={documentsRequired}
                                      onReady={editor => {}}
                                      onChange={(event, editor) => {
                                        const data = editor.getData()
                                        setdocumentsRequired(data)
                                      }}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Age
                                    </Label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={ageLimit}
                                      onReady={editor => {}}
                                      onChange={(event, editor) => {
                                        const data = editor.getData()
                                        setageLimit(data)
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Skills Required
                                    </Label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={skillsRequired}
                                      onReady={editor => {}}
                                      onChange={(event, editor) => {
                                        const data = editor.getData()
                                        setskillsRequired(data)
                                      }}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Hardware
                                    </Label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={hardwareRequirement}
                                      onReady={editor => {}}
                                      onChange={(event, editor) => {
                                        const data = editor.getData()
                                        sethardwareRequirement(data)
                                      }}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFlushThree">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col3 }
                            )}
                            type="button"
                            onClick={t_col3}
                            style={{ cursor: "pointer" }}
                          >
                            What will you learn
                          </button>
                        </h2>
                        <Collapse isOpen={col3} className="accordion-collapse">
                          <div className="accordion-body">
                            <div className="text-muted">
                              <Row>
                                <Form.Group className="mb-3">
                                  <Form.Label>
                                    Learnings
                                    <Button
                                      style={{ marginLeft: "10px" }}
                                      variant="light"
                                      id="button-addon2"
                                      className="align-self-end"
                                      onClick={() => addMoreLearnings()}
                                    >
                                      Add more
                                    </Button>
                                  </Form.Label>
                                  {learnings.map((element, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Row>
                                          <Col lg="3">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                Label
                                              </Label>

                                              <Form.Control
                                                type="text"
                                                onChange={event => {
                                                  setlearnings([
                                                    ...learnings.slice(
                                                      0,
                                                      index
                                                    ),
                                                    {
                                                      label: event.target.value,
                                                      content: element.content,
                                                    },
                                                    ...learnings.slice(
                                                      index + 1
                                                    ),
                                                  ])
                                                }}
                                                value={element.label}
                                                placeholder="Enter Title"
                                              />
                                            </div>
                                          </Col>
                                          <Col lg="8">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                content
                                              </Label>

                                              <CKEditor
                                                editor={ClassicEditor}
                                                data={element.content}
                                                onReady={editor => {}}
                                                onChange={(event, editor) => {
                                                  const data = editor.getData()
                                                  setlearnings([
                                                    ...learnings.slice(
                                                      0,
                                                      index
                                                    ),
                                                    {
                                                      label: element.label,
                                                      content: data,
                                                    },
                                                    ...learnings.slice(
                                                      index + 1
                                                    ),
                                                  ])
                                                }}
                                              />
                                            </div>
                                          </Col>
                                          <Col lg="1">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                Remove
                                              </Label>
                                              <Button
                                                variant="outline-secondary"
                                                id={"button-addon2" + index}
                                                className="align-center"
                                                style={{
                                                  height: "auto",
                                                }}
                                                onClick={() =>
                                                  removeLearnings(index)
                                                }
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          </Col>
                                        </Row>
                                      </React.Fragment>
                                    )
                                  })}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFlushThree">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col4 }
                            )}
                            type="button"
                            onClick={t_col4}
                            style={{ cursor: "pointer" }}
                          >
                            The Best Job Roles You Can Get
                          </button>
                        </h2>
                        <Collapse isOpen={col4} className="accordion-collapse">
                          <div className="accordion-body">
                            <div className="text-muted">
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Jobs
                                    </Label>

                                    <Form.Control
                                      type="text"
                                      onKeyDown={e => {
                                        if (e.key === "Enter") {
                                          setjob_roles(event => [
                                            ...event,
                                            { value: e.target.value },
                                          ])
                                          e.preventDefault()
                                          e.target.value = null
                                        }
                                      }}
                                      placeholder="Enter Jobs"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                {/* <Stack direction="row" alignItems="center" spacing={2}>
                                  {job_roles.map((element, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Chip
                                          label={element.value}
                                          variant="outlined"
                                          onDelete={event => {
                                            setjob_roles(obj =>
                                              obj.filter(
                                                (_, idx) => idx !== index
                                              )
                                            )
                                          }}
                                        />
                                      </React.Fragment>
                                    )
                                  })}
                                </Stack> */}
                              </Row>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFlushOne">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col5 }
                            )}
                            type="button"
                            onClick={t_col5}
                            style={{ cursor: "pointer" }}
                          >
                            Highlights
                          </button>
                        </h2>

                        <Collapse isOpen={col5} className="accordion-collapse">
                          <div className="accordion-body">
                            <div className="text-muted">
                              <Row>
                                <Form.Group className="mb-3">
                                  <Form.Label>
                                    Highlights
                                    <Button
                                      style={{ marginLeft: "10px" }}
                                      variant="light"
                                      id="button-addon2"
                                      className="align-self-end"
                                      onClick={() => addmoreHighlights()}
                                    >
                                      Add more
                                    </Button>
                                  </Form.Label>
                                  {highlights.map((element, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Row>
                                          <Col lg="12">
                                            <div className="mb-3">
                                              <Label for="basicpill-firstname-input1">
                                                Value
                                              </Label>

                                              <Form.Control
                                                type="text"
                                                onChange={event => {
                                                  sethighlights([
                                                    ...highlights.slice(
                                                      0,
                                                      index
                                                    ),
                                                    {
                                                      value: event.target.value,
                                                    },
                                                    ...highlights.slice(
                                                      index + 1
                                                    ),
                                                  ])
                                                }}
                                                value={element.value}
                                                placeholder="Enter Details"
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                      </React.Fragment>
                                    )
                                  })}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFlushThree">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col6 }
                            )}
                            type="button"
                            onClick={t_col6}
                            style={{ cursor: "pointer" }}
                          >
                            Other Details
                          </button>
                        </h2>
                        <Collapse isOpen={col6} className="accordion-collapse">
                          <div className="accordion-body">
                            <div className="text-muted">
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Ratings
                                    </Label>
                                    <Form.Control
                                      type="text"
                                      name="ratings"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.ratings}
                                      placeholder="Enter Rating"
                                    />
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Student Enrolled
                                    </Label>
                                    <Form.Control
                                      type="text"
                                      name="students_enrolled"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.students_enrolled}
                                      placeholder="Enter Duration"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Description
                                    </Label>
                                    <Form.Control
                                      as="textarea"
                                      name="description"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
                                      placeholder="Enter Details"
                                      rows={5}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="12">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Course URL
                                    </Label>
                                    <Form.Control
                                      type="text"
                                      name="course_url"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.course_url}
                                      placeholder="Enter Course URL"
                                      rows={5}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <FormButton isLoading={isLoading}></FormButton>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}

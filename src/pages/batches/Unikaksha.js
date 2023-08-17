import React, { useEffect, useState } from "react"
// import { FaStar } from 'react-icons/fa-solid';
import { FaStar } from "react-icons/fa"
import axios from "axios"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Table,
  Progress,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  Spinner,
  AccordionBody,
} from "reactstrap"
import tosterMsg from "components/Common/toster"
import { post, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"

const Unikaksha = ({ unikaksha, openUnikasha }) => {
  const [data, setData] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  })

  const temp = formData

  const createUnikaksha = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}${url.UNIKAKSHA_DATA}`,
      data: temp,
    })
      .then(res => {
        tosterMsg(res?.data?.message)
        setFormData({
          full_name: "",
          email: "",
        })
        setData(res)
      })
      .catch(err => {
        tosterMsg(err)
      })

    // return resp
  }

  useEffect(() => {
    const isValid = formData.full_name !== "" && formData.email !== ""
    setIsFormValid(isValid)
  }, [formData.full_name, formData.email])

  return (
    <Modal
      isOpen={unikaksha}
      unikaksha={unikaksha}
      fade={false}
      centered
      size="lg"
    >
      <ModalHeader unikaksha={unikaksha}>Unikode Login</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={12} className="batch-accord">
            {/* {data} */}
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Email </Label>
                  <Input
                    name="email"
                    onChange={e => {
                      setFormData({ ...formData, email: e.target.value })
                    }}
                    value={formData?.email}
                    type="text"
                    placeholder="Enter Email"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Full Name </Label>
                  <Input
                    name="full_name"
                    onChange={e => {
                      setFormData({ ...formData, full_name: e.target.value })
                    }}
                    value={formData?.full_name}
                    type="text"
                    placeholder="Enter First and Last Name"
                    required
                  />
                </FormGroup>
              </Col>
              <div className="mt-3">
                {data.status === 200 && (
                  <>
                    <h5>id: {data?.data?.unikodeINFO[0]?.id}</h5>

                    <h5>Password: {data?.data?.unikodeINFO[0]?.password}</h5>
                    <h5>UserName: {data?.data?.unikodeINFO[0]?.username}</h5>
                  </>
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <div></div>
        <div>
          <Button
            color="primary"
            outline
            onClick={openUnikasha}
            className="px-5"
          >
            Cancel
          </Button>

          <Button
            color="primary"
            className="px-5 ms-3"
            onClick={createUnikaksha}
            disabled={!isFormValid}
          >
            Create
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default Unikaksha

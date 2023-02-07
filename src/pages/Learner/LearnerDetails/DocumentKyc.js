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
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import progressbar from "../../../assets/images/progress.gif"

const DocumentKyc = props => {
  const { userProfile } = props
  let inputRef

  const options = [
    { label: "INVITED ", value: "invited" },
    { label: "  ONBOARDED", value: "onboarded" },
    { label: "  SUSPENDED ", value: "suspended" },
    { label: "    DEACTIVATED ", value: "de-activated" },
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
      value: "#Lecture-1",
    },
    {
      title: "File Name",
      value: "12-10-2022",
    },
    {
      title: "Uploaded On",
      value: "08:00 AM",
    },
    {
      title: "File Size",
      value: "05:00 PM",
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
              {userProfile?.kyc &&
                Object?.keys(userProfile?.kyc).map(item => {
                  return (
                    <>
                      <tr>
                        <td>{item}</td>
                      </tr>
                      {/* <tr>
                        {userProfile?.kyc &&
                          Object?.values(userProfile?.kyc).map(item => {
                            return (
                              <>
                                <td>{item}</td>
                              </>
                            )
                          })}
                      </tr> */}
                    </>
                  )
                })}

              {/* <tr>
                <td>{userProfile?.kyc?.aadhar_card}</td>
                <td colSpan={5}>
                  <input
                    type="file"
                    hidden={true}
                    ref={refParam => (inputRef = refParam)}
                  />
                  <button
                    style={{
                      backgroundColor: "#d1d7f2",
                      color: "#000000",
                      width: "100%",
                      border: "1px dashed #556ee6",
                      borderRadius: "5px",
                    }}
                    onClick={() => inputRef.click()}
                  >
                    <img src={progressbar} />
                    <i className="mdi mdi-upload me-1" />
                    Upload
                  </button>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Col>
      </div>
    </>
  )
}

export default DocumentKyc

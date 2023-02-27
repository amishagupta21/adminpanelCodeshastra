import React from "react"
import Select from "react-select"
import _ from "lodash"
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

  console.log(userProfile, "//////////userProfile")
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

                        {/* {_.map(userProfile.kyc, (v, k) => {
                          console.log("=======value ", v)
                          console.log("======== key ====", k)
                          return <td>{v}</td>
                        })} */}
                      </tr>
                    </>
                  )
                })}
            </tbody>
          </Table>
          {/* <Row>
            <Col sm={6}>
              <ul>
                {userProfile?.kyc &&
                  Object?.keys(userProfile?.kyc).map(item => {
                    return (
                      <>
                        <li>{item}</li>
                      </>
                    )
                  })}
              </ul>
            </Col>
            <Col sm={2}>
              <ul>
                {userProfile?.kyc &&
                  Object?.values(userProfile?.kyc).map(item => {
                    console.log(Object?.values(userProfile?.kyc))
                    return (
                      <>
                        <li>
                          {" "}
                          <img src={item} />
                        </li>
                      </>
                    )
                  })}
              </ul>
            </Col>
            <Col sm={4}>
              {userProfile?.kyc &&
                Object?.values(userProfile?.kyc).map(item => {
                  console.log(Object?.values(userProfile?.kyc))
                  return (
                    <>
                      <tr>
                        <td>
                          <img src={item} />
                        </td>
                      </tr>
                    </>
                  )
                })}
            </Col>
          </Row> */}
        </Col>
      </div>
    </>
  )
}

export default DocumentKyc

// import { React, useEffect, useState } from "react"
// import {
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Container,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   Label,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
// } from "reactstrap"
// import BootstrapTable from "react-bootstrap-table-next"
// import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
// import dateFormate from "common/dateFormatter"
// import Select from "react-select"
// import { DeBounceSearch } from "common/DeBounceSearch"
// import DeleteModal from "components/Common/DeleteModal"
// import { ErrorMessage, Field, Formik } from "formik"
// import * as Yup from "yup"
// import tosterMsg from "components/Common/toster"
// import PropTypes from "prop-types"
// import { connect } from "react-redux"

// function DocumentKyc(props) {
//   document.title = "Users List"
//   const [isExpanded, setIsExpanded] = useState(null)
//   const [filters, setFilters] = useState({
//     sortBy: "created_at",
//     sortOrder: "DESC",
//     pageSize: 10,
//     page: 1,
//     status: "",
//     search: "",
//   })
//   const [usersListData, setUsersListData] = useState([])
//   const { user, userProfile } = props
//   console.log(userProfile)
//   let state = {
//     columns: [
//       {
//         dataField: "nickName",
//         text: "Document Name",
//       },

//       {
//         dataField: "created_at",
//         text: " File Name",
//         formatter: (cellContent, user) => dateFormate(user.created_at),
//       },
//       {
//         dataField: "email",
//         text: "Uploaded On",
//       },
//       {
//         dataField: "email",
//         text: "File Size",
//       },
//       {
//         dataField: "Actions",
//         text: "Actions",
//         formatter: (cellContent, user) => (
//           <UncontrolledDropdown>
//             <DropdownToggle className="card-drop" tag="a">
//               <i className="mdi mdi-dots-horizontal font-size-18" />
//             </DropdownToggle>
//             <DropdownMenu className="dropdown-menu-end">
//               <DropdownItem>
//                 <i className="mdi mdi-pencil font-size-16 text-success me-1" />
//                 Edit
//               </DropdownItem>
//               <DropdownItem>
//                 <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
//                 Delete
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         ),
//       },
//     ],
//   }

//   return (
//     <>
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col className="col-12">
//               {usersListData && (
//                 <>
//                   <ToolkitProvider
//                     key={isExpanded}
//                     keyField="id"
//                     columns={state.columns}
//                     data={usersListData}
//                   >
//                     {toolkitProps => (
//                       <>
//                         <Col xl="12">
//                           <div className="table-responsive">
//                             <BootstrapTable
//                               keyField={"id"}
//                               responsive
//                               bordered={false}
//                               striped={false}
//                               // defaultSorted={defaultSorted}
//                               classes={"table align-middle table-nowrap"}
//                               headerWrapperClasses={"thead-light"}
//                               {...toolkitProps.baseProps}
//                             />
//                           </div>
//                         </Col>
//                       </>
//                     )}
//                   </ToolkitProvider>
//                 </>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   )
// }

// DocumentKyc.propTypes = {
//   userRoles: PropTypes.array,
//   usersCount: PropTypes.number,
//   className: PropTypes.any,
//   LearnerDetails: PropTypes.any,
// }

// const mapStateToProps = ({ LearnerDetails, state, count }) => ({
//   user: LearnerDetails?.data?.user,
//   userProfile: LearnerDetails?.data?.userProfile,
//   uploadProfilePicture: LearnerDetails?.uploadProfilePicture,
//   editLearnerDetail: LearnerDetails?.editLearnerDetail,
// })

// const mapDispatchToProps = dispatch => ({
//   onGetDeleteProfilePicture: uid => dispatch(deleteProfilePicture(uid)),
//   onGetUploadProfilePicture: data => dispatch(uploadProfilePicture(data)),
//   onGetEditLearnerDetail: data => dispatch(editLearnerDetail(data)),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(DocumentKyc)

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
  CloseButton,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  Spinner,
  AccordionBody,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import { DeBounceSearch } from "common/DeBounceSearch"
import { Link } from "react-router-dom"
import paginationFactory from "react-bootstrap-table2-paginator"
import { connect, useDispatch } from "react-redux"
import { getLearner, getAllLearner } from "store/Learner/actions"
import PropTypes from "prop-types"
import { del, post, patch, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import tosterMsg from "components/Common/toster"

const AddNewLearner = ({
  newLearner,
  openNewLearner,
  closeNewLearner,
  onGetLearner,
  onGetAllLearner,
  manageUser,
  manageUserLoader,
  unikodecourseid,
  usersCount,
  setNewLearner,
}) => {
  const [isExpanded, setIsExpanded] = useState(null)
  const [selectData, setSelectData] = useState([])

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{user?.id}</>,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
        formatter: (cellContent, user) => (
          <div className="fw-bold">{user?.fullName}</div>
        ),
      },

      {
        dataField: "email",
        text: "Email",
        sort: true,
      },

      {
        dataField: "phone",
        text: "Mobile",
        sort: true,
      },

      {
        dataField: "status",
        text: "Status",
        formatter: (cellContent, user) => (
          <div>
            <span
              className={
                user?.status === true
                  ? "btn-status-active"
                  : "btn-status-inactive"
              }
            >
              {user?.status === true ? "Active" : "Inactive"}
            </span>
          </div>
        ),
      },
    ],
  }

  useEffect(() => {
    if (newLearner) onGetAllLearner()
  }, [newLearner])

  const handleSearch = e => {
    const data = {
      search: e,
    }
    onGetLearner(data)
  }

  const handleClick = (row, isSelected, rowIndex, addlearners, e) => {
    if (isSelected) {
      setSelectData(prevClickedIds => {
        if (prevClickedIds.length && prevClickedIds[0].courseid) {
          const addlearnersdata = [...prevClickedIds[0].addlearners]
          addlearnersdata.push({
            email: row.email,
            unikodeuserid: null,
          })
          return [
            {
              courseid: unikodecourseid,
              addlearners: addlearnersdata,
            },
          ]
        } else {
          return [
            {
              courseid: unikodecourseid,
              addlearners: [
                {
                  email: row.email,
                  unikodeuserid: null,
                },
              ],
            },
          ]
        }
      })
    } else {
      const filteredArr = selectData[0]?.addlearners.filter(
        item => item.unikodeuserid !== row.uid
      )
      setSelectData([
        {
          courseid: selectData[0].courseid,
          addlearners: filteredArr,
        },
      ])
    }
  }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: handleClick,
  }

  const addNewLearner = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}${url.ADD_NEW_LEARNER}`,
        selectData[0]
      )
      .then(res => {
        tosterMsg(res?.data?.message)
        res?.data?.data.forEach(message => {
          tosterMsg(message)
        })
        closeNewLearner()
      })
      .catch(error => {
        tosterMsg(error)
      })
  }

  return (
    <Modal
      isOpen={newLearner}
      openNewLearner={openNewLearner}
      fade={false}
      centered
      size="xl"
    >
      <ModalHeader openNewLearner={openNewLearner} className="my-modal-header">
        <span>Add New Learner</span>
        <CloseButton onClick={closeNewLearner} />
      </ModalHeader>
      <ModalBody>
        <div className="batches-home">
          <Row>
            <Col md={6}>
              <div className="search-box">
                <div className="app-search p-0">
                  <div className="position-relative mb-2">
                    <DeBounceSearch handleSearch={handleSearch} />
                    <span className="bx bx-search-alt" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <ToolkitProvider
            key={isExpanded}
            keyField="_id"
            columns={state?.columns}
            data={manageUser}
          >
            {toolkitProps => (
              <>
                <Col xl="12">
                  <div className="table-responsive">
                    <h6 className="mt-2">
                      Total Batches: &nbsp;{manageUser?.length}
                    </h6>
                    <BootstrapTable
                      keyField={"_id"}
                      responsive
                      bordered={false}
                      striped={false}
                      defaultSorted={defaultSorted}
                      selectRow={selectRow}
                      classes={"table align-middle table-nowrap"}
                      headerWrapperClasses={"thead-light"}
                      {...toolkitProps.baseProps}
                      pagination={paginationFactory()}
                      noDataIndication={
                        manageUserLoader ? (
                          <div className="d-flex justify-content-center">
                            <Spinner size="" color="primary" />
                          </div>
                        ) : (
                          "No data found"
                        )
                      }
                    />
                  </div>
                </Col>
              </>
            )}
          </ToolkitProvider>
        </div>
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <div>
          {/* <Button color="success" className="px-5">
            Clone
          </Button> */}
        </div>
        <div>
          <Button
            onClick={closeNewLearner}
            outline
            color="primary"
            className="px-5"
          >
            Cancel
          </Button>

          <Button onClick={addNewLearner} color="primary" className="px-5 ms-3">
            Add
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

AddNewLearner.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Learner: PropTypes.array,
  manageUserLoader: PropTypes.any,
}

const mapStateToProps = ({ Learner, state, count }) => ({
  manageUser: Learner?.manageUser,
  usersCount: Learner?.count,
  manageUserLoader: Learner?.manageUserLoader,
})

const mapDispatchToProps = dispatch => ({
  onGetLearner: data => dispatch(getLearner(data)),
  onGetAllLearner: data => dispatch(getAllLearner(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewLearner)

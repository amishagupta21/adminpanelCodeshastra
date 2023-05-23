import { React, useEffect, useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  ListGroup,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import dateFormate from "common/dateFormatter"
import Select from "react-select"
import { DeBounceSearch } from "common/DeBounceSearch"
import { ErrorMessage, Field, Formik } from "formik"
import * as Yup from "yup"
import tosterMsg from "components/Common/toster"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import {
//   getLearner,
//   deleteLearner,
//   getStatusFilter,
//   registerUser,
// } from "store/actions"
import { getBatches } from "store/Batches/actions"
import { useParams } from "react-router-dom"
import paginationFactory from "react-bootstrap-table2-paginator"
import "./courseList.css"
import { Tab, Tabs } from "react-bootstrap"
import LiveCourses from "./LiveCourses"
import Nav from "react-bootstrap/Nav"
import BatchTable from "./BatchTable"

function Batch(props) {
  const params = useParams()

  document.title = "Users List"

  const { manageUser, usersCount } = props
  const [item, setItem] = useState(manageUser)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  useEffect(() => {
    const { onGetBatches } = props
    const data = {
      id: params.id,
      search: "",
      pageSize: "",
      page: "",
      sortOrder: "",
      sortBy: "",
      // startDate: "",
      // endDate: "",
    }
    onGetBatches(data)
  }, [])

  const handleSearch = e => {
    const { onGetBatches } = props
    const data = {
      search: e,
    }
    onGetBatches(data)
    const { Courses } = props
    setState({ Courses })
  }

  const addStartDate = e => {
    setStartDate(e)
  }

  const addEndDate = e => {
    setEndDate(e)
  }

  const applyFilter = () => {
    const { onGetBatches } = props
    const formatedDate = startDate
      ? `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`
      : ""
    const formatedEndDate = endDate
      ? `${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getDate()}`
      : ""
    const data = {
      startDate: formatedDate,
      endDate: formatedEndDate,
    }
    onGetBatches(data)
  }

  return (
    <>
      <Container fluid className="courseList">
        <Row>
          <h4 className="text-primary">Batch Configuration</h4>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col className="mt-2" sm={12}>
              <Tab.Content>
                <BatchTable
                  item={item}
                  manageUser={manageUser}
                  applyFilter={applyFilter}
                  handleSearch={handleSearch}
                  usersCount={usersCount}
                  addStartDate={addStartDate}
                  addEndDate={addEndDate}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </>
  )
}

Batch.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Batches: PropTypes.array,
}

const mapStateToProps = ({ Batches, state, count }) => ({
  manageUser: Batches?.manageUser,
  usersCount: Batches?.count,
  userRoles: Batches?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetBatches: data => dispatch(getBatches(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batch)

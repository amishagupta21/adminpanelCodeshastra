import React, { useState, useEffect } from "react"
import "../batches/batches.css"

import { Row, Col } from "reactstrap"
import PropTypes from "prop-types"
import { connect, useDispatch } from "react-redux"
import {
  getBatchesList,
  getDashboard,
  editNewBatch,
  getBatchApi,
  deleteBatches,
  getAllBatchesList,
} from "store/Batches/actions"
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"

import DeleteModal from "components/Common/DeleteModal"
import EditNewModal from "./EditNewModal"
import { del, post, patch, getCourseData } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"

import tosterMsg from "components/Common/toster"
import Status from "./Status"
import "./batches.css"

import "react-responsive-pagination/themes/classic.css"
import Unikaksha from "./Unikaksha"
import FilterBatches from "./FilterBatches"
import BatchesFunctionality from "./BatchesFunctionality"
import BatchesTable from "./BatchesTable"
import { Link, useParams, useHistory } from "react-router-dom"

const Batches = props => {
  const axios = require("axios")
  const {
    manageUser,
    usersCount,
    dashboard,
    batchApi,
    onGetBatchesList,
    onGetDashboard,
    onGetBatchesApi,
    createNewBatch,
    manageUserLoader,
    onGetAllBatchesList,
  } = props
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [editModal, setEditModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState([])
  const [sendId, setSendId] = useState([])
  const [isSelected, setIsSelected] = useState("first")
  const [item, setItem] = useState(manageUser)
  const [clickedIds, setClickedIds] = useState([])

  // const[currBatch , setCurrBatch] = useState(onGetAllusersCountList)
  const [activeTab, setActiveTab] = useState("true")

  const confirmStatus = () => {
    setActive(true)
  }

  const closeModal = () => setActive(false)

  const editNewModal = id => {
    onGetBatchesApi(id)
    setEditModal(true)
  }

  const handleDeleteUser = () => {
    if (user !== undefined) {
      const updatedUsers = users.filter(e => e.id !== user.id)
      setUsers(updatedUsers)

      setDeleteModalIsOpen(false)
    }
  }

  const history = useHistory()

  useEffect(() => {
    onGetDashboard()
  }, [])

  const handleEdit = async data => {
    try {
      // Make the edit request
      const response = await patch(url.GET_STATUS + `/${data?.id}`, {
        enable: !data?.enable,
      })

      setActive(false)
      onGetBatchesList()
    } catch (error) {}
  }

  const cancelNewModal = () => {
    setEditModal(false)
  }

  const filterData = clickedBatch => {
    setActiveTab(clickedBatch)
    const filteredBatch = manageUser.filter(item => {
      return item.enable === clickedBatch
    })

    setItem(filteredBatch)
  }

  const FilterPastBatches = clickedBatch => {
    setActiveTab(clickedBatch)

    let filteredPast = manageUser.filter(item => {
      return new Date(item.end_date).getTime() < new Date().getTime()
    })
    setItem(filteredPast)
  }

  const onClickDelete = async id => {
    const resp = await del(url.GET_DELETE_BATCHES + `${user?.id}`)
    const finalItem = item.filter(item => item.id !== user?.id)
    setItem(finalItem)
    setDeleteModalIsOpen(false)
    return resp
  }

  const sorting = () => {
    manageUser.sort((a, b) => a.name.localeCompare(b.name))

    setItem(manageUser)
  }

  useEffect(() => {
    setItem(sorting)
  }, [manageUser])

  return (
    <div className="page-content batches-home">
      <Status
        active={active}
        confirmStatus={confirmStatus}
        closeModal={closeModal}
        handleEdit={handleEdit}
        user={data}
      />
      <DeleteModal
        show={deleteModalIsOpen}
        onDeleteClick={handleDeleteUser}
        onClickDelete={onClickDelete}
        onCloseClick={() => setDeleteModalIsOpen(false)}
      />
      {editModal && (
        <EditNewModal
          editNewModal={editNewModal}
          editModal={editModal}
          batchApi={batchApi}
          cancelNewModal={cancelNewModal}
          setEditModal={setEditModal}
          onGetBatchesList={onGetBatchesList}
        />
      )}

      <Row>
        <Col md={12}>
          <h4 className="mb-3">BATCHES</h4>
          <FilterBatches
            setIsSelected={setIsSelected}
            onGetBatchesList={onGetBatchesList}
            isSelected={isSelected}
            filterData={filterData}
            dashboard={dashboard}
            FilterPastBatches={FilterPastBatches}
          />

          <BatchesFunctionality
            isLoading={isLoading}
            createNewBatch={createNewBatch}
            onGetBatchesList={onGetBatchesList}
            manageUser={manageUser}
            setItem={setItem}
            item={item}
            clickedIds={clickedIds}
            setIsLoading={setIsLoading}
          />
          <BatchesTable
            ToolkitProvider={ToolkitProvider}
            item={item}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            dashboard={dashboard}
            manageUserLoader={manageUserLoader}
            usersCount={usersCount}
            onGetBatchesList={onGetBatchesList}
            data={data}
            setData={setData}
            editNewModal={editNewModal}
            setUser={setUser}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            manageUser={manageUser}
            confirmStatus={confirmStatus}
            setActive={setActive}
          />
        </Col>
      </Row>
    </div>
  )
}

Batches.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Batches: PropTypes.array,
}

const mapStateToProps = ({ Batches, state, count }) => {
  return {
    manageUser: Batches?.manageUser,
    manageUserLoader: Batches?.manageUserLoader,
    usersCount: Batches?.count,
    dashboard: Batches?.dashboard,
    userRoles: Batches?.roles,
    batchApi: Batches?.batchApi,
    createNewBatch: Batches?.createNewBatch,
    // deleteData: false,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetBatchesList: data => dispatch(getBatchesList(data)),
  onGetAllBatchesList: data => dispatch(getAllBatchesList(data)),
  onGetBatchesApi: data => dispatch(getBatchApi(data)),
  onGetDashboard: data => dispatch(getDashboard(data)),
  onGetDeleteBatches: id => dispatch(deleteBatches(id)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Batches)

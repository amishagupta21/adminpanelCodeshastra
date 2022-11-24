import { React, useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Modal, ModalHeader, ModalBody, Form, Label, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import dateFormate from "common/dateFormatter";
import Select from "react-select";
import { DeBounceSearch } from "common/DeBounceSearch";
import DeleteModal from "components/Common/DeleteModal";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import tosterMsg from "components/Common/toster";

function UsersList({
  getAllUsers,
  deleteAnUser,
  getUserRoles,
  updateAnUser,
  addAnUser,
}) {
  document.title="Users List";
  const [isExpanded, setIsExpanded] = useState(null);
  const [filters, setFilters] = useState({sortBy: 'created_at', sortOrder: 'DESC', pageSize: 10, page: 1, status: '', search: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [usersListData, setUsersListData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState();
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getUsersList(filters);
  }, [filters])

  useEffect(() => {
    loadMasterData();
  }, [])

  const loadMasterData = async () => {
    const res = await getUserRoles();
    const roles = res.data.map(roles => {
      return {
        label: roles.rolename,
        value: roles.id,
        addcourse: roles.addcourse,
        adduser: roles.adduser,
        editcourse: roles.editcourse,
      };
    });
    setUserRoles(roles);
  };

  const getUsersList = async (filters) => {
    const res = await getAllUsers(filters);
    setUsersListData(res?.data.result);
    setUsersCount(res?.data.count);
  }

  const pageCount = () => {
    return parseInt((usersCount + filters.pageSize - 1) / filters.pageSize);
  }
  const paginationPage = Array.apply(null, new Array(pageCount));

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setFilters(prev => ({...prev, page: page}));
  };

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const selectRow = {
    mode: "checkbox",
  };

  const handleUserClick = (user) => {
    const arr = [];
    user.userRoles.map(role => {
      arr.push({ label: role.role.rolename, value: role.role.id });
    });

    setUser({
      id: user?.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
      email: user.email,
      roles: arr,
    });
    setIsEdit(true);
    setSelectedMulti(arr);
    toggle();
  };

  const toggle = () => {
    setModalIsOpen(prevState => (!prevState))
  };

  const handleUserClicks = user => {
    setUser(user);
    setIsEdit(false);
    setSelectedMulti([]);
    toggle();
  };

  const handleMulti = value => {
    setSelectedMulti(value)
  };

  const options = [
    { label: "INVITED ", value: "invited" },
    { label: "ONBOARDED", value: "onboarded" },
    { label: "SUSPENDED ", value: "suspended" },
    { label: "DEACTIVATED ", value: "de-activated" },
  ];

  const handleFilter = status => {
    setFilters(prev => ({...prev, page: 1, status: status.value }));
  };

  const handleSearch = e => {
    setFilters(prev => ({...prev, page: 1, search: e }));
  };

  const onClickDelete = user => {
    setUser(user);
    setDeleteModalIsOpen(true);
  };

  const handleDeleteUser = async () => {
    if (user !== undefined) {
      const res = await deleteAnUser(user.uId);
      if (res.data.deleted) setDeleteModalIsOpen(false);
      getUsersList();
    }
  };

  const onCreateUser = async (user) => {
    const res = await addAnUser(user);
    if(res.data) { tosterMsg('success', res.message)}
    getUsersList(filters);
  }

  const onUpdateUser = async (user) => {
    const res = await updateAnUser(user);
    if(res.data) { tosterMsg('success', res.message)}
    getUsersList(filters);
  }

  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{row?.id}</>,
      },
      {
        dataField: "nickName",
        text: "Name",
        sort: true,
      },

      {
        dataField: "created_at",
        text: "Created At",
        sort: true,
        formatter: (cellContent, user) => dateFormate(user.created_at),
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
      },
      {
        dataField: "Roles",
        text: "Roles",
        formatter: (cellContent, user) => {
          return (
            <div
              className="roles d-flex flex-column gy-3"
              key={isExpanded}
            >
              {user?.userRoles
                ?.slice(
                  0,
                  isExpanded === user.id
                    ? user?.userRoles?.length
                    : 1
                )
                .map(role => {
                  if (role?.role?.id === 1) {
                    return (
                      <span key={role?.role?.id}>
                        <span className="textHeighlight red">
                          {role?.role?.rolename}
                        </span>
                      </span>
                    );
                  }
                  if (role?.role?.id === 2) {
                    return (
                      <span key={role?.role?.id}>
                        <span className="textHeighlight yellow">
                          {role?.role?.rolename}
                        </span>
                      </span>
                    );
                  }
                  if (role?.role?.id === 3) {
                    return (
                      <span key={role?.role?.id}>
                        <span className="textHeighlight blue">
                          {role?.role?.rolename}
                        </span>
                      </span>
                    );
                  }
                })}

              {user?.userRoles?.length > 1 && (
                <i
                  className="bx bx-plus show-more"
                  onClick={() => {
                    showMore(user?.id);
                  }}
                >
                  <span className="show-more">
                  {isExpanded === user?.id
                    ? 'Show less'
                    : `${user?.userRoles?.length-1} more`}
                  </span>
                </i>
              )}
            </div>
          );
        },
        sort: true,
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <UncontrolledDropdown>
            <DropdownToggle className="card-drop" tag="a">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => handleUserClick(user)}>
                <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => onClickDelete(user)}>
                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
      },
    ],
  };

  const showMore = (id) => {
    if (isExpanded) {
      setIsExpanded(null);
    } else {
      setIsExpanded(id);
    }
  };

  return (
    <>
      <DeleteModal
        show={deleteModalIsOpen}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModalIsOpen(false)}
      />
      <div className="page-content">
        <Container fluid>
          <h4>Users</h4>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  {usersListData && (
                    <>
                      <ToolkitProvider
                        key={isExpanded}
                        keyField="id"
                        columns={state.columns}
                        data={usersListData}
                      >
                      {toolkitProps => (
                        <>
                          <Row>
                            <Col sm="4">
                              <div className="app-search p-0">
                                <div className="position-relative">
                                  <DeBounceSearch
                                    handleSearch={handleSearch}
                                  />
                                  <span className="bx bx-search-alt" />
                                </div>
                              </div>
                            </Col>
                            <Col sm="3">
                              <Select
                                name="filter"
                                onChange={handleFilter}
                                placeholder="Select Status"
                                options={options}
                              />
                            </Col>
                            <Col sm="5">
                              <div className="text-sm-end">
                                <Button
                                  type="button"
                                  color="success"
                                  className="btn-rounded mb-2 me-2"
                                  onClick={handleUserClicks}
                                >
                                  <i className="mdi mdi-plus me-1" /> New User
                                </Button>
                              </div>
                            </Col>
                          </Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                // defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                          <Modal
                            isOpen={modalIsOpen}
                          >
                            <ModalHeader toggle={toggle} tag="h4">
                              {!!isEdit ? "Edit User" : "Add User"}
                            </ModalHeader>
                            <ModalBody>
                              <Formik
                                enableReinitialize={true}
                                initialValues={{
                                  nickName: (user && user?.nickName) || "",
                                  email: (user && user?.email) || "",
                                  roles: (user && user?.roles) || [],
                                }}
                                validationSchema={Yup.object().shape({
                                  nickName: Yup.string().required(
                                    "Please Enter Your Name"
                                  ),
                                  email: Yup.string().required(
                                    "Please Enter Your Email"
                                  ),
                                  roles: Yup.array().required(
                                    "Please Select Roles"
                                  ),
                                })}
                                onSubmit={values => {
                                  if (isEdit) {
                                    const updateUser = {
                                      id: user?.id,
                                      nickName: values?.nickName,
                                      email: values?.email,
                                      roles: selectedMulti?.map(
                                        role => role.value
                                      ),
                                    };
                                    onUpdateUser(updateUser);
                                  } else {
                                    const newUser = {
                                      nickName: values?.nickName,
                                      email: values?.email,
                                      roles: selectedMulti?.map(
                                        role => role.value
                                      ),
                                    };
                                    onCreateUser(newUser);
                                  }
                                  toggle();
                                }}
                              >
                                {({ errors, touched, handleSubmit }) => (
                                  <Form
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                  >
                                    <Row>
                                      <Col className="col-12">
                                        <div className="mb-3">
                                          <Label className="form-label">
                                            NickName*
                                          </Label>
                                          <Field
                                            name="nickName"
                                            type="text"
                                            className={
                                              "form-control" +
                                              (errors.nickName &&
                                              touched.nickName
                                                ? " is-invalid"
                                                : "")
                                            }
                                          />
                                          <ErrorMessage
                                            name="nickName"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </div>

                                        <div className="mb-3">
                                          <Label className="form-label">
                                            Email*
                                          </Label>
                                          <Field
                                            name="email"
                                            type="email"
                                            className={
                                              "form-control" +
                                              (errors.email && touched.email
                                                ? " is-invalid"
                                                : "")
                                            }
                                          />
                                          <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </div>

                                        <div className="mb-3 select2-container">
                                          <label className="control-label">
                                            Roles*
                                          </label>
                                          <Select
                                            name="roles"
                                            value={selectedMulti}
                                            onChange={handleMulti}
                                            placeholder="select roles"
                                            options={userRoles}
                                            isMulti={true}
                                            className={
                                              errors.roles && touched.roles
                                                ? " is-invalid"
                                                : ""
                                            }
                                          />
                                          <ErrorMessage
                                            name="roles"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <div className="text-end">
                                          <button
                                            type="submit"
                                            className="btn btn-success save-user"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Form>
                                )}
                              </Formik>
                            </ModalBody>
                          </Modal>
                        </>
                      )}
                      </ToolkitProvider>
                    </>
                  )}
                  <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                      {currentPage !== 1 && (
                        <>
                          <PaginationItem>
                            <PaginationLink
                              first
                              onClick={() => handlePageChange(1)}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() =>
                                handlePageChange(
                                  currentPage-1
                                )
                              }
                              previous
                            />
                          </PaginationItem>
                        </>
                      )}
                      {paginationPage.map((page, index) => {
                        if (currentPage === index + 1) {
                          return (
                            <PaginationItem key={index + 1} active>
                              <PaginationLink
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else {
                          return (
                            <PaginationItem key={index + 1}>
                              <PaginationLink
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      })}

                      {currentPage !== pageCount && (
                        <>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() =>
                                handlePageChange(
                                  currentPage + 1
                                )
                              }
                              next
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => handlePageChange(pageCount)}
                              last
                            />
                          </PaginationItem>
                        </>
                      )}
                    </Pagination>
                </CardBody>    
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UsersList;

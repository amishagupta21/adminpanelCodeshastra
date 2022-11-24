import { React } from "react";
import PropTypes from 'prop-types';
import UsersList from "./users_list";


const propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteAnUser: PropTypes.func.isRequired,
  getUserRoles: PropTypes.func.isRequired,
  updateAnUser: PropTypes.func.isRequired,
  addAnUser: PropTypes.func.isRequired
};

const Users = ({
  getAllUsers,
  deleteAnUser,
  updateAnUser,
  getUserRoles,
  addAnUser
}) => {
  return(
    <>
      <UsersList
        getAllUsers={getAllUsers}
        deleteAnUser={deleteAnUser}
        getUserRoles={getUserRoles}
        updateAnUser={updateAnUser}
        addAnUser={addAnUser}
      />
    </>
  );
}

Users.propTypes = propTypes;

export default Users;
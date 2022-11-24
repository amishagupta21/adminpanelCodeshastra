import React from 'react';
import { del, get, patch, post, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Users from '.';
import tosterMsg from "components/Common/toster";

const UsersConnector = () => {
  const getAllUsers = React.useCallback(async (filter) => {
    const res = await get(
      url.GET_USERS +`?sortBy=${filter?.sortBy || "created_at"}&sortOrder=${filter?.sortOrder || "DESC"}&pageSize=${filter?.pageSize || 10}&page=${filter?.page || 1}&status=${filter?.status || null}&keyword=${filter?.search || ""}`
    );
    return res;
  },[])

  const deleteUser = React.useCallback(async (uid) => {
    const res = await put(url.DELETE_USER+`${uid}`);
    return res;
  }, [])

  const getUserRoles = React.useCallback(async () => {
    const res = await get(url.GET_USER_ROLES);
    return res;
  }, [])

  const updateAnUser = React.useCallback(async (user) => {
    const res = await patch(url.UPDATE_USER, user);
    return res;
  }, []);
  
  const addAnUser = React.useCallback(async (user) => {
    const res = await put(url.ADD_NEW_USER, user);
    return res;
  }, [])

  return (
    <>
      <Users
        getAllUsers={getAllUsers}
        deleteAnUser={deleteUser}
        getUserRoles={getUserRoles}
        updateAnUser={updateAnUser}
        addAnUser={addAnUser}
      />
    </>
  )
}

export default UsersConnector

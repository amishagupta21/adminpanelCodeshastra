import axios from "axios"

const accessToken = JSON.parse(localStorage.getItem("authUser"))
  ?.stsTokenManager?.accessToken
//pass new generated access token here
const token = accessToken || ""

//apply base url for axios
const API_URL = `${process.env.REACT_APP_API_URL}`
const URL = `${process.env.REACT_APP_URL}`

const Api = axios.create({
  baseURL: URL,
})

Api.defaults.headers.common["access-key"] = "fD3T+LGHC&eIV5nh"

Api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

// const courseApi = axios.create({
//   baseURL: COURSE_API_URL,
// })

// courseApi.defaults.headers.common["Authorization"] = token

// courseApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// )

export async function getCourseData(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function getData(url, config = {}) {
  return await Api.get(url, { ...config }).then(response => response.data)
}

export async function deleteData(url, config = {}) {
  return await Api.delete(url, { ...config }).then(response => response.data)
}

export async function deleteDocumentKyc(url, data, config = {}) {
  return await Api.delete(url, { data: { ...data } }, { ...config }).then(
    response => response.data
  )
}

export async function deleteProfilePicture(url, data, config = {}) {
  return await Api.delete(url, { data: { ...data } }, { ...config }).then(
    response => response.data
  )
}

export async function putDetail(url, data, config = {}) {
  return await Api.patch(url, { ...data }, { ...config }).then(
    response => response.data
  )
}

export async function postImage(url, data, config = {}) {
  return await Api.post(url, { ...data }, { ...config }).then(
    response => response.data
  )
}

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function putImage(url, data, config = {}) {
  return axios.put(url, data, { ...config }).then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  return await axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

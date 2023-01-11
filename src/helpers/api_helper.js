import axios from "axios"

const accessToken = JSON.parse(localStorage.getItem("authUser"))
  ?.stsTokenManager?.accessToken
//pass new generated access token here
const token = accessToken || ""

//apply base url for axios
const API_URL = "https://lms-xwsrrlwthq-uk.a.run.app/api/lms/"
const URL = "https://skillfit-api-xwsrrlwthq-uk.a.run.app/v1"

const Api = axios.create({
  baseURL: URL,
})

Api.defaults.headers.common["access_key"] = "fD3T+LGHC&eIV5nh"

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

export async function getData(url, config = {}) {
  return await Api.get(url, { ...config }).then(response => response.data)
}

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
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

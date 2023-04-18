import axios from "axios"

const accessToken = JSON.parse(localStorage.getItem("authUser"))
  ?.stsTokenManager?.accessToken
//pass new generated access token here
const token = accessToken || ""

//apply base url for axios
const API_URL = `${process.env.REACT_APP_API_URL}`
const URL = `${process.env.REACT_APP_URL}`
const COURSE_API_URL = "https://lms.unikaksha.dev/api/lms"

// const putApi = axios.create({
//   baseURL: URL,
// })

// putApi.defaults.headers.common["authorization"] =
//   "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYjMxMjdiMjRjZTg2MDJjODEyNDUxZThmZTczZDU4MjkyMDg4N2MiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W3siSW5zdHJ1Y3RvciI6WyJhZGRjb3Vyc2UiLCJlZGl0Y291cnNlIl19XSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3VuaWtha3NoYTIwMjIiLCJhdWQiOiJ1bmlrYWtzaGEyMDIyIiwiYXV0aF90aW1lIjoxNjc2ODc0MDUwLCJ1c2VyX2lkIjoidjljZWFIc1piMGJPNlNSRnJWc0dRNW0ydGRiMiIsInN1YiI6InY5Y2VhSHNaYjBiTzZTUkZyVnNHUTVtMnRkYjIiLCJpYXQiOjE2NzY4NzQwNTAsImV4cCI6MTY3Njg3NzY1MCwiZW1haWwiOiJzdXBlcnVzZXJ1bmlrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdXBlcnVzZXJ1bmlrQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.OwzynZGPJux2dg2d0efp6L1f-lW5aMBsK7r_LJre3y2c0O5ddEF5Drbg1npMxvtr8OZNN9IgiqGdojXYlIuegJ0x_0wtyYSWpuhqqPrgRgLc4b7rokh5SXuEE6N4NgHA9nia_1TEEntq8dcpc5ogEmbB_KqQnCasBn6IijvkepwoZEOsHRBnp-ogx8yZ_6tJS-28_yiz7NgaWEWMeNdm5KrtwoDXwbFusUQJyPIhbFVcEcTnT4PVxhxVfGYsUsBIIcVsUqr-3wENeKxxuUivW2uWuS8PA4PNEaMg3sxtFn9Ew-Ovc_J_Um9f04t_dzOPkmML04KSCGOeN86isEHI7A"

// putApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// )

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

const courseApi = axios.create({
  baseURL: COURSE_API_URL,
})

courseApi.defaults.headers.common["Authorization"] = token

courseApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getCourseData(url, config = {}) {
  return await courseApi.get(url, { ...config }).then(response => response.data)
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
  return axiosApi
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

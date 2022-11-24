import axios from "axios";

const accessToken = JSON.parse(localStorage.getItem('authUser'))?.stsTokenManager?.accessToken;
//pass new generated access token here
const token = accessToken || '' ;

const axiosApi = axios.create({});

axiosApi.defaults.headers.common["Accept"] = "*/*";
axiosApi.defaults.headers.common["Access-Control-Allow-Origin"] = "*/*";

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function uploadUsingSignedUrl(url, data) {  
  // const blobData = data;
  // console.log("data---->",blobData)
  // console.log("url---->",url)
  // return axiosApi
  //   .put(url, data)
  //   .then(response => response.data);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/jpeg");
  var file = data;
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: file,
    redirect: 'follow'
  };
  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

 
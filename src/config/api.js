import { data } from "autoprefixer";
import axios from "axios";
import Cookies from 'universal-cookie';
import { BASE_URL_API } from "./env";

const clientCookies = new Cookies();
export const mainAPI = axios.create({
  baseURL: '/API/',
  withCredentials: true
});

export const API = {
  POST_PUBLIC,
  POST,
  GET,
  GETWITHBODY,
  // GET_SERVER
};

function POST_PUBLIC(url, formData) {
  return mainAPI
    .post(url, formData)
    .then((res) => {
      return {
        status: res.status,
        statusText: res.statusText,
        data: res.data
      }
    })
    .catch(function (res) {
      let error = res.response;
      return {
        status: error.status,
        statusText: error.statusText,
        data: error.data
      }
    });
}

function POST(url, formData) {
  let auth = clientCookies.get('auth')
  let token = auth.token
  return mainAPI
    .post(url, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      let resData = [];
      resData['status'] = res.status;
      resData['data'] = res.data;
      return resData;
    })
    .catch(function (res) {
      let error = res.response;
      let resData = [];
      resData['status'] = error.status;
      resData['data'] = error.data;
      return resData;
    });
}

function GET(url, datatable = false) { 
  let auth = clientCookies.get('auth')
  let token = auth.token
  return mainAPI
    .get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      let resData = [];
      resData['status'] = res.status;
      resData['data'] = res.data;

      if (datatable) {
        resData['data'] = res.data.data;
        resData['meta'] = res.data.meta;
        resData['rc'] = res.data.rc;
        resData['rm'] = res.data.rm;
      }

      return resData;
    })
    .catch(function (res) {
      let error = res.response;
      let resData = [];
      if (error.status === 403) {
        logout()
      }
      resData['status'] = error.status;
      resData['data'] = error.data;
      resData['statusText'] = error.statusText;
      return resData;
    });
}

function GETWITHBODY(url,body) {
  let auth = clientCookies.get('auth')
  let token = auth.token
  return mainAPI
    .get(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      let resData = [];
      resData['status'] = res.status;
      resData['data'] = res.data.data;
      if ( datatable ) {
        // Only For Get DataTablee
        resData['meta'] = res.data.meta;
        resData['data'] = res.data;
      }

      return resData;
    })
    .catch(function (res) {
      let error = res.response;
      let resData = [];

      if (error.status === 403) {
        logout()
      }
      resData['status'] = error.status;
      resData['data'] = error.data;
      resData['statusText'] = error.statusText;
      return resData;
    });
}

// function GET_SERVER(url, body = []) {
//   const cookieStore = cookies()
//   const {token} = JSON.parse(cookieStore.get('auth').value)
//   return axios
//     .get(`${BASE_URL_API}/${url}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       let resData = [];
//       resData['status'] = res.status;
//       resData['data'] = res.data.data;
//       resData['statusText'] = error.statusText;
//       return resData;
//     })
//     .catch(function (res) {
//       let error = res.response;
//       let resData = [];

//       if (error.status === 403) {
//         logout()
//       }
//       resData['status'] = error.status;
//       resData['data'] = error.data;
//       resData['statusText'] = error.statusText;
//       return resData;
//     });
// }
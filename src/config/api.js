import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const mainAPI = axios.create({
  baseURL: '/api/'
});

export const API = {
  POST_PUBLIC,
  POST,
  GET,
  GETWITHBODY,
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
  let auth = cookies.get('auth')
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

function GET(url) {
  let auth = cookies.get('auth')
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
      resData['data'] = res.data.data;
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
      return resData;
    });
}

function GETWITHBODY(url,body) {
  let auth = cookies.get('auth')
  let token = auth.token
  console.log({body, token, auth})
  return mainAPI
    .get(url, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      let resData = [];
      resData['status'] = res.status;
      resData['data'] = res.data.data;
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
      return resData;
    });
}
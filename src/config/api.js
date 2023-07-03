import axios from "axios";
import Cookies from 'universal-cookie';

// import {useRouter} from "next/router";

const cookies = new Cookies();
const mainAPI = axios.create({
  baseURL: '/api/'
});

export const API = {
  POST_PUBLIC,
  POST,
  GET,
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
  return mainAPI
    .post(url, formData, {
      headers: {
        Authorization: "Bearer "+cookies.get('token'),
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
  return mainAPI
    .get(url, {
      headers: {
        Authorization: "Bearer "+cookies.get('token'),
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
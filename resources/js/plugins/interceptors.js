import axios from 'axios';
import store from "../store";

export default function setup() {
  axios.interceptors.request.use(function(config) {
    // const token = store.getters.token;
    // if(token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    //console.log('axios.interceptors.request')

    // let in_progress = store.getters.getInProgress;
    // console.log(in_progress)

    store.dispatch("setInProgress", true);
    return config;
  }, function(err) {
    return Promise.reject(err);
  });


  axios.interceptors.response.use(function (response) {
    store.commit('SET_IN_PROGRESS', false)
    return response;
  }, function (error) {
    console.log('response', error)
  });
}

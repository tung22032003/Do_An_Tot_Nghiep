import axios from "axios";
const instance=()=>{
axios.interceptors.request.use(function (config) {
    
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });


  axios.interceptors.response.use(function (response) {
    
    return response && response.data ? response.data : response;
  }, function (error) {
    
    return Promise.reject(error);
  });
}

export default instance;
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  registerUser: function(userData) {
    return axios.post("/api/user/register/", userData);
  }
};
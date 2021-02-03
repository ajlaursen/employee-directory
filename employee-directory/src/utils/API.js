import axios from "axios";

export default {
 onLoad: function () {
    return axios.get("https://randomuser.me/api/?results=100");
  },
};

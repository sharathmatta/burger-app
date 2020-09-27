import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-49093.firebaseio.com/",
});

export default instance;

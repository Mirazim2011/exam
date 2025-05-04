import axios from "axios";

const defaultOptions = {
  baseURL: "https://opentdb.com/",
};
const API = axios.create(defaultOptions);

export default API;
import axios from "axios";

const Api = axios.create({ baseURL: "https://e404bfcda99e.ngrok.io/api/v1" });

export default Api;

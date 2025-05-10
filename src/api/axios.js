import axios from "axios";

const BaseUrl = 'https://sugarytestapi.azurewebsites.net';

const Api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});




export default Api;

import axios from "axios";
import { HOST } from "../utils/constants"; //client\src\utils\constants.js //client\src\lib\api-client.js

export const apiClient = axios.create({
  baseURL: HOST /* "http://localhost:5173", */,
});

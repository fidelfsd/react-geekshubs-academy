import axios from "axios";

import { global } from "../_config/global";

const userService = {};

userService.getAll = async (token, page = 1) => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/api/user`,
      params: { page: page },
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };
   //await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.getStudents = async (token, page = 1) => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/api/student`,
      params: { page: page },
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };
   //await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

export default userService;

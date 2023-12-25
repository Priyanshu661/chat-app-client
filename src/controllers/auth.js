import axios from "axios";

export const signup = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/auth/signup`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  
      return response.data;
   
  } catch (e) {
    return e;
  }
};


export const login = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/auth/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

   
      return response.data;
 
  } catch (e) {
    return e;
  }
};


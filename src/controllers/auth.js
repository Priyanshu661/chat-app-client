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

    if (response) {
      return response.data;
    } else {
      return "error in sdjusdhsd";
    }
  } catch (e) {
    return e;
  }
};

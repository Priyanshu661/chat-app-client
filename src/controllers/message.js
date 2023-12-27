import axios from "axios";

export const send_message = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/message/send-message`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetch_messages = async (lastMsgId) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/message/fetch?lastMsgId=${lastMsgId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (e) {
    return e;
  }
};

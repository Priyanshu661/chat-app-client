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

export const fetch_chat_messages = async (chatid) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/message/fetch-chat-messages?chat_id=${chatid}`,

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

export const fetch_users_for_group = async () => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/message/fetch-users-for-group`,

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

export const create_group = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/message/create-group`,
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

export const fetch_all_groups = async () => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/message/fetch-all-groups`,
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

export const fetch_group_details = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/message/fetch-group-details/${id}`,
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

export const update_group_details = async (id,data) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}/message/update-group-details/${id}`,
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

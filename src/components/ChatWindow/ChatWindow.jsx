import React, { useEffect, useState } from "react";
import Style from "./ChatWindow.module.css";
import { fetch_messages, send_message } from "@/controllers/message";

const ChatWindow = () => {
  const users = [
    {
      name: "Priyanshu",
      message:
        "Helggfffttttttttttttttttttttttttttttttttttttttttttgrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrftttttttttttttttttttttttttttttlo",
    },
    {
      name: "Priyanshu",
      message:
        "Helggfffttttttttttttttttttttttttttttttttttttttttttgrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrftttttttttttttttttttttttttttttlo",
    },
    { name: "Sharpener", message: "Hii" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
    { name: "Priyanshu", message: "Hello" },
  ];

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    setMsg("");
    setError("");

    let messages = [];
    messages = JSON.parse(localStorage.getItem("messages"));
    console.log(messages);
    let lastMsgId = null;
    if (messages && messages.length > 0) {
      lastMsgId = messages[messages.length - 1].id;
    }
    fetch_messages(lastMsgId)
      .then((res) => {
        if (res?.error) {
          setError(res?.error);
        } else if (res?.data) {
          if (messages) {
            const total_messages = [...messages, ...res?.data];

            if (total_messages.length > 10) {
              while (total_messages.length > 10) {
                total_messages.shift();
              }
            }
            localStorage.setItem("messages", JSON.stringify(total_messages));
            setData(total_messages);
          } else {
            const total_messages = [...res?.data];

            if (total_messages.length > 10) {
              while (total_messages.length > 10) {
                total_messages.shift();
              }
            }

            localStorage.setItem("messages", JSON.stringify(total_messages));
            setData(total_messages);
          }
        }
      })
      .catch((e) => {
        // setError(e);
      });
  }, []);

  const handleSend = () => {
    setMsg("");
    setError("");
    if (!message) {
      setError("Type something to send!");
      return;
    }
    send_message({ message }).then((res) => {
      if (res.error) {
        setError(res?.error);
      } else if (res?.message) {
        setMsg(res?.message);
        setMessage("");
      }
    });
  };
  return (
    <>
      {/* <h4 style={{ textAlign: "center", margin: "10px" }}>Chats</h4> */}
      <div className={Style.container}>
        <div className={Style.groupContainer}>
          <h3>Users</h3>
          <h3>Users</h3>
          <h3>Users</h3>
          <h3>Users</h3>
          <h3>Users</h3>
        </div>
        <div className={Style.chatContainer}>
          <div className={Style.chatHeading}>
            <span>Group Name</span>
            {/* <span>Group Members</span> */}
            <span>Edit</span>
          </div>
          <div className={Style.messageContainer}>
            {data?.map((user, index) => (
              <div className={index % 2 == 0 ? Style.evenRow : Style.oddRow}>
                <div
                  style={{
                    padding: "5px",
                  }}
                >
                  <span>{user.name} :</span> <span>{user.message}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={Style.btnContainer}>
            <input
              className={Style.input}
              name="message"
              value={message}
              placeholder="Type message..."
              onChange={(e) => {
                setMsg("");
                setError("");
                setMessage(e.target.value);
              }}
            ></input>
            <button className={Style.btn} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>

        {(error || msg) && (
          <div>
            <p
              style={{
                fontSize: "15px",
                color: "red",
                textAlign: "center",
              }}
            >
              {error}
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "green",
                textAlign: "center",
              }}
            >
              {msg}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;

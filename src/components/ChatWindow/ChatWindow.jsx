import React, { useState } from "react";
import Style from "./ChatWindow.module.css";
import { send_message } from "@/controllers/message";

const ChatWindow = () => {
  const users = [
    {
      name: "Priyanshu",
      message:
        "Helggfffttttttttttttttttttttttttttttttttttttttttttgrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrfrftttttttttttttttttttttttttttttlo",
    },
    { name: "Sharpener", message: "Hii" },
    { name: "Priyanshu", message: "Hello" },
  ];

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    setMsg("");
    setError("");
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
      <div className={Style.container}>
        <div>
          {users.map((user, index) => (
            <div className={index % 2 == 0 ? Style.evenRow : Style.oddRow}>
              <div style={{ padding: "5px" }}>
                <span>{user.name}</span> : <span>{user.message}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
            {error}
          </p>
          <p style={{ fontSize: "18px", color: "green", textAlign: "center" }}>
            {msg}
          </p>
        </div>

        <div className={Style.btnContainer}>
          <input
            className={Style.input}
            name="message"
            value={message}
            onChange={(e) => {
              setMsg("");
              setError("");
              setMessage(e.target.value);
            }}
          ></input>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;

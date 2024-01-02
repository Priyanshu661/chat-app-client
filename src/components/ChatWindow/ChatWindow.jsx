import React, { useEffect, useRef, useState } from "react";
import Style from "./ChatWindow.module.css";
import {
  fetch_all_groups,
  fetch_chat_messages,
  fetch_messages,
  send_file_message,
  send_message,
} from "@/controllers/message";
import BasicModal from "../Modal/Modal";
import { Button } from "@mui/material";

import { io } from "socket.io-client";
import { upload_to_s3 } from "@/services/aws-sdk";

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [isEditable, setIsEditable] = useState(false);

  const [groupDetails, setGroupDetails] = useState(null);

  const [data, setData] = useState([]);

  const [groups, setGroups] = useState([]);

  const [chatWindow, setChatWindow] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const [run, setRun] = useState(false);
  const [runSocket, setRunSocket] = useState(false);

  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("receive-message", (chatId) => {
      console.log("Received message:", chatId);
      fetch_group_messages(chatId);
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected");
    };
  }, [socket]);

  const fetch_group_messages = (chat_id) => {
    // const chat_id = chat.id;
    fetch_chat_messages(chat_id).then((res) => {
      if (res?.error) {
        setError(res?.error);
      } else if (res?.data) {
        // setChatWindow(chat);
        setChatMessages(res?.data);
        // console.log(res?.data);

        setMyId(res?.myId);
      }
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    fetch_all_groups().then((res) => {
      if (res?.error) {
        setError(res?.error);
      } else if (res?.data) {
        setGroups(res?.data);
      }
    });
  }, [run]);

  // useEffect(() => {
  //   setMsg("");
  //   setError("");

  //   let messages = [];
  //   messages = JSON.parse(localStorage.getItem("messages"));
  //   let lastMsgId = null;
  //   if (messages && messages.length > 0) {
  //     lastMsgId = messages[messages.length - 1].id;
  //   }
  //   fetch_messages(lastMsgId)
  //     .then((res) => {
  //       if (res?.error) {
  //         setError(res?.error);
  //       } else if (res?.data) {
  //         if (messages) {
  //           const total_messages = [...messages, ...res?.data];

  //           if (total_messages.length > 10) {
  //             while (total_messages.length > 10) {
  //               total_messages.shift();
  //             }
  //           }
  //           localStorage.setItem("messages", JSON.stringify(total_messages));
  //           setData(total_messages);
  //         } else {
  //           const total_messages = [...res?.data];

  //           if (total_messages.length > 10) {
  //             while (total_messages.length > 10) {
  //               total_messages.shift();
  //             }
  //           }

  //           localStorage.setItem("messages", JSON.stringify(total_messages));
  //           setData(total_messages);
  //         }
  //       }
  //     })
  //     .catch((e) => {
  //       // setError(e);
  //     });
  // }, []);

  const handleSend = () => {
    setMsg("");
    setError("");
    if (!message) {
      setError("Type something to send!");
      return;
    }

    const chatId = chatWindow.id;
    socket.emit("send-message", chatId);

    send_message({ message, chatId }).then((res) => {
      if (res.error) {
        setError(res?.error);
      } else if (res?.message) {
        setMsg(res?.message);
        // setRunSocket(!runSocket);
        // fetch_group_messages(chatId);
        setMessage("");
      }
    });
  };
  const formData = new FormData();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const fileInputRef = useRef(null);
  const handleFileChange = async (event) => {
    const filename = `chatApp/${chatWindow.id}/${new Date()}`;

    try {
      const selectedFile = await upload_to_s3(filename, event.target.files[0]);
      uploadFileToBackend(selectedFile?.Location);
    } catch (e) {
      console.log(e);
    }
  };

  const handleButtonClick = () => {
    // Trigger the file input dialog when the button is clicked
    fileInputRef.current.click();
  };

  const uploadFileToBackend = async (file) => {
    const chatId = chatWindow.id;

    // formData.append("file", file);
      socket.emit("send-message", chatId);
    //  console.log(formData.get("file"))
    //  socket.emit("send-message", chatId);
    send_file_message({ message: file, chatId }).then((res) => {
      if (res.error) {
        setError(res?.error);
      } else if (res?.message) {
        setMsg(res?.message);
        // setRunSocket(!runSocket);
        // fetch_group_messages(chatId);
        setMessage("");
      }
    });
  };

  return (
    <>
      {/* <h4 style={{ textAlign: "center", margin: "10px" }}>Chats</h4> */}
      <div className={Style.container}>
        <div className={Style.groupContainer}>
          <Button fullWidth variant="contained" onClick={handleOpen}>
            Create Group
          </Button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              overflowY: "auto",
              marginTop: "50px",
              // paddingRight: "30px",
            }}
          >
            {/* <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                scroll: "auto",
                textAlign: "center",
              }}
            > */}
            {groups.length > 0 &&
              groups.map((item, index) => (
                <Button
                  onClick={() => {
                    setChatWindow(item);
                    fetch_group_messages(item.id);
                  }}
                  key={index}
                  fullWidth
                  style={{ backgroundColor: "white" }}
                  variant="text"
                  // style={{
                  //   backgroundColor: "white",
                  //   height: "50px",
                  //   borderRadius: "5px",
                  //   border: "1px solid #ccc",
                  //   display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  //   width: "100%",
                  // }}
                >
                  {item?.chat_name}
                </Button>
              ))}
            {/* <h3>Users</h3>
            <h3>Users</h3>
            <h3>Users</h3>
            <h3>Users</h3>
            <h3>Users</h3> */}
            {/* </ul> */}
          </div>
        </div>
        {chatWindow ? (
          <div className={Style.chatContainer}>
            <div className={Style.chatHeading}>
              <span>{chatWindow?.chat_name}</span>
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
              <Button
                onClick={() => {
                  if (chatWindow?.AdminId !== myId) {
                    setError("Only admin can change group details.");
                    return;
                  }
                  setOpen(true);
                  setIsEditable(true);
                }}
                style={{ backgroundColor: "white" }}
                variant="text"
              >
                Edit
              </Button>
            </div>
            <div className={Style.messageContainer}>
              {chatMessages?.map((user, index) => (
                <div
                  className={
                    myId === user?.user_id ? Style.oddRow : Style.evenRow
                  }
                  style={{marginBottom:"20px"}}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "5px",
                    }}
                  >
                    <span>{user.name} :</span>{" "}
                    <span>
                      {user?.isFile ? (
                        <a
                          href={user.message} // Provide the URL of the image
                          download="chat_app_img.png"
                        >
                          <img
                            style={{
                              width: "150px",
                              maxHeight: "150px",
                              height: "auto",
                              width: "auto",
                            }}
                            src={user.message}
                            alt={"myfile"}
                          />
                        </a>
                      ) : (
                        user.message
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={Style.btnContainer}>
              <input
                type="file"
                // accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                onClick={handleButtonClick}
                style={{ fontSize: "20px" }}
                variant="contained"
              >
                +
              </Button>
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
        ) : (
          <h3 style={{ textAlign: "center", margin: "auto" }}>
            Click on group to Start Chatting
          </h3>
        )}
      </div>
      <BasicModal
        run={run}
        setRun={setRun}
        chat_id={chatWindow?.id}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ChatWindow;

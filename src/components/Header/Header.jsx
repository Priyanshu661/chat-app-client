import React from "react";
import Style from "./Header.module.css";
import { Router, useRouter } from "next/router";

const Header = ({token=true}) => {
  const router=useRouter()
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login")
  };
  return (
    <div className={Style.container}>
      <p
        style={{
          margin: 0,
          marginLeft: "20px",
          fontSize: "1.5rem",
          fontWeight: "20px",
        }}
      >
        Chat App
      </p>
    { token && <button onClick={handleLogout} className={Style.btn}>
        Logout
      </button>}
    </div>
  );
};

export default Header;

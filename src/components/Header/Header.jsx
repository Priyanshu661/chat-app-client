import React from "react";
import Style from "./Header.module.css"


const Header = () => {
  return (
    <div className={Style.container} >
      <p style={{margin:0,marginLeft:"20px",fontSize:"1.5rem",fontWeight:"20px"}}>Chat App</p>
    </div>
  );
};

export default Header;

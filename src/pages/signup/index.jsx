import React, { useState } from "react";
import Style from "./index.module.css"

const Signup = () => {
const [details,setDetails]=useState({
  name:"",
  email:"",
  phone:"",
  password:""
})

const handleChange=(e)=>{

  const {name,value}=e.target
  setDetails((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
}

const handleSubmit=()=>{

}


  return (
    <div className={Style.container}>
      <div>
        <h2 style={{ margin: 0, textAlign: "center" }}>Chat App</h2>
      </div>

      <div className={Style.form}>
        <label className={Style.label}>
          Name:
          <input
            className={Style.input}
            value={details.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter your full name.."
          ></input>
        </label>

        <label className={Style.label}>
          Email:
          <input
            className={Style.input}
            value={details.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your Email Address.."
          ></input>
        </label>

        <label className={Style.label}>
          Phone:
          <input
            className={Style.input}
            value={details.phone}
            onChange={handleChange}
            type="phone"
            name="phone"
            placeholder="Enter Your Phone Number.."
          ></input>
        </label>

        <label className={Style.label}>
          Password:
          <input
            className={Style.input}
            value={details.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your password.."
          ></input>
        </label>

        <button onClick={handleSubmit} className={Style.btn}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;

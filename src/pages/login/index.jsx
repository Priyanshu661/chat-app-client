import React, { useEffect, useState } from "react";
import Style from "./index.module.css";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import { login } from "@/controllers/auth";
const Login = () => {

 const [details, setDetails] = useState({
  
   email: "",
//    phone: "",
   password: "",
 });

 const [error, setError] = useState("");
 const [msg, setMsg] = useState("");

 const router = useRouter();

 useEffect(()=>{
    if(localStorage.getItem("token")){
        router.push("/")
    }
 },[])

 const handleChange = (e) => {
   setError("");
   setMsg("");

   const { name, value } = e.target;
   setDetails((prev) => {
     return {
       ...prev,
       [name]: value,
     };
   });
 };

 const handleSubmit = () => {
   setError("");
   setMsg("");
   login(details)
     .then((res) => {
       if (res?.error) {
         setError(res?.error);
       } else if (res?.message) {
         setMsg(res?.message);
         localStorage.setItem("token",res?.token)
         router.push("/")
       }
     })
     .catch((e) => {
       setError(e);
     });
 };


  return (
    <>
      <div className={Style.container}>
        <Header />

        <div className={Style.formContainer}>
          <p
            style={{
              fontWeight: "30px",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Login
          </p>
          <div>
            <p style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
              {error}
            </p>
            <p
              style={{ fontSize: "18px", color: "green", textAlign: "center" }}
            >
              {msg}
            </p>
          </div>
          <div className={Style.form}>
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

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={handleSubmit} className={Style.btn}>
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className={Style.btn}
              >
                New User?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

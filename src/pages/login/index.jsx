import React, { useState } from "react";
import Style from "./index.module.css";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
const Login = () => {

 const [details, setDetails] = useState({
  
   email: "",
//    phone: "",
   password: "",
 });

 const [error, setError] = useState("");
 const [msg, setMsg] = useState("");

 const router = useRouter();

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
//    signup(details)
//      .then((res) => {
//        if (res?.error) {
//          setError(res?.error);
//        } else if (res?.message) {
//          setMsg(res?.message);
//        }
//      })
//      .catch((e) => {
//        setError(e);
//      });
 };


  return (
    <>
      <div className={Style.container}>
        <Header />

        <div>
          <p style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
            {error}
          </p>
          <p style={{ fontSize: "18px", color: "green", textAlign: "center" }}>
            {msg}
          </p>
        </div>

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

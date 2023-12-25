import React, { useState } from "react";
import Style from "./index.module.css";
import { signup } from "@/controllers/auth";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";

const Signup = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const router=useRouter()

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
    signup(details)
      .then((res) => {
        if (res?.error) {
          setError(res?.error);
        } else if (res?.message) {
          setMsg(res?.message);
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <>
      <div className={Style.container}>
       <Header/>

        <div>
          <p style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
            {error}
          </p>
          <p style={{ fontSize: "18px", color: "green", textAlign: "center" }}>
            {msg}
          </p>
        </div>

        <div className={Style.formContainer}>
          <p style={{fontWeight:"30px", fontSize: "18px", textAlign: "center" }}>
            Create Account
          </p>

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

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={handleSubmit} className={Style.btn}>
                Sign Up
              </button>
              <button
                onClick={() => router.push("/login")}
                className={Style.btn}
                style={{ width: "200px" }}
              >
                Already Have Account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

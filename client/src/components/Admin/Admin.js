import React, { useState, useEffect } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

import "./Admin.css";

export default function Admin(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [secret, setsecret] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      const secret = localStorage.getItem("Site_New_Tokken");
      if (secret) {
        const res = await Axios.post("/admin/check", { secret });
        if (res) {
          props.history.push("/A_D_M_I_N/Dashboard");
        } else {
          localStorage.removeItem("Site_New_Tokken");
          props.history.push("/A_D_M_I_N");
        }
      } else {
        props.history.push("/A_D_M_I_N");
      }
    };
    checkAdmin();
  }, []);

  return (
    <div className="container admin-main">
      {/* Default form login */}
      <form
        style={{ backgroundColor: "#163554" }}
        className="login-container text-light text-center border border-light p-5"
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            const res = await Axios.post("/admin", {
              email,
              password,
              secret,
            });

            var secretCode = await res.data.secret;

            if (secretCode) {
              //

              const res = await Axios.post("/admin/check", {
                secret: secretCode,
              });
              if (res) {
                await StatusAlertService.showSuccess("Welcome Admin");

                await localStorage.setItem("Site_New_Tokken", secretCode);
                await props.history.push("/A_D_M_I_N/Dashboard");
              } else {
                localStorage.removeItem("Site_New_Tokken");
                props.history.push("/A_D_M_I_N");
              }

              //
            } else {
              StatusAlertService.showError(res.data);
              console.log(res.data);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <p className="h4 mb-4">Login</p>
        {/* Email */}
        <input
          type="email"
          className="form-control mb-4"
          placeholder="E-mail"
          value={email}
          autoFocus={true}
          onChange={(e) => setemail(e.target.value)}
        />
        {/* Password */}
        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        {/* secret code */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Secret Code"
          value={secret}
          onChange={(e) => setsecret(e.target.value)}
        />

        {/* Sign in button */}
        <button className="btn btn-block btn-outline-light my-4" type="submit">
          Log in
        </button>
      </form>
      {/* Default form login */}
    </div>
  );
}

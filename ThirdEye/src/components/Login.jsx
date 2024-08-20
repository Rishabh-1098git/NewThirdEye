import React from "react";
import { useState } from "react";
import "./Login.css";
function Login({ page, setpage }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (userId === "rishabhsaini1098@gmail.com" && password === "rishabh") {
      setpage("dashboard");
    } else {
      setpage("login");
    }
  };

  return (
    <>
      {/* <video src={videoBg} autoPlay loop muted></video> */}
      {/* <img src="src\assets\HeroLogo.jpg" alt="" /> */}

      <div
        className="modal modal-sheet position-static d-block p-4 py-md-5 main-login"
        tabindex="-1"
        role="dialog"
        id="modalSignin"
        style={{
          height: "100vh",
        }}
      >
        <div class="modal-dialog " role="document">
          <div
            class="modal-content shadow rounded-10"
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              border: "2px solid red ",
              marginTop: "170px",
            }}
          >
            <div class="modal-header p-5 pb-4 border-bottom-0">
              <h1
                class="fw-bold mb-0 fs-2"
                style={{ color: "red", textAlign: "center" }}
              >
                Admin Login
              </h1>
            </div>

            <div class="modal-body p-5 pt-0">
              <form class="" onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                  <input
                    onpaste="return false;"
                    ondrop="return false;"
                    autocomplete="off"
                    style={{
                      border: "2px solid red",
                      background: "black",
                      color: "red",
                      fontSize: "20px",
                    }}
                    type="email"
                    class="form-control rounded-10"
                    id="floatingInput"
                    placeholder="Admin ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div class="form-floating mb-3">
                  <input
                    style={{
                      border: "2px solid red",
                      background: "black",
                      color: "#red",
                      fontSize: "20px",
                    }}
                    type="password"
                    class="form-control rounded-10"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="w-100 mb-2 btn btn-lg rounded-0 bg-black signin"
                  style={{ color: "red" }}
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

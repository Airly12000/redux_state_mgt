import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setStoreValues } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

let storedInfo: any = localStorage.getItem("user");
storedInfo = JSON.parse(storedInfo);

const Login = () => {
  const [logReg, setLogReg] = useState<String>("login");
  const [formInfo, setFormInfo] = useState({
    name: storedInfo ? storedInfo.name : "",
    username: storedInfo ? storedInfo.username : "",
    password: storedInfo ? storedInfo.password : "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      setFormInfo({ ...formInfo, name: value });
    } else if (name === "username") {
      setFormInfo({ ...formInfo, username: value });
    } else {
      setFormInfo({ ...formInfo, password: value });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(formInfo));
    dispatch(setIsLoggedIn(true));
    navigate("/user");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="container-fluid h-50 w-50">
        <div className="row h-100 w-100 border rounded">
          <div className="col w-100 h-100 px-0">
            <img
              src="/assets/img/yellow.jpeg"
              alt="img"
              className="w-100 h-100 rounded-start"
            />
          </div>
          <div className="col d-flex align-items-center flex-column pt-3 position-relative">
            {logReg !== "login" ? (
              <form action="" className="form w-75">
                <h3 className="text-center mb-1">Register</h3>
                <div className="d-flex flex-column">
                  <label htmlFor="Name" className="my-2">
                    Name{" "}
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={formInfo.name}
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor="username" className="my-2">
                    Username{" "}
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={formInfo.username}
                    type="text"
                    name="username"
                    id="username"
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="password" className="my-2">
                    Password{" "}
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={formInfo.password}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100 rounded"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </form>
            ) : (
              <form action="" className="form w-75">
                <h3 className="text-center mb-3">Login</h3>
                <div className="d-flex flex-column mb-1">
                  <label htmlFor="username" className="my-2">
                    Username{" "}
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={formInfo.username}
                    type="text"
                    name="username"
                    id="username"
                  />
                </div>
                <div className="d-flex flex-column mb-4">
                  <label htmlFor="password" className="my-2">
                    Password{" "}
                  </label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={formInfo.password}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary w-100 rounded"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </form>
            )}
            <div className="new position-absolute bottom-0">
              <div className="mb-3">
                {logReg !== "login" ? "Already have an account" : "New User"} ?{" "}
                <span
                  className="fst-italic"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setLogReg((prev: any) => {
                      if (prev === "login") return "register";
                      return "login";
                    })
                  }
                >
                  {logReg !== "login" ? "Login" : "Register"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

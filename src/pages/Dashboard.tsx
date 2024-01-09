import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setIsLoggedIn } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => dispatch(setIsLoggedIn(false))}>Logout</button>
    </div>
  );
};

export default Dashboard;

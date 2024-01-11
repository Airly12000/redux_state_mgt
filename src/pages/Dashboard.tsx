import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setIsLoggedIn } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="col">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;

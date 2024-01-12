import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setIsLoggedIn } from "../redux/userSlice";
import Requests from "../utils/Requests";
import { endpoints } from "../utils/Endpoints";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { refreshToken } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await Requests.post(endpoints.logout, { refreshToken: refreshToken });
    dispatch(setIsLoggedIn(false));
  };

  return (
    <div className="d-none d-md-flex col-2 border justify-content-evenly flex-column align-items-center">
      <div className="col">Sidebar</div>
      <div className="col d-flex flex-column-reverse">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;

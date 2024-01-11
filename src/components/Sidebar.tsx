import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setIsLoggedIn } from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="d-none d-md-flex col-2 border justify-content-evenly flex-column align-items-center">
      <div className="col">Sidebar</div>
      <div className="col d-flex flex-column-reverse">
        <button onClick={() => dispatch(setIsLoggedIn(false))}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;

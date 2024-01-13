import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { endpoints } from "../utils/Endpoints";
import Requests from "../utils/Requests";
import { setStoreValues } from "../redux/userSlice";

const errorHandler = (error: any) => console.log(`Error: ${error}`);

const Dashboard = () => {
  const messages = useSelector((state: RootState) => state.messages);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");

  const getMessages = async () => {
    await Requests.post(endpoints.messages, { username: user.username })
      .then((response) => {
        dispatch(
          setStoreValues({ key: "messages", value: response.data.messages })
        );
      })
      .catch(errorHandler);
  };

  const handleAddMessage = async (event: any) => {
    event.preventDefault();
    await Requests.post(endpoints.messages + "/post", {
      message: message,
      username: user.username,
    })
      .then((response) => {})
      .catch(errorHandler);
    window.location.reload();
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="col">
      <h1>Dashboard</h1>
      <div className="row border p-3">
        <div className="col">
          {messages &&
            messages.map((item: any, index: any) => {
              const { message } = item;
              return (
                <div className="col" key={index}>
                  {message}
                </div>
              );
            })}
        </div>
        <div className="col d-flex flex-column">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="type message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            className="btn btn-primary align-self-center"
            onClick={handleAddMessage}
            type="submit"
          >
            Add New Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

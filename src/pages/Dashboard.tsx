import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { endpoints } from "../utils/Endpoints";
import Requests from "../utils/Requests";
import { setStoreValues } from "../redux/userSlice";

const errorHandler = (error: any) => console.log(`Error: ${error}`);

const Dashboard = () => {
  const messages = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");

  const getMessages = async () => {
    await Requests.get(endpoints.messages)
      .then((response) => {
        dispatch(
          setStoreValues({ key: "messages", value: response.data.messages })
        );
      })
      .catch(errorHandler);
  };

  const handleAddMessage = async (event: any) => {
    event.preventDefault();
    await Requests.post(endpoints.messages + "/post")
      .then((response) => {})
      .catch(errorHandler);
  };

  useEffect(() => {
    // getMessages();
  });

  return (
    <div className="col">
      <h1>Dashboard</h1>
      <div className="row border p-3">
        <div className="col">
          {messages &&
            messages.map((message: any, index: any) => {
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

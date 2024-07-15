/* eslint-disable react/prop-types */
import { useState, useReducer } from "react";
import DataContext from "./DataContext";
import { initialState, DataReducer } from "../reducer/DataReducer";

const DataContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const [orders, setOrders] = useState([]);

  const [states, dispatch] = useReducer(DataReducer, initialState);

  const deleteOrderByID = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const state = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    states,
    dispatch,
    orders,
    setOrders,
    deleteOrderByID
  };
  return (
    <DataContext.Provider value={state}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;

import AuthContext from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "https://p4-node-app-api.vercel.app/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner/>;
};

export default PrivateRoute;

import AuthContext from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/admin-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;

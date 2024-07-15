import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/create-orders"
            className="list-group-item list-group-item-action"
          >
            CreateOrder
          </NavLink>
          <NavLink
            to="/dashboard/user/my-orders"
            className="list-group-item list-group-item-action"
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;

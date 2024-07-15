import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useContext, useEffect } from "react";
import axios from "axios";
import DataContext from "../../contexts/DataContext";
import moment from "moment";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdTrash } from "react-icons/io";
const CustomerOrder = () => {
  const { orders, setOrders, deleteOrderByID } = useContext(DataContext);

  useEffect(() => {
    getAllOrders();
  }, [orders]);

  const getAllOrders = async () => {
    const {
      data: { data },
    } = await axios.get("https://p4-node-app-api.vercel.app/api/v1/orders");
    localStorage.setItem("orders", JSON.stringify(data));
    setOrders(data);
  };

  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `https://p4-node-app-api.vercel.app/api/v1/orders/delete/${id}`
      );
      // console.log(response);
      deleteOrderByID(id);
      const data = await response.json();
      localStorage.setItem("products", JSON.stringify(data));
      // alert(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="table-responsive">
              <Table className="table table-striped">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Item Type</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Size</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Image</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="text-truncate">{order.userId.name}</td>
                      <td>{order.itemType}</td>
                      <td>{order.qty}</td>
                      <td className="text-truncate">{order.size}</td>
                      <td>{order.price}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        <img
                          src={order.image.path}
                          alt={order.itemType}
                          className="img-thumbnail"
                          style={{ height: "3rem", width: "3rem" }}
                        />
                      </td>
                      <td className="text-truncate">
                        {moment(order.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          <IoMdTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerOrder;

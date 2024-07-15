import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState, useContext, useEffect } from "react";
import itemTypeList from "../../data/itemTypeList";
import sizeList from "../../data/sizeList";
import DataContext from "../../contexts/DataContext";
import axios from "axios";
import "../../styles/Order.css";

const CreateOrder = () => {
  const { states, dispatch, user, orders, setOrders } = useContext(DataContext);
  const [image, setImage] = useState("");

  const handleItemTypeChange = (e) => {
    dispatch({ type: "UPDATE_ITEM", payload: e.target.value });
  };

  const qtyChange = (e) => {
    dispatch({ type: "UPDATE_QTY", payload: e.target.value });
  };

  const sizeChange = (e) => {
    dispatch({ type: "UPDATE_SIZE", payload: e.target.value });
    if (e.target.value === "small") {
      dispatch({ type: "UPDATE_PRICE", payload: { price: 85 } });
    } else if (e.target.value === "medium") {
      dispatch({ type: "UPDATE_PRICE", payload: { price: 95 } });
    } else if (e.target.value === "large") {
      dispatch({ type: "UPDATE_PRICE", payload: { price: 100 } });
    }
  };

  const handleTotal = () => {
    let ans = 0;
    ans += states.qty * states.price;
    dispatch({ type: "UPDATE_TOTAL", payload: { totalPrice: ans } });
  };

  useEffect(() => {
    handleTotal();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("itemType", states.itemType);
    data.append("qty", states.qty);
    data.append("size", states.size);
    data.append("price", states.price);
    data.append("totalPrice", states.totalPrice);
    data.append("order-image", image);

    const newOrder = await axios.post(
      "http://localhost:8080/api/v1/orders",
      data,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjkyYTRlNzE2NjVmNGVkZmQ2OTUwMzgiLCJpYXQiOjE3MjA5NzAwOTR9.fuCqoKXRQMxJhKVNbl7bUzyNjsrxR3emIA9ibGbqhfU`,
        },
      }
    );
    console.log(user.accessToken);
    setOrders([...orders, newOrder]);
    // navigate("/user");
    dispatch({ type: "RESET_FORM" });
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 app">
            <form className="form" onSubmit={handleSubmit}>
              <h2>Order</h2>
              <div className="formInput">
                <label className="itemLabel" id="label">
                  Item type:
                </label>
                <select
                  className=""
                  value={states.itemType}
                  onChange={handleItemTypeChange}
                >
                  {itemTypeList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label className="itemLabel" id="label">
                  Qty:
                </label>
                <input
                  type="number"
                  min={0}
                  value={states.qty}
                  onChange={qtyChange}
                />
              </div>
              <div className="formInput">
                <label className="itemLabel" id="label">
                  Size:
                </label>
                <select value={states.size} onChange={sizeChange}>
                  {sizeList.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label className="itemLabel" id="label">
                  Unit Price:
                </label>
                <input type="text" value={states.price} />
              </div>
              <div className="formInput">
                <label className="itemLabel" id="label">
                  Total Price:
                </label>
                <div id="item-price">Php {states.totalPrice}</div>
              </div>
              <div className="formInput">
                <label className="itemLabel" id="label">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button className="button" type="submit">
                Create Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateOrder;

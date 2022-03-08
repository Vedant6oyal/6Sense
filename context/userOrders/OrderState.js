import React, { useState } from "react";
import OrderContext from "./OrderContext";

const OrderState = (props) => {
  const state = {
    name: "Vedant",
    class: "5b",
  };
  const [orderList, setOrderList] = useState([]);

  function update(foodItems) {
    setOrderList(foodItems);
  }
  return (
    <OrderContext.Provider value={{ orderList, update }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;

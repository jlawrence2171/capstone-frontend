import React, { Component, useEffect, useState } from "react";
import OrderDataService from "../../services/order.data.service";
import { Redirect, Link } from "react-router-dom";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    OrderDataService.list()
      .then(({ data: orders }) => setOrders(orders))
      .catch(console.error);
  }, []);

  const orderListItems = orders.map((order, index) => (
    <li key={`${order}-${index}`}>
      <p>ID: {order.id}</p>
      <p>Order Status: {order.status_text}</p>
      <p>Date Order Placed: {order.datetime_order_placed}</p>
      <p>First Name: {order.Customer.first_name}</p>
      <p>Last Name: {order.Customer.last_name}</p>
      <p>Email: {order.Customer.email}</p>
      <Link to={`orders/${order.id}`}>View Details</Link>
    </li>
  ));

  const handleClick = (event) => {
    setOrderStatus(event.target.value);
    OrderDataService.listByStatus(orderStatus)
      .then(({ data: { rows: orders } }) => {
        setOrders(orders);
      })
      .catch(console.error);
  };
  // const filterByStatus = (event) => {
  //      if event.target.value === order.status_text
  //     display EVERY order.status_text
  // }

  return (
    <div>
      <form>
        <select
          type="text"
          name="orderStatus"
          value={orderStatus}
          onChange={(event) => setOrderStatus(event.target.value)}
        >
          <option value="">Filter by order status...</option>
          <option value="Drafted">Drafted</option>
          <option value="Open">Open</option>
          <option value="Finalized">Finalized</option>
          <option value="Preparing to ship">Preparing to ship</option>
          <option value="Ready for shippingt">Ready for shipping</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Closed">Closed</option>
        </select>
      </form>
      <ol>{orderListItems}</ol>
    </div>
  );
}

export default OrdersList;

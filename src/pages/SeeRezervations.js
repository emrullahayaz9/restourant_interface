import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import fetchReservations from "../helper/FetchReservations";
import getCustomerInfo from "../helper/GetCustomerInfo";
import getReservationMenuUuids from "../helper/GetReservationMenuItemsUuids";
import getReservationItem from "../helper/getReservationItem";

function SeeReservations() {
  const [reservations, setReservations] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [reservationItems, setReservationItems] = useState({});
  const { restaurantUuid } = useContext(AuthContext);
  const booleanValue = reservations === null ? false : true;
  const condition = reservations === null ? true : false;

  useEffect(() => {
    fetchReservations(restaurantUuid, setReservations);
  }, [restaurantUuid]);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const info = {};
      if (condition) {
        return;
      } else {
        for (let reservation of reservations) {
          const customerData = await getCustomerInfo(reservation.customerUuid);
          info[reservation.customerUuid] = customerData;
        }
        setCustomerInfo(info);
      }
    };
    fetchCustomerInfo();
  }, [reservations]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!Array.isArray(reservations)) {
        return;
      }
      const uuids = {};
      for (let reservation of reservations) {
        const items = await getReservationMenuUuids(
          reservation.reservation_uuid
        );
        const detailedItems = await Promise.all(
          items.map(async (item) => {
            const itemDetails = await getReservationItem(item.menu_item_uuid);
            return {
              ...item,
              ...itemDetails,
            };
          })
        );
        uuids[reservation.reservation_uuid] = detailedItems;
      }
      setReservationItems(uuids);
    };

    fetchItems();
  }, [reservations]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reservations</h2>
      <ul className="list-group">
        {booleanValue &&
          reservations.map((reservation) => (
            <li key={reservation.date} className="list-group-item">
              Date: {reservation.date}, Person Count: {reservation.personCount},
              State: {reservation.state}, Total: {reservation.total} TL <br />
              {customerInfo[reservation.customerUuid] && (
                <span>
                  Name: {customerInfo[reservation.customerUuid].first_name}{" "}
                  {customerInfo[reservation.customerUuid].last_name}, Email:{" "}
                  {customerInfo[reservation.customerUuid].email}, Phone:{" "}
                  {customerInfo[reservation.customerUuid].phone_number}
                </span>
              )}
              <h4>Reservation Items:</h4>
              <ul>
                {reservationItems[reservation.reservation_uuid] &&
                  reservationItems[reservation.reservation_uuid].map(
                    (item, index) => (
                      <li key={index}>
                        <strong>Name: </strong>
                        {item.name} <br />
                        <strong>Description: </strong>
                        {item.description} <br />
                        <strong>Available: </strong>
                        {item.is_available ? "Yes" : "No"} <br />
                        <strong>Price: </strong>
                        {item.price} TL <br />
                        {item.Image && (
                          <img
                            src={item.Image}
                            alt={item.name}
                            style={{ width: "100px", height: "100px" }}
                          />
                        )}
                      </li>
                    )
                  )}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SeeReservations;

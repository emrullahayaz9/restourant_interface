import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import fetchMenuItems from "../helper/FetchMenuItems";

const SeeMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { restaurantUuid } = useContext(AuthContext);
  useEffect(() => {
    fetchMenuItems(restaurantUuid, setMenuItems);
  }, [restaurantUuid]);

  const handleDelete = async (itemUuid) => {
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteItem(item_uuid: "${itemUuid}") {
                itemName
              }
            }
          `,
        }),
      });
      const responseData = await response.json();
      if (responseData.errors) {
        throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };
  return (
    <div>
      <h1>Our Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.itemUuid}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <img src={`${item.image}`} alt={item.name} />
            <form>
              <button
                className="btn btn-danger"
                type="submit"
                onClick={() => handleDelete(item.itemUuid)}
              >
                Delete item
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeMenu;

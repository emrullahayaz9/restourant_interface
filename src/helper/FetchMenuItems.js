const fetchMenuItems = async (restaurantUuid, setMenuItems) => {
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
            getMenuItems(restaurant_uuid: "${restaurantUuid}") {
                itemUuid
                name
                description
                isAvailable
                price
                image
              }
            }
          `,
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }
    const fetchedMenuItems = responseData.data.getMenuItems;
    setMenuItems(fetchedMenuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
  }
};

export default fetchMenuItems;

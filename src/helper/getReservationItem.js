const getReservationItem = async (menu_item_uuid) => {
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getReservationItem(item_uuid: "${menu_item_uuid}") {
              name
              description
              is_available
              Image
              price
            }
          }
        `,
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }
    return responseData.data.getReservationItem;
  } catch (error) {
    console.error("Error fetching reservation item info:", error.message);
  }
};

export default getReservationItem;

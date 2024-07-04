const getReservationMenuUuids = async (reservation_uuid) => {
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
              query {
                getReservationMenuItemUuids(reservation_uuid: "${reservation_uuid}") {
                  menu_item_uuid
                }
              }
            `,
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }
    return responseData.data.getReservationMenuItemUuids;
  } catch (error) {
    console.error("Error fetching customer info:", error.message);
  }
};

export default getReservationMenuUuids;

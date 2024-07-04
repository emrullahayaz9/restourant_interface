const fetchReservations = async (restaurantUuid, setReservations) => {
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
              query {
              getRezervationsForRestaurant(restaurant_uuid: "${restaurantUuid}") {
                 reservation_uuid
                 personCount
                 total
                 state
                 date
                 customerUuid
                }
              }
            `,
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }
    const fetchedReservations = responseData.data.getRezervationsForRestaurant;
    setReservations(fetchedReservations);
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
  }
};
export default fetchReservations;

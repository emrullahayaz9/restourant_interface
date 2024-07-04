const getCategories = async (restaurantUuid, setCategories) => {
  console.log(restaurantUuid);
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
               query {
                getCategories(restaurant_uuid: "${restaurantUuid}") {
                  categoryUuid
                  categoryName
    			      categoryDescription
                }
              }
            `,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }
    const fetchedCategories = responseData.data.getCategories;
    setCategories(fetchedCategories);
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
  }
};

export default getCategories;

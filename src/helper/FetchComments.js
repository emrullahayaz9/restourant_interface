const fetchComments = async (restaurantUuid, setComments) => {
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
              getComments(restaurant_uuid: "${restaurantUuid}") {
                comment
                rating
                createdAt
              }
            }
          `,
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }

    const fetchedComments = responseData.data.getComments;
    setComments(fetchedComments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
  }
};

export default fetchComments;

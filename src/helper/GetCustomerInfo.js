const getCustomerInfo = async (customerUuid) => {
  try {
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
              getCustomerInfo(customer_uuid: "${customerUuid}") {
                email
                phone_number
                first_name
                last_name
              }
            }
          `,
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
    }
    return responseData.data.getCustomerInfo;
  } catch (error) {
    console.error("Error fetching customer info:", error.message);
  }
};

export default getCustomerInfo;

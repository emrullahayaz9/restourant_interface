import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import getCategories from "../helper/GetCategories";
import handleImageChange from "../helper/HandleImage";

function AddMenuItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [categoryUuid, setCategoryUuid] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const { restaurantUuid } = useContext(AuthContext);

  const handleImage = (e) => {
    handleImageChange(e, setImage);
  };

  const handleSubmit = async (event) => {
    console.log("Submitting menu item with categoryUuid:", categoryUuid);
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              addMenuItem(name: "${name}", description: "${description}", isAvailable: ${isAvailable}, image: "${image}", price: ${price}, restaurant_uuid: "${restaurantUuid}", category_uuid: "${categoryUuid}") {
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
      console.log(
        "Menu item added successfully:",
        responseData.data.addMenuItem
      );
    } catch (error) {
      console.error("Error adding menu item:", error.message);
    }
  };

  useEffect(() => {
    getCategories(restaurantUuid, setCategories);
  }, [restaurantUuid]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isAvailable">
            Available
          </label>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="categorySelect">Category</label>
          <select
            id="categorySelect"
            className="form-control"
            value={categoryUuid}
            onChange={(e) => setCategoryUuid(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryUuid} value={category.categoryUuid}>
                {category.categoryName} - {category.categoryDescription}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImage}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Menu Item
        </button>
      </form>
    </div>
  );
}

export default AddMenuItem;

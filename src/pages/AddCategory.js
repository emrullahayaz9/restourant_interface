import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import getCategories from "../helper/GetCategories";

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const { restaurantUuid } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              addCategory(categoryName: "${categoryName}", categoryDescription: "${categoryDescription}", restaurant_uuid: "${restaurantUuid}") {
                categoryUuid 
                categoryName
                categoryDescription
              }
            }
          `,
        }),
      });
      const responseData = await response.json();
      if (responseData.errors) {
        throw new Error("GraphQL error " + JSON.stringify(responseData.errors));
      }
      getCategories(restaurantUuid, setCategories);
    } catch (error) {
      console.error("Error fetching menu items:", error.message);
    }
  };

  const handleDelete = async (categoryUuid) => {
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteCategory(category_uuid: "${categoryUuid}") {
                categoryName
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

  useEffect(() => {
    getCategories(restaurantUuid, setCategories);
  }, [restaurantUuid]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="categoryDescription">Category Description</label>
          <input
            type="text"
            className="form-control"
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
      <form>
        <div className="form-group">
          <label>
            Category (her kategori silindiğinde, sadece o kategori altında
            bulunan ürünlerde silinir)
          </label>
          {categories.map((category) => (
            <div key={category.categoryUuid} value={category.categoryName}>
              {category.categoryName} - {category.categoryDescription} --{" "}
              <button
                type="submit"
                onClick={() => handleDelete(category.categoryUuid)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default AddCategory;

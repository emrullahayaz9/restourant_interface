import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import fetchComments from "../helper/FetchComments";

function SeeComments() {
  const [comments, setComments] = useState([]);
  const { restaurantUuid } = useContext(AuthContext);
  useEffect(() => {
    fetchComments(restaurantUuid, setComments);
  }, [restaurantUuid]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Comments</h2>
      <ul className="list-group">
        {comments.map((comment, index) => (
          <li key={index} className="list-group-item">
            <p>{comment.comment}</p>
            <p>Rating: {comment.rating}</p>
            <p>Created At: {new Date(comment.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeeComments;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext as Context } from "../authContext";
function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const AuthContext = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              getUserByEmail(email: "${email}", password: "${password}") {
                firstName
                lastName
                email
                token
                restaurantUuid
              }
            }
          `,
        }),
      });

      const responseData = await response.json();
      if (responseData.errors !== undefined) {
        setError(true);
      } else {
        const token = responseData.data.getUserByEmail.token;
        const uuid = responseData.data.getUserByEmail.restaurantUuid;
        AuthContext.login(token, uuid);
        navigate("/restaurant");
      }
    } catch (error) {
      console.error("Error sending GraphQL request:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Giriş Yap</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error ? (
                  <div className="text-danger">Email veya şifre yanlış</div>
                ) : (
                  <div></div>
                )}
                <div className="form-group">
                  <label htmlFor="email">Email adresi</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Şifre</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Giriş Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

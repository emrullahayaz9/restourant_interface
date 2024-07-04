import React from "react";

function WelcomePage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome to Our Restaurant</h2>
      <p>Please log in or register to continue.</p>
      <a href="/addcategory" style={{ margin: 50 }}>
        addcategory
      </a>
      <a href="/login" style={{ margin: 50 }}>
        login
      </a>
      <a href="/restaurant" style={{ margin: 50 }}>
        restaurant
      </a>
      <a href="/addmenuitem" style={{ margin: 50 }}>
        addmenuitem
      </a>
      <a href="/seecomments" style={{ margin: 50 }}>
        seecomments
      </a>
      <a href="/seemenu" style={{ margin: 50 }}>
        seemenu
      </a>
      <a href="/seerezervations" style={{ margin: 50 }}>
        seerezervations
      </a>
    </div>
  );
}

export default WelcomePage;

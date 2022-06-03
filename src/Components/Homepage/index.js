import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export class Homepage extends Component {
  render() {
    const routes = [
      {
        name: "Cast Vote",
        path: "/cast-vote",
      },
      {
        name: "Register as Voter",
        path: "/register-voter",
      },
      {
        name: "Register as Candidate",
        path: "/register-candidate",
      },
      {
        name: "View Candidates",
        path: "/view-candidates",
      },
      {
        name: "View Voters",
        path: "/view-voters",
      },
    ];
    return (
      <div className="homepage-bg">
        <div className="routing-box">
          <h1>Voting Smart Contract</h1>
          <hr />
          <div className="routing-button-container">
            {routes.map((route) => (
              <Link className="routing-button" to={route.path} key={route.path}>
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;

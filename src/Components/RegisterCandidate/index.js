import React, { Component } from "react";
import Web3 from "web3";
import { VOTING_ADDRESS, VOTING_ABI } from "../../config";

import "./index.css";

export class RegisterCandidate extends Component {
  componentDidMount() {
    this.initilization();
  }

  initilization = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contract = new web3.eth.Contract(VOTING_ABI, VOTING_ADDRESS);
    const accounts = await web3.eth.requestAccounts();
    this.setState({ contract, accounts });
  };

  register = async (event) => {
    event.preventDefault();
    const { contract, accounts } = this.state;
    const response = await contract.methods
      .registerAsCandidate()
      .send({ from: accounts[0] });
    console.log(response);
  };

  render() {
    return (
      <div className="register-bg">
        <div className="register-content">
          <h1 className="register-heading">Register as Candidate</h1>
          <hr />
          <form className="register-form" onSubmit={this.register}>
            <button className="register-button" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterCandidate;

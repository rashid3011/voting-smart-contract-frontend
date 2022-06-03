import React, { Component } from "react";
import Web3 from "web3";
import { VOTING_ADDRESS, VOTING_ABI } from "../../config";
import "./index.css";

export class RegisterVoter extends Component {
  state = {
    name: "",
  };

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
    const { name, contract, accounts } = this.state;
    console.log(name);
    const response = await contract.methods
      .registerAsVoter(name)
      .send({ from: accounts[0] });
    console.log(response);
  };

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="register-bg">
        <div className="register-content">
          <h1 className="register-heading">Register as Voter</h1>
          <hr />
          <form className="register-form" onSubmit={this.register}>
            <div className="input-container">
              <label htmlFor="" className="input-label">
                Name
              </label>
              <input
                type="text"
                className="input"
                value={name}
                onChange={this.changeName}
              />
            </div>
            <button className="register-button" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterVoter;

import React, { Component } from "react";
import Web3 from "web3";
import { VOTING_ADDRESS, VOTING_ABI } from "../../config";
import "./index.css";

export class CastVote extends Component {
  state = {
    voterId: "",
    candidateId: "",
  };

  componentDidMount() {
    this.initilization();
  }

  initilization = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contract = new web3.eth.Contract(VOTING_ABI, VOTING_ADDRESS);
    const accounts = await web3.eth.requestAccounts();
    this.setState({
      web3,
      contract,
      accounts,
    });
  };

  castVote = async (event) => {
    event.preventDefault();
    const { candidateId, contract, accounts } = this.state;
    const response = await contract.methods
      .castVote(candidateId)
      .send({ from: accounts[0] });
    console.log(response);
  };

  render() {
    const { voterId, candidateId } = this.state;
    return (
      <div className="cast-vote-bg">
        <div className="cast-vote-content">
          <h1 className="cast-vote-heading">Cast Vote</h1>
          <hr />
          <form className="cast-vote-form" onSubmit={this.castVote}>
            <div className="input-container">
              <label htmlFor="" className="input-label">
                Candidate Id
              </label>
              <input
                type="text"
                className="input"
                value={candidateId}
                onChange={(e) => {
                  this.setState({ candidateId: e.target.value });
                }}
              />
            </div>
            <button className="cast-vote-button" type="submit">
              Cast Vote
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CastVote;

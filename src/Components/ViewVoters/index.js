import React, { Component } from "react";
import Web3 from "web3";
import { VOTING_ADDRESS, VOTING_ABI } from "../../config";
import "./index.css";

export class ViewVoters extends Component {
  state = {
    votersList: [],
  };

  async componentDidMount() {
    await this.initilization();
    this.getVoters();
  }

  initilization = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contract = new web3.eth.Contract(VOTING_ABI, VOTING_ADDRESS);
    const accounts = await web3.eth.requestAccounts();
    this.setState({ contract, accounts });
  };

  getVoters = async () => {
    const { contract } = this.state;
    const response = await contract.methods.getVoters().call();
    this.setState({ votersList: response });
  };

  render() {
    const { votersList } = this.state;
    return (
      <div className="view-votes-bg">
        <h1>List of Voters</h1>
        <div className="candidate-table">
          <div className="candidate-table-header">
            <p className="candidate-table-cell left-cell">Voter</p>
            <p className="candidate-table-cell">Id</p>
          </div>
          <hr />
          <div className="candidate-table-data">
            {votersList.map((voter) => (
              <div key={voter["id"]} className="candidate-table-header">
                <p className="candidate-table-cell left-cell">
                  {voter["name"]}
                </p>
                <p className="candidate-table-cell">{voter["id"]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewVoters;

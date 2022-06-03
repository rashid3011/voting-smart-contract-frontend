import React, { Component } from "react";
import Web3 from "web3";
import { VOTING_ADDRESS, VOTING_ABI } from "../../config";
import "./index.css";

export class ViewVotes extends Component {
  state = {
    candidateList: [],
    votesList: [],
  };

  async componentDidMount() {
    await this.initilization();
    this.getCandidates();
  }

  initilization = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contract = new web3.eth.Contract(VOTING_ABI, VOTING_ADDRESS);
    const accounts = await web3.eth.requestAccounts();
    this.setState({ contract, accounts });
  };

  getCandidates = async () => {
    const { contract } = this.state;
    const response = await contract.methods.getCandidates().call();
    this.setState({ candidateList: response });
  };

  getVotes = async (event) => {
    const candidateId = event.target.outerText;
    const { contract } = this.state;
    const response = await contract.methods.getVotesOf(candidateId).call();
    this.setState({ votesList: response });
  };

  render() {
    const { candidateList, votesList } = this.state;
    return (
      <div className="view-votes-bg">
        <h1>List of Candidates</h1>
        <div className="candidate-table">
          <div className="candidate-table-header">
            <p className="candidate-table-cell left-cell">Candidate</p>
            <p className="candidate-table-cell">Id</p>
          </div>
          <hr />
          <div className="candidate-table-data">
            {candidateList.map((candidate) => (
              <div key={candidate["id"]} className="candidate-table-header">
                <p className="candidate-table-cell left-cell">
                  {candidate["name"]}
                </p>
                <p className="candidate-table-cell" onClick={this.getVotes}>
                  {candidate["id"]}
                </p>
              </div>
            ))}
          </div>
        </div>
        {votesList.length > 0 && (
          <>
            <h1 className="votes-heading">Votes</h1>
            <div className="view-votes">
              {votesList.map((vote) => (
                <p>{vote}</p>
              ))}
            </div>
            <h1 className="votes-heading">Count : {votesList.length}</h1>
          </>
        )}
      </div>
    );
  }
}

export default ViewVotes;

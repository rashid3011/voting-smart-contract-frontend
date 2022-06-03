import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import CastVote from "./Components/CastVote";
import RegisterVoter from "./Components/RegisterVoter";
import ViewVotes from "./Components/ViewVotes";
import "./App.css";
import RegisterCandidate from "./Components/RegisterCandidate";
import ViewVoters from "./Components/ViewVoters";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cast-vote" element={<CastVote />} />
        <Route path="/register-voter" element={<RegisterVoter />} />
        <Route path="/register-candidate" element={<RegisterCandidate />} />
        <Route path="/view-candidates" element={<ViewVotes />} />
        <Route path="/view-voters" element={<ViewVoters />} />
      </Routes>
    </div>
  );
}

export default App;

import { TaggedInput } from "./TaggedInput";
import Data from "./MOCK_DATA.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TaggedInput tags={Data} onChange={console.log} />
    </div>
  );
}

export default App;

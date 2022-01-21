import { TaggedInput } from "./TaggedInput";
import Data from "./MOCK_DATA.json";

function App() {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <TaggedInput tags={Data} onChange={console.log} />
    </div>
  );
}

export default App;

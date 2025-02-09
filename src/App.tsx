import MatrixComponent from "./components/MatrixComponent";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <h1 className="text-4xl">Tic Tac Toe game</h1>
      <MatrixComponent />
      <Toaster />
    </div>
  );
}

export default App;

import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <section className="container mx-auto antialiased h-full flex flex-col justify-center items-center">
      <h2 className="text-center font-medium text-4xl py-8">
        Tic Tac Toe against AI
      </h2>

      <Board boardSize={9} />
    </section>
  );
}

export default App;

import IdiomaProvider from "./components/IdiomaProvider";
import Header from "./components/Header";
import SelectorIdioma from "./components/SelectorIdioma";

const App = () => {
  return (
    <IdiomaProvider>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <SelectorIdioma />
      </div>
    </IdiomaProvider>
  );
}

export default App;
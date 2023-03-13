import "./App.css";
import Navigation from "./components/Navigation";
import LoadingProvider from "./LoadingProvider";

function App() {
  return (
    <LoadingProvider>
      <Navigation />
    </LoadingProvider>
  );
}

export default App;

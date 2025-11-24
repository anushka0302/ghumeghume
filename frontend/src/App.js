import "./App.css";
import Layout from "./components/Layout/Layout";
import CacheBuster from './components/CacheBuster';

function App() {
  return (
    <>
      {/* Automatically checks for new version and reloads if needed */}
      <CacheBuster />
      <Layout />
    </>
  );
}

export default App;
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout/MainLayout";

function App() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;

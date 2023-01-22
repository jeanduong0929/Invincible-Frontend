import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import Router from "./components/routing/Router";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Router />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;

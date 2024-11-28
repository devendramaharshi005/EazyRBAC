import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./pages/LoginRegister";
import Tasks from "./pages/Tasks";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen flex flex-col">
          {/* Navbar */}

          <div className="flex-grow overflow-y-auto bg-[#f9fafb] text-black">
            <Routes>
              <Route path="/" element={<LoginRegister />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  );
};

export default App;

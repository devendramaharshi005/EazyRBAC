import { useState } from "react";
import Login from "../component/AuthComponents/Login";
import Register from "../component/AuthComponents/Register";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="backgroundImage flex items-center justify-end h-full w-full p-0 pt-16">
      <div className="bg-[#f9fafb] shadow-md  h-full w-full max-w-screen-sm  p-16">
        {isLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default LoginRegister;

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserIcon } from "../assets/TaskAssets";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Access user data and logout function
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowPopup(false);
  };

  return (
    <nav className="bg-[#f9fafb] h-full p-4 text-[#293544]">
      <div className="flex justify-between items-center">
        {/* <div className="text-xl pl-2 font-semibold">EazyTask</div> */}
        <div></div>
        <div className="relative">
          {user ? (
            <div>
              <button
                onClick={togglePopup}
                className="text-[#293544] font-semibold focus:outline-none flex  flex-row gap-2"
              >
                <div className="border-[#293544] border-2 rounded-full ">
                <UserIcon/></div>
                {user?.username}
              </button>
              {showPopup && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-md rounded-md">
                  <div className="p-4 border-b border-gray-300">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-600">Role: {user.role}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-full focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

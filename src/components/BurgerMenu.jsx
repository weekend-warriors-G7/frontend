import React, { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserProductsButton from "./UserProductsButton";
import UserOrdersButton from "./UserOrdersButton";
import SubscriptionButton from "./SubscriptionButton";
import AddProductButton from "./AddProductButton";
import LogoutButton from "./LogoutButton";
import AnalyticsDashboardButton from "./AnalyticsDashboardButton";
import { SubscriptionContext } from "../context/SubscriptionContext"; // Import SubscriptionContext

const BurgerMenu = ({ role, navigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSubscribed, loading } = useContext(SubscriptionContext); // Access subscription state

  return (
    <div>
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white text-3xl z-50 focus:outline-none"
        >
          <FaBars />
        </button>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-elemColour text-white z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "280px" }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="text-white text-3xl absolute top-4 right-4 focus:outline-none"
        >
          <FaTimes />
        </button>

        <nav className="flex flex-col items-start p-6 mt-16 space-y-6">
          {role === "ADMIN" && (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard");
              }}
              className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
            >
              Dashboard
            </button>
          )}
          <AddProductButton onClose={() => setMenuOpen(false)} />
          <UserProductsButton onClose={() => setMenuOpen(false)} />
          <UserOrdersButton onClose={() => setMenuOpen(false)} />
          {role === "USER" && !loading && !isSubscribed && ( // Show button only if not subscribed

            <SubscriptionButton onClose={() => setMenuOpen(false)} />
          )}
          {(role === "ADMIN" || isSubscribed) && (
            <AnalyticsDashboardButton onClose={() => setMenuOpen(false)} />
          )}
          <LogoutButton onClose={() => setMenuOpen(false)} />
        </nav>
      </div>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default BurgerMenu;

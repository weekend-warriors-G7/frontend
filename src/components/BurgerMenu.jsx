import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserProductsButton from "./UserProductsButton";
import SubscriptionButton from "./SubscriptionButton";
import AddProductButton from "./AddProductButton";
import LogoutButton from "./LogoutButton";

const BurgerMenu = ({ role, navigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white text-3xl focus:outline-none"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-[60px] right-0 bg-elemColour text-white p-6 rounded-md shadow-lg z-50 w-48`}
      >
        <ul className="space-y-4">
          {role === "ADMIN" && (
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
              >
                Dashboard
              </button>
            </li>
          )}
          <li>
            <AddProductButton />
          </li>
          <li>
            <UserProductsButton />
          </li>
          {role === "USER" && (
            <li>
              <SubscriptionButton />
            </li>
          )}
          <li>
            {" "}
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;

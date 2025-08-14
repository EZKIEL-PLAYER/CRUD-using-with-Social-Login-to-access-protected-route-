import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function NavbarBasic() {
  const count = useSelector((store) => store.counterR);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
        <nav
          aria-label="Main navigation"
          className="flex h-[4.5rem] items-center justify-between"
        >
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold tracking-wide text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            ODINN
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-between w-7 h-6 focus:outline-none"
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 bg-slate-800 rounded transition-all duration-300 ${
                isToggleOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-slate-800 rounded transition-all duration-300 ${
                isToggleOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-slate-800 rounded transition-all duration-300 ${
                isToggleOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>

          {/* Menu Links */}
          <ul
            className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-screen lg:h-auto bg-white/95 lg:bg-transparent flex flex-col lg:flex-row items-center gap-6 lg:gap-8 px-6 pt-28 lg:pt-0 transition-all duration-300 ease-in-out ${
              isToggleOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 lg:opacity-100 lg:translate-x-0"
            }`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-medium"
                  : "text-slate-700 hover:text-emerald-500 transition-colors"
              }
              onClick={() => setIsToggleOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-medium"
                  : "text-slate-700 hover:text-emerald-500 transition-colors"
              }
              onClick={() => setIsToggleOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/login"
              className="bg-emerald-500 text-white px-5 py-2 rounded-md hover:bg-emerald-600 transition-colors"
              onClick={() => setIsToggleOpen(false)}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-emerald-500 text-white px-5 py-2 rounded-md hover:bg-emerald-600 transition-colors"
              onClick={() => setIsToggleOpen(false)}
            >
              Register
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

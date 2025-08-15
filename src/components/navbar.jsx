import { Link } from "react-router-dom";
import { User2Icon, ShoppingCart, Menu, X } from "lucide-react";
import "../index.css";
import { useCart } from "../context/cartcontext";
import avatar from "../assets/image-avatar.png";

import CartCard from "./miniCard";
import { useState, useRef, useEffect } from "react";

const Navbar = ({ title = "E-Store" }) => {
  const { cartCount } = useCart();
  const { cartItems } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const profileContainerRef = useRef(null);

  const toggleCartVisibility = () => {
    setIsCartVisible(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileContainerRef.current && !profileContainerRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };

    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);

  return (
    <>
      <header className="bg-white h-20 fixed top-0 w-[85%] z-50  pt-3 pl-4 mt-5 mr-7">
        <nav className="container mx-auto h-full pb-14 pl-14">
          <menu className="flex items-center justify-between h-full px-4 md:px-0 mt-3 pb-12 pl-14 pr-14">
            {/* Left side: Sidebar Toggle (mobile only) and Desktop Nav Links */}
            <div className="flex items-center h-full">
              {/* Mobile Menu Icon */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 md:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-start mr-9">
                <svg
                  width="138"
                  height="20"
                  viewBox="0 0 138 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.217 20c4.761 0 7.519-.753 7.519-4.606 0-3.4-3.38-4.172-6.66-4.682l-.56-.085-.279-.041-.35-.053c-2.7-.405-3.18-.788-3.18-1.471 0-.478.49-1.331 2.843-1.331 2.455 0 3.493.647 3.493 1.87v.134h4.281v-.133c0-2.389-1.35-5.238-7.774-5.238-5.952 0-7.201 2.584-7.201 4.752 0 3.097 2.763 4.086 7.223 4.675.21.028.433.054.659.081 1.669.197 3.172.42 3.172 1.585 0 1.01-1.615 1.222-3.298 1.222-2.797 0-3.784-.593-3.784-1.92v-.134H.002L0 14.926v.317c.008.79.118 1.913 1.057 2.862C2.303 19.362 4.712 20 8.217 20Zm13.21 0v-7.49c0-2.104.547-4.423 4.176-4.423 3.915 0 3.778 2.777 3.768 4.042V20h4.18v-7.768c0-2.264-.176-7.766-6.732-7.766-2.778 0-4.192.911-5.195 2.28h-.197V4.467H17.22V20h4.207Zm21.959 0c5.094 0 7.787-2.07 8.217-5.405H47.53c-.386 1.02-1.63 1.72-4.143 1.72-2.721 0-3.962-1.03-4.25-3.106h12.527c.24-2.13-.029-5.417-3.026-7.44v.005c-1.312-.915-3.056-1.465-5.251-1.465-5.24 0-8.336 2.772-8.336 7.845 0 5.17 3.02 7.846 8.336 7.846Zm4.099-9.574h-8.188c.486-1.574 1.764-2.431 4.089-2.431 2.994 0 3.755 1.267 4.099 2.431ZM70.499 20V4.457H66.29V6.74h-.176c-1.053-1.377-2.809-2.283-5.677-2.283-6.433 0-7.225 5.293-7.253 7.635v.137c0 2.092.732 7.771 7.241 7.771 2.914 0 4.684-.818 5.734-2.169h.131V20H70.5Zm-8.854-3.623c-3.996 0-4.447-3.032-4.447-4.148 0-1.21.426-4.148 4.455-4.148 3.631 0 4.374 2.044 4.374 4.148 0 2.35-.742 4.148-4.382 4.148ZM88.826 20l-6.529-9.045 6.588-6.488h-5.827l-6.836 6.756V0h-4.187v19.954h4.187V16.94l3.02-2.976L83.6 20h5.226Zm9.9 0c5.094 0 7.786-2.07 8.217-5.405h-4.074c-.387 1.02-1.63 1.72-4.143 1.72-2.721 0-3.962-1.03-4.25-3.106h12.527c.24-2.13-.029-5.417-3.026-7.44v.005c-1.312-.915-3.057-1.465-5.251-1.465-5.24 0-8.336 2.772-8.336 7.845 0 5.17 3.02 7.846 8.336 7.846Zm4.098-9.574h-8.187c.485-1.574 1.763-2.431 4.089-2.431 2.994 0 3.755 1.267 4.098 2.431ZM112.76 20v-6.97c0-2.103.931-4.542 4.05-4.542 1.33 0 2.393.236 2.785.346l.67-3.976c-.728-.16-1.626-.392-2.757-.392-2.665 0-3.622.794-4.486 2.282h-.262V4.466h-4.21V20h4.21Zm17.221 0c4.761 0 7.519-.753 7.519-4.606 0-3.4-3.38-4.172-6.66-4.682l-.56-.085-.279-.041-.35-.053c-2.7-.405-3.18-.788-3.18-1.471 0-.478.49-1.331 2.843-1.331 2.455 0 3.493.647 3.493 1.87v.134h4.281v-.133c0-2.389-1.35-5.238-7.774-5.238-5.952 0-7.201 2.584-7.201 4.752 0 3.097 2.763 4.086 7.223 4.675.21.028.433.054.659.081 1.669.197 3.172.42 3.172 1.585 0 1.01-1.615 1.222-3.298 1.222-2.797 0-3.784-.593-3.784-1.92v-.134h-4.281l.002.451v.317c.008.79.118 1.913 1.057 2.862C123.333 19.362 125.742 20 129.247 20Z"
                    fill="#1D2026"
                    fillRule="nonzero"
                  />
                </svg>
              </h1>
              {/* Desktop Nav Links */}
              <ul className="hidden md:flex space-x-6 h-full ml-9 relative">
                <li className="h-full flex items-center relative group">
                  <Link
                    to="/store"
                    className="h-full flex items-center font-semibold text-gray-500 hover:text-black transition-colors duration-300"
                  >
                    Collections
                  </Link>
                  <span className="absolute -bottom-14 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="h-full flex items-center relative group">
                  <Link
                    to="/men"
                    className="h-full flex items-center font-semibold text-gray-500 hover:text-black transition-colors duration-300"
                  >
                    Men
                  </Link>
                  <span className="absolute -bottom-14 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="h-full flex items-center relative group">
                  <Link
                    to="/women"
                    className="h-full flex items-center font-semibold text-gray-500 hover:text-black transition-colors duration-300"
                  >
                    Women
                  </Link>
                  <span className="absolute -bottom-14 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="h-full flex items-center relative group">
                  <Link
                    to="/about"
                    className="h-full flex items-center font-semibold text-gray-500 hover:text-black transition-colors duration-300"
                  >
                    About
                  </Link>
                  <span className="absolute -bottom-14 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="h-full flex items-center relative group">
                  <Link
                    to="/contact"
                    className="h-full flex items-center font-semibold text-gray-500 hover:text-black transition-colors duration-300"
                  >
                    Contact
                  </Link>
                  <span className="absolute -bottom-14 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
              </ul>
            </div>

            {/* Right side: Logo, Cart and Profile Icons */}
            <div className="flex items-center gap-8">
              <ol className="flex gap-8 items-center">
                <li className="relative text-black hover:border-none">
                  <Link
                    to="/cart"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ShoppingCart
                      strokeWidth={2}
                      width={25}
                      height={25}
                      style={{ fill: "none" }}
                      className="hover:text-black"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2.5 bg-orange-500 text-white text-[0.7rem] rounded-full w-5 h-5 p-0.5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li
                  className="profile-container relative"
                  ref={profileContainerRef}
                >
                  <p
                    onClick={toggleCartVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={avatar} alt="avatar-profile" className="w-8" />
                  </p>
                  {isCartVisible && <CartCard items={cartItems} />}
                </li>
              </ol>
            </div>
          </menu>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className="w-64 bg-white h-full p-4 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="self-end p-2"
          >
            <X size={24} />
          </button>
          <ul className="flex flex-col space-y-4 mt-8">
            <li className="h-full flex items-center relative group">
              <Link
                to="/store"
                className="font-semibold text-gray-500 hover:text-black transition-colors duration-300"
              >
                Collections
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="h-full flex items-center relative group">
              <Link
                to="/men"
                className="font-semibold text-gray-500 hover:text-black transition-colors duration-300"
              >
                Men
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="h-full flex items-center relative group">
              <Link
                to="/women"
                className="font-semibold text-gray-500 hover:text-black transition-colors duration-300"
              >
                Women
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="h-full flex items-center relative group">
              <Link
                to="/about"
                className="font-semibold text-gray-500 hover:text-black transition-colors duration-300"
              >
                About
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li className="h-full flex items-center relative group">
              <Link
                to="/contact"
                className="font-semibold text-gray-500 hover:text-black transition-colors duration-300"
              >
                Contact
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute border-b-2 border-gray-300 bg-white top-25 z-50 w-[79%] left-35"></div>
    </>
  );
};

export default Navbar;
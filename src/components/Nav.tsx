import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, SetAuthContext } from "../contexts/AuthProvider";

const Nav = () => {
  const userRef = useRef<any>();
  const shopRef = useRef<any>();
  const auth = useContext(AuthContext);
  const setAuth = useContext(SetAuthContext);
  const [userDropdown, setUserDropdown] = useState<boolean>(false);
  const [shopDropdown, setShopDrowdown] = useState<boolean>(false);

  /* Dropdown click outside */
  useEffect(() => {
    let handler = (e: Event) => {
      if (!userRef.current.contains(e.target)) {
        setUserDropdown(false);
      }

      if (!shopRef.current.contains(e.target)) {
        setShopDrowdown(false);
      }
    };

    /* Add eventlistener */
    document.addEventListener("mousedown", handler);

    /* Remove eventlistener (basically cleanup) */
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const logout = () => {
    window.sessionStorage.removeItem("auth");
    setAuth!(null);
    warning();
  };

  /* Warning toaster */
  const warning = () => {
    toast.warn("You are now logged out", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <nav className="flex justify-between items-center | bg-gradient-to-r from-slate-900 to-cyan-900 text-white | px-32 py-10 | shadow-xl">
      <ul className="flex items-center | gap-7">
        <Link
          to="/"
          className="font-parkson text-7xl | ease-out duration-500 hover:scale-110"
        >
          INVINCIBLE
        </Link>

        <div
          ref={shopRef}
          className="flex items-center | gap-1 | hover:underline hover:underline-offset-4 | cursor-pointer"
          onClick={() => setShopDrowdown(!shopDropdown)}
        >
          <li className="font-mono">Shop</li>

          {/* Shop dropdown */}
          {shopDropdown ? (
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clip-rule="evenodd"
                />
              </svg>
              <ul className="absolute flex items-center | bg-white | px-32 py-4 w-full -translate-x-96 translate-y-16 | text-black | gap-5 | shadow-xl">
                <Link
                  className="font-mono | ease-out transition hover:scale-110 hover:font-bold hover:text-yellow-500"
                  to="/shop/all"
                >
                  Shop all
                </Link>
                <Link
                  className="font-mono | ease-out transition hover:scale-110 hover:font-bold hover:text-yellow-500"
                  to="/shop/tops"
                >
                  Tops
                </Link>
                <Link
                  className="font-mono | ease-out transition hover:scale-110 hover:font-bold hover:text-yellow-500"
                  to="/shop/pants"
                >
                  Pants
                </Link>
                <Link
                  className="font-mono | ease-out transition hover:scale-110 hover:font-bold hover:text-yellow-500"
                  to="/shop/accessories"
                >
                  Accessories
                </Link>
              </ul>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>

        <li className="font-mono hover:underline hover:underline-offset-4 | cursor-pointer">
          About
        </li>
      </ul>

      <ul className="flex items-center | gap-10">
        <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ease-out duration-300 hover:scale-125 | w-8 h-8 | cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </Link>

        <div
          ref={userRef}
          className="flex flex-col items-end text-right"
          onClick={() => setUserDropdown(!userDropdown)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ease-out duration-300 hover:scale-125 | w-8 h-8 | cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>

          <div
            className={
              userDropdown
                ? "absolute | bg-slate-200 text-black text-right | px-5 py-2 w-40 translate-y-12 | rounded-md shadow-xl | ease-out duration-300 transition-all"
                : "absolute invisible"
            }
          >
            {auth ? (
              <div>
                <button className="font-mono font-bold | ease-out transition hover:scale-110 hover:text-blue-500">
                  {auth.username}
                </button>

                <button className="font-mono | ease-out transition hover:scale-110 hover:text-blue-500 hover:font-bold">
                  Edit profile
                </button>

                <button
                  className="font-mono | ease-out transition hover:scale-110 hover:text-blue-500 hover:font-bold"
                  onClick={() => logout()}
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button
                  className={
                    "font-mono | ease-in-out transition hover:scale-110 hover:text-blue-500 hover:font-bold"
                  }
                >
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;

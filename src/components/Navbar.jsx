import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:px-28">
      <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
        <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <h1 className="text-2xl font-bold">Ngurus Izin</h1>
              {/* <Link
                href={"/"}
                className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={100}
                  height={50}
                />
              </Link> */}
              <button
                onClick={toggleNavbar}
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  {isOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    ></path>
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
            <div
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
            >
              <Link
                href={"/"}
                className={`nav-link ${
                  router.pathname === "/"
                    ? "font-bold text-black bg-lime-400"
                    : ""
                } px-4 py-2 mt-2 text-sm font-bold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-lime-400 focus:bg-lime-400 focus:outline-none focus:shadow-outline`}
              >
                HOME
              </Link>
              <Link
                href={"/layanan"}
                className={`nav-link ${
                  router.pathname === "/layanan"
                    ? "font-bold text-black bg-lime-400"
                    : ""
                } px-4 py-2 mt-2 text-sm font-bold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-lime-400 focus:bg-lime-400 focus:outline-none focus:shadow-outline`}
              >
                LAYANAN
              </Link>
              <Link
                href={"/tentang"}
                className={`nav-link ${
                  router.pathname === "/tentang"
                    ? "font-bold text-black bg-lime-400"
                    : ""
                } px-4 py-2 mt-2 text-sm font-bold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-lime-400 focus:bg-lime-400 focus:outline-none focus:shadow-outline`}
              >
                TENTANG KAMI
              </Link>
              {/* <Link
                href={"/kontak"}
                className={`nav-link ${
                  router.pathname === "/kontak"
                    ? "font-bold text-black bg-lime-400"
                    : ""
                } px-4 py-2 mt-2 text-sm font-bold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-lime-400 focus:bg-lime-400 focus:outline-none focus:shadow-outline`}
              >
                KONTAK
              </Link> */}
              {/* <Link
                href={"/auth/login"}
                className={`nav-link ${
                  router.pathname === "/auth/login"
                    ? "font-bold border-2 border-lime-400"
                    : ""
                } flex items-center w-52 gap-1 px-4 py-2 mt-2 text-sm font-bold leading-tight text-center text-black uppercase transition duration-150 ease-in-out border-2 border-gray-300 rounded-full lg:w-auto lg:mt-0 lg:ml-2 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0`}
              >
                Login
                <Image
                  src="/images/user 1.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </Link> */}
              {/* <Link
                href={"/affiliate"}
                className={`nav-link ${
                  router.pathname === "/affiliate"
                    ? "font-bold border-2 border-lime-400"
                    : ""
                } flex items-center w-52 gap-1 px-4 py-2 mt-2 mb-3 text-sm font-bold leading-tight text-black uppercase transition duration-150 ease-in-out border-2 border-gray-300 rounded-full lg:mb-0 lg:w-auto lg:mt-0 lg:ml-2 hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0`}
              >
                Affiliate Program
                <Image
                  src="/images/arrow.svg"
                  alt="Logo"
                  width={15}
                  height={15}
                />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

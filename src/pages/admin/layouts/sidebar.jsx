import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NotificationDropdown from "@/components/layoutsAdmin/NotificationDropdown";
import UserDropdown from "@/components/layoutsAdmin/UserDropdown";
import axios from "axios";
import { useCookies } from "react-cookie";
import CekRole from "@/components/CekRole";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  // akses berdasarkan role
  const role = CekRole();

  // SECTION Fungsi untuk menghapus cookie berdasarkan namanya
  function deleteCookie(name) {
    // Menetapkan tanggal kedaluwarsa yang sudah lewat
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  const handleLogout = async () => {
    try {
      // Mendapatkan token JWT dari cookies
      const token = cookies.token;

      // Menyertakan token JWT dalam header Authorization
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      // Kirim permintaan logout dengan token JWT yang disertakan dalam header
      await axios.post("https://api.ngurusizin.online/api/auth/logout", null, config);

      // Hapus token JWT dari cookies setelah berhasil logout
      // setCookie("token", "", { path: "/" });
      deleteCookie("token");

      // Redirect ke halaman login setelah logout
      router.push("/auth/login");
    } catch (error) {
      // console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            href={"/"}
            className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
          >
            Ngurus Izin
          </Link>
          {/* User */}
          {/* <ul className="flex flex-wrap items-center list-none md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul> */}
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
                  >
                    Ngurus Izin
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            {/* <form className="mt-6 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none"
                />
              </div>
            </form> */}

            {/* Divider */}
            {/* <hr className="my-4 md:min-w-full" /> */}
            {/* Heading */}
            {/* <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Admin Layout Pages
            </h6> */}
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full">
              {/* {role == 'affiliate' && (
                <li className="items-center">
                  <Link
                    href={"/admin/dashboard"}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white rounded-lg px-4 py-2"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Dashboard
                  </Link>
                </li>
              )} */}

              {/* SECTION LAYANAN */}
              {role == "affiliate" && (
                <li className="items-center">
                  <Link
                    href={"/admin/layanan"}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/layanan") !== -1
                        ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white rounded-lg px-4 py-2"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/layanan") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Layanan
                  </Link>
                </li>
              )}

              {/* SECTION ORDER */}
              <li className="items-center">
                <Link
                  href={"/admin/order"}
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/order") !== -1
                      ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white rounded-lg px-4 py-2"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-clipboard-list mr-2 text-sm " +
                      (router.pathname.indexOf("/admin/order") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Order
                </Link>
              </li>

              {/* SECTION BAR TENTANG */}
              {role == "affiliate" && (
                <li className="items-center">
                  <Link
                    href={"/admin/tentang"}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/tentang") !== -1
                        ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white rounded-lg px-4 py-2"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-address-card mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/tentang") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Tentang
                  </Link>
                </li>
              )}
              {/* TESTIMONI */}
              {role == "affiliate" && (
                <li className="items-center">
                  <Link
                    href={"/admin/testimoni"}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/testimoni") !== -1
                        ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white rounded-lg px-4 py-2"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-comments mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/testimoni") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Testimoni
                  </Link>
                </li>
              )}
              {/* SECTION ADMINISTRATORS */}
              {role == "affiliate" && (
                <li className="items-center">
                  <Link
                    href={"/admin/administrators"}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/administrators") !== -1
                        ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white rounded-lg px-4 py-2"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-users mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/administrators") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    administrators
                  </Link>
                </li>
              )}

              <li className="items-center">
                <button
                  onClick={handleLogout}
                  className="block py-3 text-xs font-bold uppercase "
                >
                  <i className="mr-2 text-sm fas fa-sign-out-alt "></i>
                  logout
                </button>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
          </div>
        </div>
      </nav>
    </>
  );
}

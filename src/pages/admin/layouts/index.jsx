import React, { useEffect } from "react";

// components

import AdminNavbar from "@/components/layoutsAdmin/AdminNavbar.js";

import HeaderStats from "@/components/layoutsAdmin/HeaderStats";
import FooterAdmin from "@/components/layoutsAdmin/FooterAdmin";
import Sidebar from "./sidebar";
import CekAkses from "@/components/CekAkses";

export default function AdminLayout({ children }) {
  CekAkses();

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

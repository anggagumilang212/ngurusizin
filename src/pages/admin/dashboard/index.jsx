import React from "react";
import AdminLayout from "../layouts";

export default function Dashboard() {
  return (
    <>
      <AdminLayout>
        <div className="flex flex-wrap">
          <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">Dashboard</div>
        </div>
      </AdminLayout>
    </>
  );
}

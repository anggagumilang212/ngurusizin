"use client";

import React from "react";
import AdminLayout from "../layouts";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function Dashboard({ isLoggedIn }) {
  const router = useRouter();

  // Jika pengguna belum login, arahkan kembali ke halaman login
  if (!isLoggedIn) {
    if (typeof window !== "undefined") {
      // Cek apakah kode sedang berjalan di sisi klien
      router.push("/auth/login"); // Mengarahkan pengguna kembali ke halaman login
    }
    return <p>Loading...</p>; // or display loading indicator
  }
  const CardList = [
    {
      title: "Order",
      icon: "fas fa-shopping-cart",
      value: 622,
    },
    {
      title: "Layanan",
      icon: "fas fa-shopping-cart",
      value: 622,
    },
    {
      title: "Layanan",
      icon: "fas fa-shopping-cart",
      value: 622,
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AdminLayout>
        {/* <div className="flex flex-col gap-2 -mt-24 bg-white md:flex-row">
          {CardList.map((card, index) => (
            <div
              key={index}
              className="flex flex-row gap-8 p-6 m-auto border-2 border-purple-500 rounded-lg bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900"
            >
              <div className="my-auto">
                <div className="text-lg text-purple-300">{card.title}</div>
                <div className="text-4xl text-purple-100">{card.value}</div>
              </div>
              <div className="p-4 my-auto text-purple-300 rounded-full bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900">
                <i className="text-4xl fas fa-shopping-cart"></i>
              </div>
            </div>
          ))}
        </div> */}
      </AdminLayout>
    </>
  );
}
// middleware
export async function getServerSideProps(context) {
  // Mendapatkan cookies dari konteks
  const cookies = parseCookies(context);

  // Mengecek apakah token JWT ada di cookies
  const isLoggedIn = !!cookies.token;

  // Mengembalikan props untuk komponen Dashboard
  return {
    props: { isLoggedIn },
  };
}

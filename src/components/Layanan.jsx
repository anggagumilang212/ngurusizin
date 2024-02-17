import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingLayanan from "./elements/LoadingLayanan";
// const LayananList = [
//   {
//     id: 1,
//     title: "Pembuatan PT",
//     description:
//       "Bagi anda yang ingin badan usaha dengan struktur kepemilikanan tttttttttttttttttttttttt gsssssssssffffffefcef",
//     image: "/images/example.jpg",
//   },
//   {
//     id: 2,
//     title: "Pembuatan PT",
//     description:
//       "Bagi anda yang ingin badan usaha dengan struktur kepemilikanan tttttttttttttttttttttttt gsssssssssffffffefcef",
//     image: "/images/example.jpg",
//   },
//   {
//     id: 3,
//     title: "Pembuatan PT",
//     description:
//       "Bagi anda yang ingin badan usaha dengan struktur kepemilikanan tttttttttttttttttttttttt gsssssssssffffffefcef",
//     image: "/images/example.jpg",
//   },
//   {
//     id: 4,
//     title: "Pembuatan PT",
//     description:
//       "Bagi anda yang ingin badan usaha dengan struktur kepemilikanan tttttttttttttttttttttttt gsssssssssffffffefcef",
//     image: "/images/example.jpg",
//   },
// ];
export default function Layanan() {
  const [Layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/layanan");
        setLayanan(response.data.data);
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  // Menampilkan Skeleton saat loading atau error fetching data
  if (loading) {
    return (
      <>
        <div className="relative flex flex-col items-center justify-center lg:px-28">
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingLayanan key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-8">
        <h1 className="font-extrabold text:3xl  lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
          Layanan dan Harga
        </h1>
      </div>
      <div className="relative flex flex-col items-center justify-center lg:px-28">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
          {Layanan.slice(0, 4).map((item) => (
            <div className="flex flex-col" key={item.type.id}>
              <div className="p-4 bg-white shadow-md rounded-3xl">
                <div className="flex-none lg:flex">
                  <div className="w-full h-full mb-3 lg:h-48 lg:w-48 lg:mb-0">
                    {/* <Image
                      src={item.attributes.gambar}
                      alt="Just a flower"
                      className="object-scale-down w-full lg:object-cover lg:h-48 rounded-2xl"
                      width={200}
                      height={200}
                    /> */}
                  </div>
                  <div className="flex-auto py-2 ml-3 justify-evenly">
                    <div className="flex flex-wrap ">
                      <h2 className="flex-auto text-lg font-medium">
                        {item.attributes.nama}
                      </h2>
                    </div>

                    <p className="mb-5 text-gray-500 max-w-80">
                      {item.attributes.deskripsi}
                    </p>

                    <div className="flex space-x-3 text-sm font-medium">
                      <div className="flex flex-auto space-x-3">
                        <button className="inline-flex items-center px-4 py-2 mb-2 space-x-2 tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:bg-gray-100 ">
                          <span>Rp.{item.attributes.harga}</span>
                        </button>
                      </div>
                      <Link
                        href={`/layanan/form/?id=${item.id}`}
                        className="px-5 py-2 mb-2 tracking-wider text-white bg-[#A8CF45] rounded-full shadow-sm md:mb-0 hover:bg-gray-800"
                        type="button"
                        aria-label="like"
                      >
                        Dapatkan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href={"/layanan"}
          type="submit"
          className="block px-4 py-3 mt-6 font-semibold text-center text-white rounded-lg w-52 bg-gradient-to-r from-lime-400 to-lime-600 hover:bg-indigo-400 focus:bg-indigo-400"
        >
          Lihat Semua Layanan
        </Link>
      </div>
    </>
  );
}

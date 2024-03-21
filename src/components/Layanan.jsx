import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "./elements/LoadingLayanan";

export default function Layanan() {
  const [Layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.ngurusizin.online/api/layanan");
        setLayanan(response.data.data.data);
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
          {Layanan.slice(0, 4).map((item) => {
            let partDeskripsi = item.attributes.deskripsi.split('\r\n');
            let deskripsi = partDeskripsi.filter((item) => item.trim() !== ""); // menghapus string yang kosong

            return (
              <div className="flex flex-col" key={item.id}>
                <div className="p-4 bg-white shadow-md rounded-3xl">
                  <div className="flex-none lg:flex">
                    <div className="w-full h-full mb-3 lg:h-48 lg:w-48 lg:mb-0">
                      <img
                        src={item.attributes.urlGambar}
                        alt="Just a flower"
                        width={200}
                        height={200}
                        className="object-scale-down w-full rounded-2xl lg:object-cover lg:h-48"
                      />
                    </div>
                    <div className="flex-auto py-2 ml-3 justify-evenly">
                      <div className="flex flex-wrap ">
                        <h2 className="flex-auto text-lg font-medium">
                          {item.attributes.nama}
                        </h2>
                      </div>

                      <p className="mb-5 text-gray-500 max-w-80">
                        {deskripsi.map((data, index) => (
                          <p key={index}>{data}</p>
                        ))}
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
            );
          })}
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

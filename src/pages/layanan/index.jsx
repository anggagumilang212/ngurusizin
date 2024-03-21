import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "@/components/elements/LoadingLayanan";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.ngurusizin.online/api/layanan?page=${currentPage}&pageSize=${pageSize}`
        );
        setLayanan(response.data.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);
  console.log(layanan);

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
            {Array.from({ length: pageSize }).map((_, index) => (
              <LoadingLayanan key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // Menghitung angka pertama yang akan ditampilkan dalam navigasi paginasi
  const firstPage = Math.max(1, currentPage - 4);

  return (
    <>
      <div className="mt-8">
        <h1 className="font-extrabold text:3xl  lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
          Layanan dan Harga
        </h1>
      </div>
      <div className="relative flex flex-col items-center justify-center lg:px-28">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
          {layanan.map((item) => {
            let partDeskripsi = item.attributes.deskripsi.split("\r\n");
            let deskripsi = partDeskripsi.filter((item) => item.trim() !== ""); // menghapus string yang kosong

            return (
              <div className="flex flex-col" key={item.id}>
                <div className="p-4 bg-white shadow-md rounded-3xl">
                  <div className="flex-none lg:flex">
                    <div className="w-full h-full mb-3 lg:h-48 lg:w-48 lg:mb-0">
                      <img
                        src={item.attributes.urlGambar}
                        alt={item.attributes.nama}
                        width={200}
                        height={200}
                        className="object-scale-down w-full rounded-2xl lg:object-cover lg:h-48"
                      />
                    </div>
                    <div className="flex-auto py-2 ml-3 justify-evenly">
                      <div className="flex flex-wrap ">
                        {/* Placeholder Title */}
                        <h2 className="flex-auto text-lg font-medium">
                          {item.attributes.nama}
                        </h2>
                      </div>

                      {/* Placeholder Description */}
                      <p className="mb-5 text-gray-500 max-w-80">
                        {deskripsi.map((data, index) => (
                          <p key={index}>{data}</p>
                        ))}
                      </p>

                      <div className="flex space-x-3 text-sm font-medium">
                        <div className="flex flex-auto space-x-3">
                          {/* Placeholder Price */}
                          <button className="inline-flex items-center px-4 py-2 mb-2 space-x-2 tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:bg-gray-100 ">
                            <span>Rp.{item.attributes.harga}</span>
                          </button>
                        </div>
                        {/* Placeholder Button */}
                        <Link
                          href={`/layanan/form?id=${item.id}`}
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
        {/* pagination */}
        <div className="flex justify-center gap-5 my-4">
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
          >
            Prev
          </button>
          <div className="flex">
            {Array.from(
              { length: Math.min(totalPages - firstPage + 1, 5) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(firstPage + index)}
                  className={`mx-1 px-3 py-1 rounded-md ${
                    currentPage === firstPage + index
                      ? "bg-[#A8CF45] text-white"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  {firstPage + index}
                </button>
              )
            )}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

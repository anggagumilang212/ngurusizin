import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auto } from "@popperjs/core";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import CekRole from "@/components/CekRole";
const Order = ({ isLoggedIn }) => {
  const router = useRouter();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const role = CekRole();

  // update data
  const [updateData, setUpdateData] = useState({
    status: "",
  });

  const setSearchAndClearAfterDelay = (value, delay) => {
    // Set nilai setSearch
    setSearchTerm(value);

    // Hapus nilai setSearch setelah delay
    setTimeout(() => {
      setSearchTerm('');
    }, delay);
  };

  // Contoh penggunaan


  // console.log('indexOrder', CekRole());
  const fetchData = async () => {
    let url = '';

    try {
      const response = await axios.get(`https://api.ngurusizin.online/api/order?page=${currentPage}&role=${role}`);

      console.log(response);
      setOrder(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data order:", error);
      setError(error);
    }
  };

  // console.log(order);

  const fetchDataByKeyword = async (keyword) => {
    try {
      const response = await axios.get(
        `https://api.ngurusizin.online/api/order?keyword=${keyword}&role=${role}`
      );

      // console.log(response);
      setOrder(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data order:", error);
      setError(error);
    }
  };

  // untuk mengatasi error yang tidak jelas
  useEffect(() => {
    let nomor = 0;
    // kondisi search
    if (nomor == 0) {
      setSearchAndClearAfterDelay('  ', 500);
      nomor++;
      setLoading(false);
    }
  }, [])

  useEffect(() => {

    if (searchTerm !== "") {
      fetchDataByKeyword(searchTerm);
    } else {
      fetchData();
    }
  }, [currentPage, searchTerm]);


  //   toast
  const showToastMessage = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const firstPage = Math.max(1, currentPage - 4); // Menghitung halaman pertama yang akan ditampilkan

  //   delete
  const handleDelete = async () => {
    const id = itemIdToDelete;
    try {
      const response = await fetch(`https://api.ngurusizin.online/api/order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      setOrder(order.filter((item) => item.id !== id));
      showToastMessage("Data berhasil dihapus!");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };
  const toggleModalDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  // update data
  const handleEdit = (item) => {
    setUpdateData({
      id: item.id,
      status: item.attributes.status,
      phoneNumber: item.attributes.phone,
      Nama: item.attributes.nama,
    });
    setShowUpdateModal(true);
  };

  // Fungsi untuk mengirim pesan ke URL API
  const sendMessageToAPI = async (phoneNumber, message, Nama) => {
    try {
      const response = await fetch("https://wa.ngurusizin.online/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: phoneNumber, message, Nama }), // Menggunakan "number" untuk request body
      });

      if (response.ok) {
        console.log("Pesan berhasil dikirim ke API.");
      } else {
        console.error("Gagal mengirim pesan ke API.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.ngurusizin.online/api/order/${updateData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        showToastMessage("Status berhasil diupdate!");
        setShowUpdateModal(false);
        fetchData();

        // Mengirim pesan ke URL API setiap kali status diperbarui
        const message = `Hai! *${updateData.Nama.toUpperCase()}*,\nKami dari Team Izin aja .Id\nStatus Order Anda: *${updateData.status.toUpperCase()}*\n${getStatusMessage(
          updateData.status
        )}`;
        // Mengambil pesan berdasarkan status yang dipilih
        await sendMessageToAPI(updateData.phoneNumber, message); // Menggunakan nomor telepon yang sudah disimpan dalam updateData
      } else {
        console.error("Gagal mengupdate data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi untuk mengambil pesan berdasarkan status
  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Menunggu dokumen lengkap. Silakan kirimkan dokumen lengkap Anda di sini.";
      case "on process":
        return "Pesanan Anda sedang dalam proses. Terima kasih atas kesabaran Anda.";
      case "success":
        return "Pesanan Anda berhasil diselesaikan. Terima kasih telah menggunakan layanan kami.";
      case "cancel":
        return "Pesanan Anda telah dibatalkan. Silakan hubungi kami jika Anda memerlukan bantuan lebih lanjut.";
      default:
        return "Status pesanan tidak valid.";
    }
  };

  // Jika pengguna belum login, arahkan kembali ke halaman login
  if (!isLoggedIn) {
    if (typeof window !== "undefined") {
      // Cek apakah kode sedang berjalan di sisi klien
      router.push("/auth/login"); // Mengarahkan pengguna kembali ke halaman login
    }
    return <p>Loading...</p>; // or display loading indicator
  }

  return (
    <>
      <Head>
        <title>Data Order</title>
      </Head>
      <AdminLayout>
        <ToastContainer />

        <div className="flex flex-col overflow-x-auto bg-white">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <input
                  type="text"
                  placeholder="Cari order..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48  md:w-56 lg:w-72 rounded-l-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <table className="min-w-full text-sm font-light text-left">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Nama Layanan
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Nama Konsumen
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Domilisi
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center">Loading ...</td>
                      </tr>
                    ) : (
                      <>
                      {order.map((item) => (
                        <tr
                          className="border-b dark:border-neutral-500"
                          key={item.id}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.attributes.layanan.nama}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.attributes.nama}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.attributes.domisili}
                          </td>
  
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.attributes.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleEdit(item)}
                              className="relative inline-block p-px text-xs font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900"
                            >
                              <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                              </span>
                              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                <span>{item.attributes.status}</span>
                                <svg
                                  fill="none"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.75 8.75L14.25 12L10.75 15.25"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </div>
                              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                            </button>
                          </td>
  
                          <td className="flex items-center gap-1 px-6 py-4 mt-8 whitespace-nowrap">
                            {/* button delete */}
                            <button
                              onClick={() => {
                                toggleModalDelete();
                                setItemIdToDelete(item.id);
                                // Simpan ID item yang akan dihapus
                              }}
                              className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm bg-gradient-to-r from-indigo-400 to-gray-600 md:mb-0 hover:bg-gray-800"
                              aria-label="delete"
                            >
                              {isDeleting ? (
                                "Menghapus..."
                              ) : (
                                <i className="fa-solid fa-trash"></i>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                      </>
                    )}
                  </tbody>
                </table>

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
                      { length: Math.min(totalPages, 5) },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={
                            () => setCurrentPage(firstPage + index) // Memperbarui halaman berdasarkan indeks dan halaman pertama yang ditampilkan
                          }
                          className={`mx-1 px-3 py-1 rounded-md ${currentPage === firstPage + index
                            ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white"
                            : "bg-gray-200 hover:bg-gray-400"
                            }`}
                        >
                          {firstPage + index}{" "}
                          {/* Menggunakan halaman pertama yang ditampilkan */}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(prevPage + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal delete */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative w-full max-w-md transition transform bg-white rounded-lg shadow-xl">
              <div className="px-4 py-5 sm:px-6">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Delete Order
                  </h3>
                  <p className="max-w-2xl mt-1 text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus data ini?
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* modal update */}
        {showUpdateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div
              role="alert"
              className="container w-11/12 max-w-lg mx-auto mt-5 mb-5 md:w-2/3"
            >
              <div className="relative px-5 py-8 bg-white border border-gray-400 rounded shadow-md md:px-10">
                <h1 className="mb-4 font-bold leading-tight tracking-normal text-gray-800 font-lg">
                  Update Status Order
                </h1>
                <form onSubmit={handleUpdate}>
                  <label
                    for="name"
                    className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                  >
                    Name
                  </label>
                  <div class="max-w-2xl mx-auto mb-6 mt-6">
                    <select
                      name="status"
                      onChange={(e) =>
                        setUpdateData({ ...updateData, status: e.target.value })
                      }
                      value={updateData.status}
                      id="countries"
                      class="text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">pending</option>
                      <option value="on process">on process</option>
                      <option value="success">success</option>
                      <option value="cancel">cancel</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-start w-full">
                    <button
                      type="submit"
                      className="px-8 py-2 text-sm text-white transition duration-150 ease-in-out bg-indigo-700 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hover:bg-indigo-600"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="px-8 py-2 ml-3 text-sm text-gray-600 transition duration-150 ease-in-out bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:border-gray-400 hover:bg-gray-300"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 transition duration-150 ease-in-out rounded cursor-pointer hover:text-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-600"
                  onClick={() => setShowUpdateModal(false)}
                  aria-label="close modal"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

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

export default Order;

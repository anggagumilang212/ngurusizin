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
const Administrators = ({ isLoggedIn }) => {
  const router = useRouter();
  const [administrators, setAdministrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // add data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  // update data
  const [updateData, setUpdateData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.ngurusizin.online/api/administrators?page=${currentPage}`
      );
      setAdministrators(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data administrators:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataByKeyword = async (keyword) => {
    try {
      const response = await axios.get(
        `https://api.ngurusizin.online/api/administrators?keyword=${keyword}`
      );
      setAdministrators(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data administrators:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // kondisi search
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
      const response = await fetch(
        `https://api.ngurusizin.online/api/administrators/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      setAdministrators(administrators.filter((item) => item.id !== id));
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

  //   add data
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
      };

      const response = await fetch(
        "https://api.ngurusizin.online/api/administrators",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );

      if (response.ok) {
        showToastMessage("Data berhasil ditambahkan!");
        setShowModal(false);
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          role: "",
          phone: "",
        });
        fetchData();
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // update data
  const handleEdit = (item) => {
    setUpdateData({
      id: item.id,
      name: item.attributes.name,
      username: item.attributes.username,
      email: item.attributes.email,
      role: item.attributes.role,
      password: "", // Kosongkan password untuk keperluan update
      password_lama: item.attributes.password, // Kosongkan password untuk keperluan update
      phone: item.attributes.phone,
    });
    setShowUpdateModal(true);
  };

  // console.log(updateData);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.ngurusizin.online/api/administrators/${updateData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        showToastMessage("Data berhasil diupdate!");
        a;
        setShowUpdateModal(false);
        fetchData();
      } else {
        console.error("Gagal mengupdate data.");
      }
    } catch (error) {
      console.error("Error:", error);
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
        <title>Data Administrators</title>
      </Head>
      <AdminLayout>
        <ToastContainer />

        <div className="flex items-center justify-end mb-4 lg:-mt-48 md:-mt-48">
          <button
            onClick={toggleModal}
            className="flex items-center gap-1 px-4 py-2 text-white rounded-md shadow-sm bg-gradient-to-r from-indigo-400 to-gray-600 text-end hover:bg-green-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500"
          >
            <i className="fa-solid fa-plus"></i>
            Administrators
          </button>
        </div>

        <div className="flex flex-col overflow-x-auto bg-white ">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <input
                  type="text"
                  placeholder="Cari administrators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 md:w-56 lg:w-72 rounded-l-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <table className="min-w-full text-sm font-light text-left">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        username
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {administrators.map((item) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={item.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.email}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.phone}
                        </td>
                        <td className="flex items-center gap-1 px-6 py-4 mt-8 whitespace-nowrap">
                          {/* button update */}
                          <button onClick={() => handleEdit(item)}>
                            <div
                              className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm bg-gradient-to-r from-indigo-400 to-gray-600 md:mb-0 hover:bg-gray-800"
                              aria-label="edit"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </div>
                          </button>

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
                          className={`mx-1 px-3 py-1 rounded-md ${
                            currentPage === firstPage + index
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
                    Delete Administrators
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

        {/* modal add */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div
              role="alert"
              className="container w-11/12 max-w-lg mx-auto md:w-2/3"
            >
              <div className="relative px-5 py-8 bg-white border border-gray-400 rounded shadow-md md:px-10">
                <h1 className="mb-4 font-bold leading-tight tracking-normal text-gray-800 font-lg">
                  Add Administrator
                </h1>
                <form onSubmit={handleSubmit}>
                  <label
                    for="name"
                    className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                    placeholder="Name"
                    required
                  />

                  <div>
                    <label
                      for="name"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="name"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="name"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="role"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      onChange={handleChange}
                    >
                      <option value="">Pilih Role</option>
                      <option value="affiliate">affiliate</option>
                      <option value="merchant">merchant</option>
                    </select>
                  </div>
                  <label
                    for="email2"
                    className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                  >
                    Phone
                  </label>
                  <div className="relative mt-2 mb-3">
                    <div className="absolute flex items-center h-full px-4 text-gray-600 border-r">
                      <i className="fas fa-phone"></i>
                    </div>
                    <input
                      type="number"
                      id="email2"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex items-center w-full h-10 pl-16 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Phone"
                      required
                    />
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
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 transition duration-150 ease-in-out rounded cursor-pointer hover:text-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-600"
                  onClick={() => setShowModal(false)}
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
                  Update Administrator
                </h1>
                <form onSubmit={handleUpdate}>
                  <label
                    for="name"
                    className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={updateData.name}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, name: e.target.value })
                    }
                    className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                    placeholder="Name"
                  />

                  <div>
                    <label
                      for="name"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      value={updateData.username}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          username: e.target.value,
                        })
                      }
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="name"
                      name="email"
                      value={updateData.email}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, email: e.target.value })
                      }
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="name"
                      name="password"
                      value={updateData.password}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          password: e.target.value,
                        })
                      }
                      className="flex items-center w-full h-10 pl-3 mt-2 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="Password"
                    />
                    <small className="mb-3 text-xs text-[#000000]/50">
                      Isi kolom password, bila ingin mengubah password
                      sebelumnya
                    </small>
                  </div>
                  <div>
                    <label
                      for="role"
                      className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                    >
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      className="flex items-center w-full h-10 pl-3 mt-2 mb-3 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          role: e.target.value,
                        })
                      }
                    >
                      <option
                        value="affiliate"
                        selected={updateData.role == "affiliate" ? true : false}
                      >
                        affiliate
                      </option>
                      <option
                        value="merchant"
                        selected={updateData.role == "merchant" ? true : false}
                      >
                        merchant
                      </option>
                    </select>
                  </div>
                  <label
                    for="email2"
                    className="text-sm font-bold leading-tight tracking-normal text-gray-800"
                  >
                    Phone
                  </label>
                  <div className="relative mt-2 mb-3">
                    <div className="absolute flex items-center h-full px-4 text-gray-600 border-r">
                      <i className="fas fa-phone"></i>
                    </div>
                    <input
                      type="number"
                      id="email2"
                      name="phone"
                      value={updateData.phone}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, phone: e.target.value })
                      }
                      className="flex items-center w-full h-10 pl-16 text-sm font-normal text-gray-600 border border-gray-300 rounded focus:outline-none focus:border focus:border-indigo-700"
                      placeholder="XXXX - XXXX"
                    />
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

export default Administrators;

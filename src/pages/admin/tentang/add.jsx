import AdminLayout from "../layouts";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Add() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    tentang: "",
    phone: "",
    nama: "",
    gambar: null, // Set default value to null
    urlGambar: null,
    lokasi: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("tentang", formData.tentang);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("gambar", formData.gambar); // Mengganti 'file' menjadi 'gambar'
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("lokasi", formData.lokasi);
      formDataToSend.append("email", formData.email);
      const response = await axios.post("https://api.ngurusizin.online/api/tentang", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        } 
      });

      if (response.status == 201) {
        // console.log("Data berhasil di tambahkan!");
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/admin/tentang");
      } else {
        console.error("Gagal mengirim data.", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      // Mengganti 'file' menjadi 'gambar'
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
        // mengambil file pertama dari daftar file yang dipilih
        gambarUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg  lg:-mt-48">
          <Link href={"/admin/tentang"} className="relative ml-32 lg:ml-60 ">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mt-4 mb-5">
              <label
                htmlFor="nama"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nama
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.nama}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6 ">
              {" "}
              <label className="mb-5 block text-base font-semibold text-[#07074D]">
                Gambar
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="gambar"
                  id="gambar"
                  htmlFor="gambar"
                  className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="lokasi"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                id="lokasi"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.lokasi}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="tentang"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tentang
              </label>
              <textarea
                type="text"
                name="tentang"
                id="tentang"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.tentang}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div>
              <button className="w-full px-8 py-3 text-base font-semibold text-center text-white rounded-md outline-none hover:shadow-form bg-gradient-to-r from-indigo-400 to-gray-600 hover:bg-indigo-400 focus:bg-indigo-400">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Form() {
  const router = useRouter();
  const [idLayanan, setIdLayanan] = useState("");
  const [formData, setFormData] = useState({
    domisili: "",
    phone: "",
    nama: "",
    layananId: "", // Mengosongkan layananId awal
    status: "pending",
  });

  useEffect(() => {
    const { id } = router.query; // Menangkap ID layanan dari parameter URL
    if (id) {
      setIdLayanan(id); // Menyimpan ID layanan dalam state
    }
  }, [router.query]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      layananId: idLayanan, // Memperbarui layananId saat idLayanan berubah
    }));
  }, [idLayanan]);

  // Fungsi untuk mengirim pesan ke URL API
  const sendMessageToAPI = async (phoneNumber, message, Nama) => {
    try {
      const response = await axios.post(
        "https://wa.ngurusizin.online/send-message", JSON.stringify({ number: phoneNumber, message, Nama }),
        {
          headers: {
            "Content-Type": "application/json",
          }, // Menggunakan "number" untuk request body
        }
      );

      if (response.status === 200) {
        console.log("Pesan berhasil dikirim ke API.");
      } else {
        console.error("Gagal mengirim pesan ke API.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.ngurusizin.online/api/order", JSON.stringify(formData),{
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // console.log("Data berhasil dikirim!");

        const message = `Hai! *${formData.nama.toUpperCase()}*,\nKami dari Team Izin aja .Id\nStatus Order Anda: *${formData.status.toUpperCase()}*\nMenunggu dokumen lengkap. Silakan kirimkan dokumen lengkap Anda di sini.`;

        await sendMessageToAPI(formData.phone, message); // Menggunakan nomor telepon yang sudah disimpan dalam updateData

        router.push("/layanan/success");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9" onSubmit={handleSubmit}>
          <input type="hidden" name="layananId" value={idLayanan} />
          <div className="mb-5">
            <label
              for="nama"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              placeholder="Masukan Nama"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              value={formData.nama}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <label
              for="domisili"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Domilisi Perusahaan (Boleh Berbeda Dengan Ktp Pendiri)
            </label>
            <input
              type="text"
              name="domisili"
              id="domisili"
              value={formData.domisili}
              onChange={handleInputChange}
              placeholder="Domisili"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              for="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nomor Yang Dapat Di Hubungi
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              id="phone"
              placeholder="08xxxxxxx"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button className="w-full px-8 py-3 text-base font-semibold text-center text-white rounded-md outline-none hover:shadow-form bg-gradient-to-r from-lime-400 to-lime-600 hover:bg-indigo-400 focus:bg-indigo-400">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

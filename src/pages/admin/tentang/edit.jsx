import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "../layouts";
import axios from "axios";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize formData state with empty strings for text inputs and null for file input
  // Inisialisasi state formData dengan nilai default jika tidak ada data sebelumnya
  const [formData, setFormData] = useState({
    tentang: "", // Set default value to empty string
    phone: "", // Set default value to empty string
    nama: "", // Set default value to empty string
    gambar: null, // Set default value to null
    lokasi: "", // Set default value to empty string
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.ngurusizin.online/api/tentang/${id}`
        );
        // console.log("API response:", response); // Log the entire API response
        if (!response.data.data || !response.data.data.attributes) {
          throw new Error("Data tidak lengkap.");
        }
        const data = response.data.data;
        console.log("Data:", data);
        // Log the data object
        // Access attributes directly
        const { nama, tentang, phone, lokasi, email } = data.attributes;
        // Update formData state with data from the API response
        setFormData((prevData) => ({
          ...prevData,
          nama: nama || "",
          tentang: tentang || "",
          phone: phone || "",
          lokasi: lokasi || "",
          email: email || "",
        }));
      } catch (error) {
        console.error("Error fetching data tentang:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle input change function
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Update formData state based on input name
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gambar" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("tentang", formData.tentang);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("lokasi", formData.lokasi);
      formDataToSend.append("email", formData.email);

      // Jika ada gambar baru, tambahkan ke formDataToSend
      if (formData.gambar) {
        formDataToSend.append("gambar", formData.gambar);
      }

      const response = await axios.put(`https://api.ngurusizin.online/api/tentang/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status == 200) {
        router.push("/admin/tentang");
      } else {
        console.error("Gagal mengirim data.", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg lg:-mt-48">
          <Link href={"/admin/tentang"} className="relative ml-32 lg:ml-60">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
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
                value={formData.nama} // Gunakan nilai awal jika value kosong
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6 ">
              <label className="mb-5 block text-base font-semibold text-[#07074D]">
                Gambar
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="gambar"
                  id="gambar"
                  htmlFor="gambar"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.phone} // Gunakan nilai awal jika value kosong
                onChange={handleInputChange}
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
                value={formData.lokasi} // Gunakan nilai awal jika value kosong
                onChange={handleInputChange}
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
                value={formData.email} // Gunakan nilai awal jika value kosong
                onChange={handleInputChange}
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
                name="tentang"
                id="tentang"
                rows="5"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.tentang} // Gunakan nilai awal jika value kosong
                onChange={handleInputChange}
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

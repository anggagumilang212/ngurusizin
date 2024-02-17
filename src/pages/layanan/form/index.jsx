import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Form() {
  const router = useRouter();
  const [idLayanan, setIdLayanan] = useState("");
  useEffect(() => {
    const { id } = router.query; // Menangkap ID layanan dari parameter URL
    if (id) {
      setIdLayanan(id); // Menyimpan ID layanan dalam state
    }
  }, [router.query]);
  const [formData, setFormData] = useState({
    domisili: "",
    nomor: "",
    nama: "",
    gambar: null,
    gambarUrl: null,
    id_layanan: idLayanan,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("domisili", formData.domisili);
      formDataToSend.append("nomor", formData.nomor);
      formDataToSend.append("gambar", formData.gambar); // Mengganti 'file' menjadi 'gambar'
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("id_layanan", formData.id_layanan);
      const response = await fetch("http://localhost:5000/api/layanan", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // console.log("Data berhasil dikirim!");
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/layanan/success");
      } else {
        console.error("Gagal mengirim data.");
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
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9" onSubmit={handleSubmit}>
          <input type="hidden" name="id_layanan" value={idLayanan} />
          {/* <div className="pt-4 mb-6">
            <label className="mb-5 block text-base font-semibold text-[#07074D]">
              Upload Ktp Dan Npwp Pengurus Min 2 Orang.
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="gambar"
                id="gambar"
                className="sr-only"
                onChange={handleInputChange}
              />
              <label
                htmlFor="gambar"
                className="relative flex h-10 items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>

            <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
              <div className="flex items-center gap-4">
                <img
                  src={formData.gambarUrl}
                  alt="Gambar yang dipilih"
                  className="w-10 h-10 mb-4"
                />
                {formData.gambar ? (
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    {formData.gambar.name}
                  </span>
                ) : (
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop files here
                  </span>
                )}
              </div>
              <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                <div className="absolute left-0 right-0 h-full w-[100%] rounded-lg bg-[#6A64F1]"></div>
              </div>
            </div>
          </div> */}
          <div className="pt-4 mb-6">
            <label className="mb-5 block text-base font-semibold text-[#07074D]">
              Upload KTP Pengurus 1
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="gambar"
                id="gambar"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pt-4 mb-6">
            <label className="mb-5 block text-base font-semibold text-[#07074D]">
              Upload KTP Pengurus 2
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="gambar"
                id="gambar"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pt-4 mb-6">
            <label className="mb-5 block text-base font-semibold text-[#07074D]">
              Upload Npwp Pengurus 1
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="gambar"
                id="gambar"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pt-4 mb-6">
            <label className="mb-5 block text-base font-semibold text-[#07074D]">
              Upload Npwp Pengurus 2
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="gambar"
                id="gambar"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={handleInputChange}
              />
            </div>
          </div>
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
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              for="domisili"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nomor Yang Dapat Di Hubungi
            </label>
            <input
              type="number"
              name="nomor"
              id="domisili"
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

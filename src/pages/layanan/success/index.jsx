import Link from "next/link";

export default function index() {
  return (
    <>
      <div className="p-6 bg-white md:mx-auto">
        <div>
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 mx-auto my-6 text-green-600"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
            Pemesanan Berhasil!
          </h3>
          <p className="my-2 text-gray-600">
            Terimakasih Tim Kami Akan Segera Menghubungi Anda. Untuk Informasi
            Berkas Layanan..
          </p>
          <div className="py-10 text-center">
            <Link
              href={"/layanan"}
              className="px-4 py-3 mt-6 font-semibold text-center text-white rounded-lg w-52 bg-gradient-to-r from-lime-400 to-lime-600 hover:bg-indigo-400 focus:bg-indigo-400"
            >
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

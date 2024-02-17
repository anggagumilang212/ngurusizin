import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#A8CF45"
          fill-opacity="1"
          d="M0,128L34.3,138.7C68.6,149,137,171,206,202.7C274.3,235,343,277,411,272C480,267,549,213,617,176C685.7,139,754,117,823,122.7C891.4,128,960,160,1029,154.7C1097.1,149,1166,107,1234,106.7C1302.9,107,1371,149,1406,170.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>

      <footer className="bg-[#A8CF45]">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <p className="font-bold text-white">TENTANG KAMI</p>
              <p className="max-w-xs mt-4 text-sm text-white">
                Perusahaan yang bergerak dalam jasa pembuatan perijinan di
                seluruh Indonesia, dalam rangka mempermudah pengusaha
                mendapatkan legalitas secara resmi dari pemerintah Indonesia.
                <Link href={"/tentang"} className="text-sm text-black">
                  Lihat Selengkapnya
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-bold text-white">MENU</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <Link href={"/"} className="hover:opacity-75">
                    {" "}
                    Home{" "}
                  </Link>
                  <Link href={"/layanan"} className="hover:opacity-75">
                    {" "}
                    Layanan{" "}
                  </Link>
                  <Link href={"/tentang"} className="hover:opacity-75">
                    {" "}
                    Tentang Kami{" "}
                  </Link>
                </nav>
              </div>

              <div>
                <p className="font-bold text-white">Layanan</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pendirian PT PMA{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Perubahan PT{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Perubahan CV{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Upgrade NIB{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    SKK Jenjang 4,6,7,8,9{" "}
                  </a>
                </nav>
              </div>
              <div>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pendirian SBU-KK{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    PKP Badan Usaha{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pembuatan NPWP{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pelaporan Pajak{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    LKPM{" "}
                  </a>
                </nav>
              </div>
              <div>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pendaftaran HAKI{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pendaftaran Hak Cipta{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pembuatan Sertifikat ISO{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pembuatan IMB{" "}
                  </a>
                  <a className="hover:opacity-75" href>
                    {" "}
                    Pembuatan Sertifikat K3 & SMK3{" "}
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-100" />
          <p className="mt-8 text-xs text-center text-white">
            © 2024 Copyright by PT Grage Media Technology All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="relative py-32 -mt-5 bg-transparent lg:py-36">
      <div className="flex flex-col w-full gap-10 px-5 mx-auto lg:max-w-7xl sm:px-10 md:px-12 lg:px-28 lg:flex-row lg:gap-12">
        <div className="absolute inset-y-0 hidden w-full lg:w-1/2 lg:right-0 lg:block">
          <span className="absolute hidden w-24 h-24 rotate-90 skew-x-12 bg-green-400 -left-6 md:left-4 top-24 lg:top-28 rounded-3xl blur-xl opacity-60 lg:opacity-95 lg:block"></span>
          <span className="absolute w-24 h-24 bg-green-600 right-4 bottom-12 rounded-3xl blur-xl opacity-80"></span>
        </div>
        <span className="absolute w-4/12 rotate-90 skew-x-12 skew-y-12 rounded-full lg:w-2/12 aspect-square bg-gradient-to-tr from-[#1B1] to-green-400 -top-5 lg:left-0 blur-2xl opacity-40"></span>
        <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center lg:text-left lg:py-7 xl:py-8 lg:items-start lg:max-w-none lg:mx-0 lg:flex-1 lg:w-1/2">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Jasa Pengurusan
            <span className="block text-transparent mb-2  bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
              Legalitas Usaha
            </span>
            Mudah & Anti Ribet
          </h1>
          <p className="mt-8 font-medium text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
            ijin jalan,usaha nyaman...
          </p>

          <div className="flex flex-wrap items-center gap-2 S">
            <Link
              href={"/layanan"}
              type="submit"
              className="block px-4 py-3 mt-6 font-semibold text-white rounded-lg bg-gradient-to-r from-lime-400 to-lime-600 hover:bg-indigo-400 focus:bg-indigo-400"
            >
              Lihat Layanan
            </Link>
            <Link href={""}>
              <Image
                src="/images/instagram.svg"
                alt="Instagram"
                width={20}
                height={10}
                className="mt-5 lg:w-7"
              />
            </Link>
            <Link href={""}>
              <Image
                src="/images/whatsapp.svg"
                alt="Whatsapp"
                width={20}
                height={10}
                className="mt-5 lg:w-7"
              />
            </Link>
            <Link href={""}>
              <Image
                src="/images/tiktok.svg"
                alt="tiktok"
                width={20}
                height={10}
                className="mt-5 lg:w-7"
              />
            </Link>
            <Link href={""}>
              <Image
                src="/images/youtube.svg"
                alt="youtobe"
                width={20}
                height={10}
                className="mt-5 lg:w-7"
              />
            </Link>
          </div>
        </div>
        <div className="relative flex flex-1 max-w-3xl mx-auto lg:w-1/2 lg:h-auto lg:max-w-none lg:mx-0">
          <Image
            src="/images/hero.png"
            alt="Hero"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="mt-1 custom-shape-divider-bottom-1707274268">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="#A8CF45"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="bg-[#A8CF45] max-h-screen px-5 lg:px-28">
        <h1 className="mb-1 text-xl font-bold text-center text-white">
          Mengapa Memilih Kami Sebagai Jasa Pengurusan Legalitas Usaha Anda?
        </h1>
        <p className="mb-5 font-normal text-center text-white">
          Dari berbagai jasa pengurusan legalitas perusahaan, PT. Business Legal
          Solution unggul dengan pengalaman dalam pembuatan dokumen, termasuk
          pendirian PT/CV dan izin operasional untuk berbagai perusahaan.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-32 px-5 py-5 mb-5 text-center bg-white lg:w-40 rounded-xl">
            <Image
              src="/images/deadline.svg"
              alt="Deadline"
              width={60}
              height={80}
              className="mx-auto"
            />
            <p className="mt-1 font-bold text-center">CEPAT</p>
          </div>
          <div className="w-32 px-5 py-5 mb-5 text-center bg-white lg:w-40 rounded-xl">
            <Image
              src="/images/ok.svg"
              alt="Deadline"
              width={50}
              height={30}
              className="mx-auto"
            />
            <p className="mt-1 font-bold text-center">MUDAH</p>
          </div>
          <div className="w-32 px-5 py-5 mb-5 text-center bg-white lg:w-40 rounded-xl">
            <Image
              src="/images/losses.svg"
              alt="Deadline"
              width={50}
              height={30}
              className="mx-auto"
            />
            <p className="mt-1 font-bold text-center">MURAH</p>
          </div>
          <div className="w-32 px-5 py-5 mb-5 text-center bg-white lg:w-40 rounded-xl">
            <Image
              src="/images/qualification.svg"
              alt="Deadline"
              width={50}
              height={30}
              className="mx-auto"
            />
            <p className="mt-1 text-sm font-bold text-center">PROFESIONAL</p>
          </div>
        </div>
        {/* <div className="mt-11">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="#A8CF45"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div> */}
      </div>
    </section>
  );
}

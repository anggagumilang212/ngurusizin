import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Register() {
  return (
    <section className="flex flex-col items-center mx-auto md:flex-row lg:px-28">
      <div className="hidden lg:block md:w-1/2 xl:w-2/3">
        <Image
          src="/images/login.svg"
          alt=""
          width={100}
          height={100}
          className="mt-10 w-96 ml-28"
        />
      </div>

      <div className="flex items-center justify-center w-full px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-full h-100">
          <h1 className="mt-12 text-2xl font-extrabold leading-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
            Pusat Daftar Akun
          </h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block font-bold text-gray-700">Nama</label>
              <input
                type="text"
                name=""
                id=""
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Kontak</label>
              <input
                type="number"
                name=""
                id=""
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Email</label>
              <input
                type="email"
                name=""
                id=""
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-bold text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
                minlength="6"
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white rounded-lg bg-gradient-to-r from-lime-400 to-lime-600 hover:bg-indigo-400 focus:bg-indigo-400"
            >
              Daftar
            </button>
          </form>
          <hr class="my-6 border-gray-300 w-full" />

          <p class="mt-0">
            Sudah Punya Akun?
            <Link
              href={"/auth/login"}
              class="text-blue-500 hover:text-blue-700 font-semibold ml-1"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

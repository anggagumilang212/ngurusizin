import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false); // State untuk melacak apakah formulir sudah dikirimkan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Menandai bahwa formulir sudah dikirimkan

    if (!email) return; // Jika email tidak diisi, jangan melanjutkan pengiriman formulir
    if (!password) return; // Jika password tidak diisi, jangan melanjutkan pengiriman formulir

    try {
      const response = await axios.post(
        "https://api.ngurusizin.online/api/auth/login",
        {
          email,
          password,
        }
      );

      // Simpan token JWT di dalam cookie dengan nama 'token'
      setCookie("token", response.data.token, { path: "/" });

      // Redirect ke halaman admin/dashboard
      router.push("/admin/order");
    } catch (error) {
      console.error("Login error:", error);
      // setError("Email atau password salah.");
      showToastMessage();
    }
  };
  const showToastMessage = () => {
    toast.error("Email atau password salah !", {
      position: "top-right",
    });
  };
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
            Selamat Datang
          </h1>
          <ToastContainer />
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
              />
            </div>
            {submitted && !email && (
              <p className="text-sm font-semibold text-red-500">
                Email wajib diisi !
              </p>
            )}
            <div className="mt-4">
              <label className="block font-bold text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            {submitted && !password && (
              <p className="text-sm font-semibold text-red-500">
                Passoword wajib diisi !
              </p>
            )}
            {/* <div className="mt-2 text-right">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div> */}

            <button
              type="submit"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white rounded-lg bg-gradient-to-r from-lime-400 to-lime-600 hover:bg-indigo-400 focus:bg-indigo-400"
            >
              Masuk
            </button>
          </form>
          <hr class="my-6 border-gray-300 w-full" />

          {/* <p class="mt-0">
            Belum Punya Akun?
            <Link
              href={"/auth/register"}
              class="text-blue-500 hover:text-blue-700 font-semibold ml-1"
            >
              Daftar
            </Link>
          </p> */}
        </div>
      </div>
    </section>
  );
}

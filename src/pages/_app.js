import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import "@/styles/tailwind.css";
import Head from "next/head";
import ButtonWa from "@/components/elements/ButtonWa";
export default function App({ Component, pageProps, router }) {
  const isInsideAdmin = router.pathname.startsWith("/admin");

  if (isInsideAdmin) {
    // Jika berada di dalam folder admin, kembalikan null
    return <Component {...pageProps} />;
  }

  // Jika tidak berada di dalam folder admin, tampilkan Navbar dan Footer
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Ngurus Izin</title>
      </Head>
      <NextTopLoader color="#A8CF45" />
      <Navbar />
      <Component {...pageProps} />
      <ButtonWa/>
      <Footer />
    </div>
  );
}

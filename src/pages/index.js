import Hero from "@/components/Hero";
import Pengurusan from "@/components/Pengurusan";
import Layanan from "@/components/Layanan";
import Rating from "@/components/Rating";
import Testimoni from "@/components/Testimoni";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Hero />
      <Pengurusan />
      <Layanan />
      <Rating />
      <Testimoni />
    </>
  );
}

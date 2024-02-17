import React from "react";

export default function Pengurusan() {
  const PengurusanList = [
    {
      id: 1,
      title: "KONSULTASI GRATIS",
    },
    {
      id: 2,
      title: "PENGUMPULAN DATA",
    },
    {
      id: 3,
      title: "LAYANAN DI PROSES",
    },
  ];
  return (
    <>
      <div className="-mt-28 ">
        <h1 className="font-extrabold lg:text-3xl text:xl text-center text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
          Cara Izinaja.id Membantu Pengurusan
          <span className="block"> Pendirian CV atau PT Anda</span>
        </h1>
      </div>

      <div className="flex flex-col lg:px-28">
        <div className="grid grid-cols-1 gap-4 mx-auto mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {PengurusanList.map((item) => (
            <div
              className="flex items-center p-4 bg-[#A8CF45] shadow-lg rounded-xl"
              key={item.id}
            >
              <div className="flex items-center justify-center w-12 h-12 border border-blue-100 rounded-full bg-blue-50">
                <h2 className="text-3xl font-bold text-black">{item.id}</h2>
              </div>

              <div className="ml-4">
                <h2 className="font-bold text-white">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

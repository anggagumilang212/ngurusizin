import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimoni = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const testimonialData = [
    {
      id: 1,
      image: "/images/example.jpg",
      quote:
        "Et, dignissimos obcaecati. Recusandae praesentium doloribus vitae? Rem unde atque mollitia!",
      author: "Leroy Jenkins",
      position: "CEO of Company Co.",
    },
    {
      id: 2,
      image: "/images/example.jpg",
      quote:
        "Et, dignissimos obcaecati. Recusandae praesentium doloribus vitae? Rem unde atque mollitia!",
      author: "Leroy Jenkins",
      position: "CEO of Company Co.",
    },
  ];

  return (
    <div
      className="slider"
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <h1 className="font-extrabold text:3xl  lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
        Testimoni
      </h1>
      <Slider {...settings}>
        {testimonialData.map((item) => (
          <section className="p-6" key={item.id}>
            <div className="container max-w-xl mx-auto">
              <div className="flex flex-col items-center w-full p-6 space-y-8 text-gray-900 bg-white rounded-md lg:h-full lg:p-8">
                <Image
                  src={item.image}
                  alt=""
                  className="w-20 h-20 bg-gray-500 rounded-full"
                  width={100}
                  height={100}
                />
                <blockquote className="max-w-lg text-lg italic font-medium text-center">
                  {item.quote}
                </blockquote>
                <div className="text-center text-gray-900">
                  <p>{item.author}</p>
                  <p>{item.position}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    aria-label="Page 1"
                    className="w-2 h-2 rounded-full bg-gray-50"
                  ></button>
                  <button
                    type="button"
                    aria-label="Page 2"
                    className="w-2 h-2 bg-gray-600 rounded-full"
                  ></button>
                  <button
                    type="button"
                    aria-label="Page 3"
                    className="w-2 h-2 bg-gray-600 rounded-full"
                  ></button>
                  <button
                    type="button"
                    aria-label="Page 4"
                    className="w-2 h-2 bg-gray-600 rounded-full"
                  ></button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </div>
  );
};

export default Testimoni;

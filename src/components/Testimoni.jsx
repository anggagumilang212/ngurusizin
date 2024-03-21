import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const [testimoniData, setTestimoniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.ngurusizin.online/api/testimoni");
        if (response.data && response.data.data.data) {
          setTestimoniData(response.data.data.data);
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Error fetching data testimoni:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('testimoni', testimoniData);
  console.log('testimoni coba', testimonialData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="slider">
      <h1 className="font-extrabold text-3xl lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-[#1B1B1B] from-20% via-[#1D1D1D] via-20% to-[#A8CF45]">
        Testimoni
      </h1>
      <Slider {...settings}>
        {testimoniData.map((item, index) => (
          <div key={index}>
            <section className="p-6">
              <div className="container max-w-xl mx-auto">
                <div className="flex flex-col items-center w-full p-6 space-y-8 text-gray-900 bg-white rounded-md lg:h-full lg:p-8">
                  <img
                    src={item.attributes.urlGambar}
                    alt="gambar"
                    className="w-20 h-20 bg-gray-500 rounded-full"
                    width={100}
                    height={100}
                  />
                  <blockquote className="max-w-lg text-lg italic font-medium text-center">
                    {item.attributes.testimoni}
                  </blockquote>
                  <div className="text-center text-gray-900">
                    <p>{item.attributes.nama}</p>
                    <p>{item.attributes.jabatan}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimoni;

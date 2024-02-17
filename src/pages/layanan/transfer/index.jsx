import React from "react";
import Image from "next/image";
export default function Transfer() {
  return (
    <>
      <div className="bg-blue-50">
        <div className="m-4">
          <div className="w-full mx-auto bg-white shadow-lg credit-card sm:w-auto rounded-xl">
            <header className="flex flex-col items-center justify-center">
              <div className="relative">
                {/* <Image
                  className="w-full h-auto"
                  src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png"
                  alt="front credit card"
                /> */}
                <div className="absolute left-0 w-full px-12 text-lg text-white bg-transparent front bottom-12">
                  <p className="mb-5 number sm:text-xl"></p>
                  <div className="flex flex-row justify-between">
                    <p x-text="cardholder !== '' ? cardholder : 'Card holder'"></p>
                    <div className="">
                      <span x-text="expired.month"></span>
                      <span x-show="expired.month !== ''">/</span>
                      <span x-text="expired.year"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* <Image
                  className="w-full h-auto"
                  src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-back.png"
                  alt=""
                /> */}
                <div className="absolute right-0 flex justify-end w-full px-8 text-xl text-white bg-transparent bottom-20 sm:bottom-24 sm:px-12">
                  <div className="flex items-center justify-center w-16 border border-white h-9">
                    <p x-text="securityCode !== '' ? securityCode : 'code'"></p>
                  </div>
                </div>
              </div>
              <ul className="flex">
                <li className="mx-2">
                  {/* <Image
                    className="w-16"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                    alt=""
                  /> */}
                </li>
                <li className="mx-2">
                  {/* <Image
                    className="w-14"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                    alt=""
                  /> */}
                </li>
                <li className="ml-5">
                  {/* <Image
                    className="w-7"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                    alt=""
                  /> */}
                </li>
              </ul>
            </header>
            <main className="p-4 mt-4">
              <h1 className="text-xl font-semibold text-center text-gray-700">
                Card payment
              </h1>
              <div className="">
                <div className="my-3">
                  <input
                    type="text"
                    className="block w-full px-5 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg shadow-lg focus:ring focus:outline-none"
                    placeholder="Card holder"
                    maxlength="22"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    className="block w-full px-5 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg shadow-lg focus:ring focus:outline-none"
                    placeholder="Card number"
                    maxlength="19"
                  />
                </div>
                <div className="flex flex-col my-3">
                  <div className="mb-2">
                    <label for="" className="text-gray-700">
                      Expired
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <select
                      name=""
                      id=""
                      className="block w-full px-5 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg shadow-lg appearance-none form-select focus:ring focus:outline-none"
                      x-model="expired.month"
                    >
                      <option value="" selected disabled>
                        MM
                      </option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <select
                      name=""
                      id=""
                      className="block w-full px-5 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg shadow-lg appearance-none form-select focus:ring focus:outline-none"
                      x-model="expired.year"
                    >
                      <option value="" selected disabled>
                        YY
                      </option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                    <input
                      type="text"
                      className="block w-full col-span-2 px-5 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg shadow-lg focus:ring focus:outline-none"
                      placeholder="Security code"
                      maxlength="3"
                    />
                  </div>
                </div>
              </div>
            </main>
            <footer className="p-4 mt-6">
              <button className="w-full px-4 py-3 text-xl font-semibold text-blue-900 transition-colors bg-blue-300 rounded-full submit-button focus:ring focus:outline-none">
                Pay now
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

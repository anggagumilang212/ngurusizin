import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container px-4 mx-auto">
          <hr className="mb-4 border-blue-200 border-b-1" />
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full text-center">
              <div className="py-1 text-sm font-semibold text-center text-blueGray-500 md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=nnjs-footer-admin"
                  className="py-1 text-sm font-semibold text-blueGray-500 hover:text-blueGray-700"
                >
                  PT. Grage Media Technology
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

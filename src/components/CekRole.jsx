import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const CekRole = () => {
  const [cookies] = useCookies(["token"]);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDataRole = async () => {
      const token = cookies.token;

      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        const response = await axios.get(
          "https://api.ngurusizin.online/api/auth/cekToken/",
          config
        );

        if (response.status === 200) {
          console.log("cekRole", response.data.role);
          setRole(response.data.role);
        } else {
          // console.error(response);
        }
      } catch (error) {
        // console.error(error);
        // error karena ngambil dari JWT lain
        if (error.response.data.error != null) {
          router.push("/auth/login");
        }
      }
    };

    fetchDataRole();
  }, [cookies.token, router]);

  return role;
};

export default CekRole;

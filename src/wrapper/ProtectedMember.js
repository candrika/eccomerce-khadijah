import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ProtectedMember() {
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState([]);
  const navigate = useNavigate(); // This hook allows you to programmatically navigate

  const fetchUserLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserLogin(response.data.data);
      console.log("response", response);
      console.log("cobaaaaaa");

      setLoading(false);
    } catch (error) {
      console.log(error.response.status);

      if (error.response && error.response.status === 401) {
        navigate("/login"); // Redirect to login page if unauthenticated
      }
    }
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  // Here, you can render your protected route content
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render your protected route content here */}
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default ProtectedMember;

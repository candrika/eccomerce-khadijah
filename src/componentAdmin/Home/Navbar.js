import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import burger from "../../assets_admin/menu.png";
import profile1 from "../../asset_sidebar/user.png";
import logout from "../../asset_sidebar/logout.png";
import { Coba1, Coba11 } from "../../components/reusableComponents/Text";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import home from "../../assets_admin/home-button.png";

const Navbar = () => {
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  const { open, setOpen } = useContext(GlobalContext);
  const [hide, setHide] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userLogin, setUserLogin] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
          "https://laravel-api-10.cerise.id/api/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
      setUserLogin(response.data.data);
      // console.log("respon", response);

      setLoading(false);
    } catch (error) {
      // console.log(error.response.status);
    }
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  const onLogout = async () => {
    try {
      const response = axios.post(
          "https://laravel-api-10.cerise.id/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
    } catch (error) {
      alert(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
      localStorage.removeItem("email");
      setProfile(false);
      alert("Berhasil Logout");
      navigate("/login-admin");
    }
  };

  const onLogoutMember = async () => {
    try {
      const response = axios.post(
          "https://laravel-api-10.cerise.id/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
    } catch (error) {
      alert(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
      localStorage.removeItem("email");
      setProfile(false);
      alert("Berhasil Logout");
      navigate("/login");
    }
  };

  return (
      <div>
        <div
            className={`${
                open ? "w-[100%]   bg-white " : "bg-white"
            } border-b-[1px] flex justify-between items-center h-[50px]  `}
        >
          <div
              className={`${
                  open ? " pl-[22px]  w-[260px] text-left " : "hidden"
              } "flex   "`}
          >
            <Coba1 text="Khadijah" />
          </div>
          <div
              className={`${
                  open
                      ? "w-[55%]  md:w-[70%] duration-300 ease-in-out "
                      : "w-[70%] md:w-[95%] pl-[10px]"
              } "   flex justify-start duration-300 ease-in-out  "`}
          >
            <button onClick={() => setOpen(!open)}>
              <img
                  src={burger}
                  alt=""
                  className={`${
                      open ? "w-[20px] mx-2" : "w-[20px]"
                  } "border border-blue-500"`}
              />
            </button>
          </div>
          <div className="px-3 w-[15%] md:w-[15%] ">
            <button onClick={() => setHide(!hide)}>
              <img src={profile1} alt="profile" className="w-[30px]" />
            </button>
          </div>
        </div>

        {localStorage.getItem("role_id") == 3 ? (
            <div>
              {hide ? (
                  <div>
                    <div className=" flex justify-end">
                      <div className=" md:w-[15%] w-[9.25rem]  justify-end px-4 bg-white rounded-md">
                        <Link to="/">
                          <div className="flex  my-4 flex items-center">
                            <img src={home} alt="" className="w-[40px] mt-4" />
                            <button>
                              <p className="pl-4">Home</p>
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className=" flex justify-end">
                      <div className=" md:w-[15%] w-[9.25rem]  justify-end px-4 bg-white rounded-md">
                        <div
                            className="flex  my-4 flex items-center"
                            onClick={onLogoutMember}
                        >
                          <img src={logout} alt="" className="w-[40px] mt-4" />
                          <button>
                            <p className="pl-4">Logout</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : (
                  <div></div>
              )}
            </div>
        ) : (
            <div>
              {" "}
              {hide ? (
                  <div className=" flex justify-end">
                    {userLogin.map((user, index) => (
                        <div
                            className=" w-[15%]  justify-end px-4 bg-white rounded-md"
                            key={user.id}
                        >
                          <div className="flex">
                            <Coba11 text="Hallo  " />
                            <p className="pl-2">{user.name}</p>
                          </div>
                          <div className="flex">
                            <p className="">{user.email}</p>
                          </div>

                          <div
                              className="flex border-t-2 my-4 flex items-center"
                              onClick={onLogout}
                          >
                            <img src={logout} alt="" className="w-[40px] mt-4" />
                            <button>
                              <p className="pl-4">Logout</p>
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div></div>
              )}
            </div>
        )}
      </div>
  );
};

export default Navbar;

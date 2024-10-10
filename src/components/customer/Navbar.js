import React, { useState, useContext, useEffect } from "react";
import cart_img from "../../assets/shopping-cart.png";
import logoKM from "../../assets/logo.jpeg";
import { GlobalContext } from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import Paragraph from "../reusableComponents/Paragraph";
import login from "../../assets/login2.png";
import logout_img from "../../asset_sidebar/logout.png";
import user_img from "../../asset_sidebar/user.png";
import user_setting from "../../assets/user_setting.png";
import axios from "axios";
import { BtnAdmin10 } from "../reusableComponents/ButtonAdmin";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { navbar, setNavbar } = useContext(GlobalContext);
  const [profile, setProfile] = useState(false);
  const [hide, setHide] = useState(false);
  const [user, setUser] = useState([]);
  const [errorLogin, setErrorLogin] = useState("");

  // Function to set navbar to false when the page is reloaded

  useEffect(() => {
    setNavbar(false);
  }, []);

  const fetchUser = async () => {
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
      setUser(response.data.user);
      // console.log("respon member", response.data.user);
      setLoading(false);
    } catch (error) {
      console.log("errorlogin member", error.response.status);
      setErrorLogin(error.response.status);
    }
  };
  const onLogout = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });

    if (confirmationResult.isConfirmed) {
      try {
        await axios.post(
          "https://laravel-api-10.cerise.id/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Successful logout
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        localStorage.removeItem("email");
        setProfile(false);

        await Swal.fire({
          title: "Berhasil Logout",
          text: "Anda telah berhasil keluar dari akun.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        // Redirect to the "/" route
        window.location.replace("/");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat logout.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState("0");
  const [errorCode, setError] = useState("");

  const fetchCountProduct = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/carts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const dataProduk = response.data.product.length;
      const dataBundle = response.data.bundle.length;

      setCart(dataProduk + dataBundle);

      // console.log("response cart", response.data.product.length);
      // console.log("response bundle", response.data.bundle.length);
    } catch (error) {
      console.log("error cart", error);
      // setError(error.response.status);
    }
  };
  // console.log("count Produk", cart);

  useEffect(() => {
    fetchCountProduct();
    fetchUser();
  }, []);

  console.log("first user", user.length);

  return (
    <div className="shadow-md w-full md:w-[80%] md:left-[10%] md:top-[110px] fixed md:absolute  md:left-0 z-10">
      <div className="flex  items-center justify-between  bg-white py-4 md:px-10 md:px-5  h-[100px]  ">
        <div className="md:hidden flex justify-center items-center  w-[30%]   ">
          <button
            onClick={() => setNavbar(!navbar)}
            className="z-20 relative  flex flex-col justify-center  items-center w-[40px] h-[40px] cursor-pointer bg-transparent"
          >
            <span className="w-[25px] h-[3px] bg-primary mb-[5px]"></span>
            <span className="w-[25px] h-[3px] bg-primary mb-[5px]"></span>
            <span className="w-[25px] h-[3px] bg-primary mb-[5px]"></span>
          </button>
        </div>
        <ul
          className={` text-[#00B7FE] drop-shadow-xl md:drop-shadow-none md:flex md:justify-between items-center absolute md:static bg-white md:relative w-[40%] md:w-[30%] -md:right-[20%] h-[100vh] md:h-[100px] top-0 transition-all duration-500 ease-in ${
            navbar ? "left-0" : "left-[-290px] md:left-0"
          }`}
        >
          <div>
            <li className="md:hover:underline cursor-pointer font-bold text-[2.6rem] md:text-[1rem] text-center border-[#00B7FE] md:hover:bg-transparent   hover:text-white md:hover:text-[#00B7FE] h-[70px] flex justify-center items-center border-dashed border-b  md:border-none"></li>
          </div>
          <div>
            <Link to="/">
              <li className="md:hover:underline cursor-pointer md:hover:text-[#00B7FE]  border-[#00B7FE] md:text-[1rem] hover:bg-primary md:hover:bg-transparent hover:text-white  h-[50px] lg:h-[100px] flex items-center border-dashed border-b pl-[55px] md:pl-0 md:border-none">
                Home
              </li>
            </Link>
          </div>
          <div>
            <Link to="/product">
              <li className="md:hover:underline cursor-pointer md:hover:text-[#00B7FE]  border-[#00B7FE] md:text-[1rem] hover:bg-primary md:hover:bg-transparent hover:text-white  h-[50px] lg:h-[100px] flex items-center border-dashed border-b pl-[55px] md:pl-0 md:border-none">
                Produk
              </li>
            </Link>
          </div>
          <Link to="/contact">
            <div>
              <li className="md:hover:underline cursor-pointer md:hover:text-[#00B7FE]  border-[#00B7FE] md:text-[1rem] hover:bg-primary md:hover:bg-transparent hover:text-white  h-[50px] lg:h-[100px] flex items-center border-dashed border-b pl-[55px] md:pl-0 md:border-none">
                Kontak
              </li>
            </div>
          </Link>
        </ul>
        <div className=" cursor-pointer flex item-center font-[Poppins] justify-center  w-[200px] md:h-[200px] md:rounded-full md:flex md:items-center md:bg-white">
          {/*<Paragraph text="SHOP" variant="paragraph1" />*/}
          <a href="/">
            <img src={logoKM} className="md:w-32 w-[100px] " alt="" />
          </a>
        </div>
        <div className="mr-4 md:mr-0 md:w-[30%] flex md:justify-end justify-center items-center  gap-4    ">
          <div className="flex  ">
            {user.length === 0 ? (
              <Link to="/login">
                <button>
                  <img
                    src={cart_img}
                    alt=""
                    className="md:w-[50px] w-[50px]   "
                  />
                </button>
              </Link>
            ) : (
              <Link to="/list-cart">
                <button>
                  <img
                    src={cart_img}
                    alt=""
                    className="md:w-[50px] w-[40px]  "
                  />
                </button>
              </Link>
            )}

            {setErrorLogin == 401 || cart == 0 ? (
              ""
            ) : (
              <div className="bg-red-500 text-white w-[25px] h-[25px] rounded-full relative -top-[10px] -left-2">
                <p>{cart}</p>
              </div>
            )}
          </div>

          {localStorage.getItem("token") == null ? (
            <Link to="/login">
              <BtnAdmin10 text="Login" />
            </Link>
          ) : (
            <button onClick={() => setHide(!hide)}>
              <img src={user_img} alt="" className="md:w-[50px] w-[40px] " />
            </button>
          )}
        </div>
      </div>
      {hide ? (
        <div className=" flex justify-end">
          {errorLogin == 401 ? (
            <div className=" w-[20%] bg-white p-8">
              <Link to="/login">
                <div className="flex">
                  <img src={logout_img} alt="" className="w-[35px] h-[35px]" />
                  <p className="p-2">Login</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className=" md:w-[20%] bg-white p-8">
              <p className="text-left">Hallo {user.name} </p>
              <Link to="/member/member-view">
                <div className="flex">
                  <img
                    // src={user.image}
                    src={user_setting}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full"
                  />

                  <p className="p-2">User Setting</p>
                </div>
              </Link>
              <div className="flex" onClick={onLogout}>
                <img src={logout_img} alt="" className="w-[35px] h-[35px]" />
                <p className="p-2">Logout</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Navbar;

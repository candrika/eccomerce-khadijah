import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba2, Coba1 } from "../../components/reusableComponents/Text";
import logo from "../../assets/login.png";
import { FaTachometerAlt, FaRegSun } from "react-icons/fa";
import channel from "../../assets_admin/channel.png";
import contact from "../../assets_admin/contact-us.png";
import courier from "../../assets_admin/courier.png";
import kupon from "../../assets_admin/kupon.png";
import setting from "../../assets_admin/settings.png";
import new_order from "../../assets_admin/new-order.png";
import order2 from "../../assets_admin/order.png";
import produk_img from "../../assets_admin/product.png";
import gudang from "../../assets_admin/warehouse.png";
import lokasi from "../../assets_admin/location.png";
import user from "../../assets_admin/customer.png";
import category_img from "../../assets_admin/category.png";
import disc from "../../assets_admin/discount.png";
import gallery from "../../assets_admin/image-gallery.png";
import item_unit from "../../assets_admin/shopping-bag.png";
import dashboard from "../../assets_admin/dashboard.png";

const SidebarAdmin = () => {
  const { open, setOpen } = useContext(GlobalContext);
  // untuk hide / show submenu
  const [report, setReport] = useState(true);
  const [submenu, setSubmenu] = useState(true);
  const [order, setOrder] = useState(true);
  const [produk, setProduk] = useState(true);
  const [bundle, setBundle] = useState(true);
  const [mUser, setMUser] = useState(true);
  const [address, setAddress] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    localStorage.setItem("activeItem", itemName); // Save the selected item in localStorage
    // console.log("first", activeItem);
  };

  useEffect(() => {
    // When the component mounts, check if there's an active item in localStorage
    const storedItem = localStorage.getItem("activeItem");
    setActiveItem(storedItem);
  }, []);

  // console.log("3", activeItem);

  // saat menu di klik
  const [click, setClick] = useState(false);
  return (
    <div>
      <div className="">
        {/* DASHBOARD */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          ></div>

          <div className="opacity-100">
            <Link to="/admin">
              <div
                onClick={() => handleItemClick("dashboard")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "dashboard"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={dashboard} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Dashboard" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* REPORT */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="REPORT" />
            <div>
              <button onClick={() => setReport(!report)} className="text-dark">
                {report ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              report ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/admin/reportPenjualan">
              <div
                onClick={() => handleItemClick("report")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "report" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={order2} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Top Member" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div
            className={`${
              report ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/admin/reportPenjualan/Perhari">
              <div
                onClick={() => handleItemClick("reportPenjualan")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "reportPenjualan"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={order2} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Penjualan" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* SETTING GENERAL */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="SETTING GENERAL" />
            <div>
              <button
                onClick={() => setSubmenu(!submenu)}
                className="text-dark"
              >
                {submenu ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              submenu ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/admin/setting-general">
              <div
                onClick={() => handleItemClick("setting-general")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "setting-general"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={setting} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Setting General" />
                  </div>
                </div>
              </div>
            </Link>
            {/* <Link to="/admin/banner">
              <div
                onClick={() => handleItemClick("banner")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "banner" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <FaRegSun color="rgb(8 47 73)" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Banner" />
                  </div>
                </div>
              </div>
            </Link> */}
            <Link to="/admin/contact">
              <div
                onClick={() => handleItemClick("contact")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "contact"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={contact} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Contact" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/kupon/kupon">
              <div
                onClick={() => handleItemClick("kupon")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "kupon" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={kupon} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Kupon" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/settingGeneral/channel/channel">
              <div
                onClick={() => handleItemClick("channel")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "channel"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={channel} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Channel" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/settingGeneral/courier/courier">
              <div
                onClick={() => handleItemClick("courier")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "courier"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={courier} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Courier" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ORDER */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="ORDER" />
            <div>
              <button onClick={() => setOrder(!order)} className="text-dark">
                {order ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              order ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/admin/order/semuaOrder">
              <div
                onClick={() => handleItemClick("all-order")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "all-order"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={order2} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Semua Order" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/admin/order/pesananBaru">
              <div
                onClick={() => handleItemClick("new-order")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "new-order"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={new_order} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Pesanan Baru" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* BUNDLE */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="BUNDLE" />
            <div>
              <button onClick={() => setBundle(!bundle)} className="text-dark">
                {bundle ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              bundle ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/admin/bundle">
              <div
                onClick={() => handleItemClick("bundle")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "bundle" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={order2} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Bundle" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* PRODUK */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="PRODUK" />
            <div>
              <button onClick={() => setProduk(!produk)} className="text-dark">
                {produk ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              produk ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-margin duration-500 ease-in-out  "`}
          >
            <Link to="/admin/produk/category">
              <div
                onClick={() => handleItemClick("category")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "category"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={category_img} alt="" className="w-[18px]" />

                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Category" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/produk/dataProduk">
              <div
                onClick={() => handleItemClick("produk")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "produk" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={produk_img} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Daftar Produk" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/produk/diskon">
              <div
                onClick={() => handleItemClick("diskon")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "diskon" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={disc} alt="" className="w-[18px]" />

                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Diskon" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/produk/gudang">
              <div
                onClick={() => handleItemClick("gudang")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "gudang" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={gudang} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Gudang" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/produk/unitItem">
              <div
                onClick={() => handleItemClick("item")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "item" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={item_unit} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Unit Item" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* MANAGEMENT USER */}
        <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="MANAGEMENT USER" />
            <div>
              <button onClick={() => setMUser(!mUser)} className="text-dark">
                {mUser ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              mUser ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-margin duration-500 ease-in-out  "`}
          >
            <Link to="/admin/user">
              <div
                onClick={() => handleItemClick("user")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "user" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={user} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="User" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/admin/customer">
              <div
                onClick={() => handleItemClick("userCustomer")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "userCustomer"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={user} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Customer" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* MANAGEMENT ALAMAT */}
        {/* <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
          <div
            className={`${
              open ? "text-left" : "hidden"
            } " relative flex justify-between w-[100%]"`}
          >
            <Coba2 text="ALAMAt" />
            <div>
              <button
                onClick={() => setAddress(!address)}
                className="text-dark"
              >
                {address ? "-" : "+"}
              </button>
            </div>
          </div>

          <div
            className={`${
              address ? "opacity-100" : "opacity-0 relative hidden"
            } "pl-4 transition-hidden duration-500 ease-in-out"`}
          >
            <Link to="/admin/alamat/address">
              <div
                onClick={() => handleItemClick("pulau")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "pulau" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={lokasi} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Alamat" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/alamat/pulau">
              <div
                onClick={() => handleItemClick("pulau")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "pulau" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={lokasi} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Pulau" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/alamat/city">
              <div
                onClick={() => handleItemClick("city")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "city" ? "bg-gray-200 rounded-md" : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={lokasi} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="City" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/admin/alamat/provinsi">
              <div
                onClick={() => handleItemClick("provinsi")}
                className={`hover:bg-blue  hover:rounded-xl flex items-center  justify-between gap-[10px] py-[15px] cursor-pointer ${
                  activeItem == "provinsi"
                    ? "bg-gray-200 rounded-md"
                    : "bg-white"
                } `}
              >
                <div
                  className={`${
                    open ? "pl-2 flex items-center gap-[10px]" : "pl-0"
                  }`}
                >
                  <img src={lokasi} alt="" className="w-[18px]" />
                  <div
                    className={`${
                      open ? "pl-4" : " hidden "
                    } "pl-4 transition-display duration-100 ease-in-out"`}
                  >
                    <Coba2 text="Provinsi" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SidebarAdmin;

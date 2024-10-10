import { createContext, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();
// komponen provider
export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const initialData2 = [
    { id: 1, name: "Alamat Pengiriman", status: false },
    { id: 2, name: "Nomor Rekening", status: false },
    { id: 3, name: "Ekspedisi", status: false },
    { id: 4, name: "Kolom Berat", status: false },
  ];

  const initialData = [
    { id: 1, name: "List Produk", status: false },
    { id: 2, name: "Logo Ekspedisi", status: false },
    { id: 3, name: "Logo Toko", status: false },
    { id: 4, name: "Berat", status: false },
  ];

  // const initialData3 = { id: 1, name: "Coba Dashboard", status: false };
  // report
  const [report, setReport] = useState("");
  const [report2, setReport2] = useState("");
  const [invoice, setInvoice] = useState([]);

  const [sunday, setSunday] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  // end report
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [gudang, setGudang] = useState([]);
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [disc, setDisc] = useState([]);
  const [user, setUser] = useState([]);
  const [memberAdm, setMemberAdm] = useState([]);
  const [kupon, setKupon] = useState([]);
  const [channel, setChannel] = useState([]);
  const [courier, setCourier] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contact, setContact] = useState([]);
  const [banners, setBanners] = useState([]);
  const [userLogin, setUserLogin] = useState([]);
  const [bundle, setBundle] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState([]);
  const [printOrder, setPrintOrder] = useState([]);
  const [printA6, setPrintA6] = useState(initialData);
  const [printInvoice, setPrintInvoice] = useState(initialData2);

  // user member login ini
  const [userMember, setUserMember] = useState([]);
  const [cart, setCart] = useState("0");
  const [calculate, setCalculate] = useState("");
  const [detailCalculateProduct, setDetailCalculateProduct] = useState([]);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isModalAddAddressOpen, setIsModalAddAddressOpen] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/reports",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReport(response.data.data);
      // console.log("respon reportnya kaka", response);

      // Calculate the sum of order_count for "Sunday"
      const sumSunday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Sunday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumMonday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Monday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumTuesday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Tuesday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumThursday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Thursday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumFriday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Friday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );
      const sumSaturday = response.data.data.graphWeek.data.reduce(
        (total, item) => {
          if (item.day_name.toLowerCase() === "Saturday") {
            return total + item.order_count;
          }
          return total;
        },
        0
      );

      setSunday(sumSunday);
      setMonday(sumMonday);
      setTuesday(sumTuesday);
      setThursday(sumThursday);
      setFriday(sumFriday);
      setSaturday(sumSaturday);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/user/all-admin",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data.data);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchMemberAdm = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/user/all-member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMemberAdm(response.data.data);
      // console.log("respon member", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchReport2 = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/reports",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReport2(response.data.data.belumBayar);
      // console.log("respon report versi 2 ", response.data.data.belumBayar);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchDiscount = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/discounts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDisc(response.data.status);
      // console.log("respon", response.data.status);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProduct(response.data.success);
      // console.log(response.data.success);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchGudang = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/warehouses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGudang(response.data.status);
      // console.log("respon gudang", response.data.status);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/categories",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategory(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/item_units",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setItem(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchKupon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/coupons",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setKupon(response.data.status);
      // console.log("respon kupon", response);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchChannel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/sales-channels",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setChannel(response.data.data);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchCourier = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/couriers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCourier(response.data.data);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/contact",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setContact([response.data.data]);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/products/galleries/create",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGallery(response);
      // console.log("respon", response);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals/banners",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGallery(response);
      // console.log("respon", response);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

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
      if (401 === error.response.status) {
        alert("Anda Belum Login");
      } else {
        return Promise.reject(error);
      }

      // console.log("responss");
    }
  };

  const fetchBundle = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/bundles",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBundle(response.data.data);
      // console.log("respon", response.data.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchUserMember = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.user;
      const dataAddress = response.data.allAddress;
      setUserMember([data]);

      // console.log("user");
    } catch (error) {
      // console.log("error cart", error.response.status);
    }
  };

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
      // console.log("error cart", error);
      // setError(error.response.status);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        invoice: invoice,
        setInvoice: setInvoice,
        navbar: navbar,
        setNavbar: setNavbar,
        open: open,
        setOpen: setOpen,
        product: product,
        report: report,
        setReport: setReport,
        fetchReport: fetchReport,
        report2: report2,
        setReport2: setReport2,
        fetchReport2: fetchReport2,
        setProduct: setProduct,
        fetchProduct: fetchProduct,
        gudang: gudang,
        setGudang: setGudang,
        fetchGudang: fetchGudang,
        category: category,
        setCategory: setCategory,
        fetchCategory: fetchCategory,
        item: item,
        setItem: setItem,
        fetchItem: fetchItem,
        fetchDiscount: fetchDiscount,
        disc: disc,
        user: user,
        setUser: setUser,
        fetchUser: fetchUser,
        memberAdm: memberAdm,
        fetchMemberAdm: fetchMemberAdm,
        setMemberAdm: setMemberAdm,
        kupon: kupon,
        setKupon: setKupon,
        fetchKupon: fetchKupon,
        channel: channel,
        setChannel: setChannel,
        fetchChannel: fetchChannel,
        courier: courier,
        setCourier: setCourier,
        fetchCourier: fetchCourier,
        gallery: gallery,
        setGallery: setGallery,
        fetchGallery: fetchGallery,
        contact: contact,
        setContact: setContact,
        fetchContact: fetchContact,
        fetchBanner: fetchBanner,
        banners: banners,
        setBanners: setBanners,
        userLogin: userLogin,
        setUserLogin: setUserLogin,
        fetchUserLogin: fetchUserLogin,
        fetchBundle: fetchBundle,
        bundle: bundle,
        setBundle: setBundle,
        selectedProducts: selectedProducts,
        selectedBundle: selectedBundle,
        setSelectedProducts: setSelectedProducts,
        setSelectedBundle: setSelectedBundle,
        isModalOpen: isModalOpen,
        isModalAddressOpen: isModalAddressOpen,
        isModalAddAddressOpen: isModalAddAddressOpen,
        setIsModalOpen: setIsModalOpen,
        setIsModalAddressOpen: setIsModalAddressOpen,
        setIsModalAddAddressOpen: setIsModalAddAddressOpen,
        fetchUserMember: fetchUserMember,
        setUserMember: setUserMember,
        userMember: userMember,
        fetchCountProduct: fetchCountProduct,
        setCart: setCart,
        cart: cart,
        calculate: calculate,
        setCalculate: setCalculate,
        detailCalculateProduct: detailCalculateProduct,
        setDetailCalculateProduct: setDetailCalculateProduct,
        printOrder: printOrder,
        setPrintOrder: setPrintOrder,
        printA6: printA6,
        setPrintA6: setPrintA6,
        printInvoice: printInvoice,
        setPrintInvoice: setPrintInvoice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

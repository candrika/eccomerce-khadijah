import "./App.css";
import Home from "./views/customer/Home";
import HomeAdmin from "./views/Admin/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewProduct from "./views/ViewProduct";
import Login from "./Authentication/Login";
import DetailProduct from "./views/customer/DetailProduct";
import ContactView from "./views/customer/ContactView";
import Example from "./components/reusableComponents/Example";
import PesananBaruView from "./views/Admin/order/PesananBaruView";
import SemuaOrderView from "./views/Admin/order/SemuaOrderView";
import CustomerView from "./views/Admin/datacustomer/CustomerView";
import ProdukView from "./views/Admin/dataproduk/ProdukView";
import AddCustomerView from "./views/Admin/datacustomer/AddCustomerView";
import GudangView from "./views/Admin/dataproduk/GudangView";
import AddProdukView from "./views/Admin/dataproduk/AddProdukView";
import AddGudangView from "./views/Admin/dataproduk/AddGudangView";
import CategoryView from "./views/Admin/dataproduk/CategoryView";
import DiskonView from "./views/Admin/dataproduk/DiskonView";
import UnitItemView from "./views/Admin/dataproduk/UnitItemView";
import KuponView from "./views/Admin/kupon/KuponView";
import AddCategoryView from "./views/Admin/dataproduk/AddCategoryView";
import EditCategoryView from "./views/Admin/dataproduk/EditCategoryView";
import AddUnitItemView from "./views/Admin/dataproduk/AddUnitItemView";
import EditItemView from "./views/Admin/dataproduk/EditItemView";
import EditGudangView from "./views/Admin/dataproduk/EditGudangView";
import AddDiskonView from "./views/Admin/dataproduk/AddDiskonView";
import EditDiskonView from "./views/Admin/dataproduk/EditDiskonView";
import EditProductView from "./views/Admin/dataproduk/EditProductView";
import UserView from "./views/Admin/user/UserView";
import UserDetailView from "./views/Admin/user/UserDetailView";
import AddUserView from "./views/Admin/user/AddUserView";
import EditUserView from "./views/Admin/user/EditUserView";
import PulauView from "./views/Admin/alamat/PulauView";
import CityView from "./views/Admin/alamat/CityView";
import ProvinsiView from "./views/Admin/alamat/ProvinsiView";
import AddKuponView from "./views/Admin/kupon/AddKuponView";
import EditKuponView from "./views/Admin/kupon/EditKuponView";
import ChannelView from "./views/Admin/channel/ChannelView";
import AddChannelView from "./views/Admin/channel/AddChannelView";
import EditChannelView from "./views/Admin/channel/EditChannelView";
import EditCourierView from "./views/Admin/courier/EditCourierView";
import AddCourierView from "./views/Admin/courier/AddCourierView";
import CourierView from "./views/Admin/courier/CourierView";
import AddGalleryView from "./views/Admin/gallery/AddGalleryView";
import GalleryView from "./views/Admin/gallery/GalleryView";
import EditContactView from "./views/Admin/contact/EditContactView";
import ContactAdminView from "./views/Admin/contact/ContactAdminView";
import BannerView from "./views/Admin/banner/BannerView";
import EditBannerView from "./views/Admin/banner/EditBannerView";
import AddBannerView from "./views/Admin/banner/AddBannerView";
import GeneralSetting from "./views/Admin/GeneralSetting/GeneralSetting";
import LoginAdmin from "./Authentication/LoginAdmin";
import UserSettingView from "./views/customer/UserSettingView";
import DataMemberView from "./views/AdminMember/DataMemberView";
import AddAddressView from "./views/AdminMember/AddAddressView";
import EditAddressView from "./views/AdminMember/EditAddressView";
import MemberSettingView from "./views/AdminMember/MemberSettingView";
import DetailMemberView from "./views/AdminMember/DetailMemberView";
import DetailProdukView from "./views/Admin/dataproduk/DetailProdukView";
import GuestRoute from "./wrapper/GuestRoute";
import ProtectedAdmin from "./wrapper/ProtectedAdmin";
import BundleView from "./views/Admin/bundle/BundleView";
import ProtectedRoute from "./wrapper/ProtectedRoute";
import AddBundleView from "./views/Admin/bundle/AddBundleView";
import EditBundleView from "./views/Admin/bundle/EditBundleView";
import AddOrderView from "./views/Admin/order/AddOrderView";
import DetailOrderView from "./views/Admin/order/DetailOrderView";
import DetailBundleView from "./views/customer/DetailBundleView";
import ListCartView from "./views/customer/ListCartView";
import CheckOutView from "./views/customer/CheckOutView";
import Invoice from "./views/invoiceReceipt/invoice";
import Receipt from "./views/invoiceReceipt/receipt";
import CardMember from "./views/cardMember/cardMember";
import PesananBaruMemberView from "./views/AdminMember/PesananBaruView";
import DetailOrderMemberView from "./views/AdminMember/DetailOrderMemberView";
import ProtectedMember from "./wrapper/ProtectedMember";
import DashboardView from "./views/AdminMember/DashboardView";
import AddAddressByAdmView from "./views/Admin/user/AddAddressByAdmView";
import EditAddressByAdmView from "./views/Admin/user/EditAddressByAdmView";
import PrintView from "./views/Admin/order/PrintOrderView";
import PrintOrderView from "./views/Admin/order/PrintOrderView";
import DashboardAdminView from "./views/Admin/Dashboard/DashboardAdminView";
import ReportView from "./views/Admin/report/ReportView";
import ReportPenjualanView from "./views/Admin/report/ReportPenjualanView";
import UpdateOrderView from "./views/Admin/order/UpdateOrderView";
import FinalPrintA6 from "./views/Admin/order/FinalPrintA6";
import CategoryMemberView from "./views/customer/CategoryMemberView";
import ProdukByCategoryView from "./views/customer/ProdukByCategoryView";
import UbahPasswordView from "./views/AdminMember/UbahPasswordView";
import Invoice2 from "./views/invoiceReceipt/Invoice2";
import UserCustView from "./views/Admin/user/UserCustView";
import NewAddressView from "./views/Admin/alamat/NewAddressView";
import EditOrderView from "./views/Admin/order/EditOrderView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<ViewProduct />} />

          <Route path="/" element={<Home />} />
          <Route path="/member-category" element={<CategoryMemberView />} />
          <Route path="/product" element={<ViewProduct />} />
          {/* <Route path="/list-cart" element={<ListCartView />} /> */}
          <Route
            path="/product-by-category/:id"
            element={<ProdukByCategoryView />}
          />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/detail-bundle/:id" element={<DetailBundleView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/example" element={<Example />} />
          <Route path="/user-setting-view" element={<UserSettingView />} />

          <Route element={<ProtectedMember />}>
            <Route path="/dashboard-member" element={<DashboardView />} />
            <Route path="/list-cart" element={<ListCartView />} />
            <Route path="/check-out" element={<CheckOutView />} />
            {/* ADMIN MEMBER  - Address Member*/}
            <Route
              path="/member/user-setting/:id"
              element={<MemberSettingView />}
            />
            <Route
              path="/member/ubah-password/:id"
              element={<UbahPasswordView />}
            />
            <Route
              path="/member/detail-member/:id"
              element={<DetailMemberView />}
            />
            <Route path="/member/member-view" element={<DataMemberView />} />
            <Route
              path="/member/add-member-address"
              element={<AddAddressView />}
            />
            <Route
              path="/member/edit-member-address/:id"
              element={<EditAddressView />}
            />
            <Route
              path="/order-detail-member/:id"
              element={<DetailOrderMemberView />}
            />

            {/* Start Route Invoice Receipt by Member */}
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/receipt" element={<Receipt />} />
            {/* End Route */}

            {/* Start Card Member */}
            <Route path="/member-card" element={<CardMember />} />
            <Route
              path="/pesanan-baru-member"
              element={<PesananBaruMemberView />}
            />
            {/* End Card Member */}

            {/* Start Route Invoice by Admin */}

            {/* End Route */}
          </Route>
        </Routes>

        <Routes>
          {/* <Route element={<GuetRoute />}> */}
          <Route path="/login-admin" element={<LoginAdmin />} />
          {/* </Route> */}

          {/* <Route element={<ProtectedAdmin />}> */}
          <Route path="/admin" element={<DashboardAdminView />} />
          <Route path="/admin/reportPenjualan" element={<ReportView />} />
          <Route
            path="/admin/reportPenjualan/Perhari"
            element={<ReportPenjualanView />}
          />
          <Route path="/admin/alamat/address" element={<NewAddressView />} />
          <Route path="/admin/alamat/pulau" element={<PulauView />} />
          <Route path="/admin/alamat/city" element={<CityView />} />
          <Route path="/admin/alamat/provinsi" element={<ProvinsiView />} />
          {/* BUNDLE */}
          <Route path="/admin/bundle" element={<BundleView />} />
          <Route path="/admin/addBundle" element={<AddBundleView />} />
          <Route path="/admin/editBundle/:id" element={<EditBundleView />} />
          {/* CONTACT */}
          <Route path="/admin/contact" element={<ContactAdminView />} />
          <Route path="/admin/EditContact" element={<EditContactView />} />
          {/* SETTING GENERAL  */}
          <Route path="/admin/setting-general" element={<GeneralSetting />} />
          {/* BANNER */}
          <Route path="/admin/banner" element={<BannerView />} />
          <Route path="/admin/addBanner" element={<AddBannerView />} />
          <Route path="/admin/editbanner" element={<EditBannerView />} />
          {/* CHANNEL */}
          <Route
            path="/admin/settingGeneral/channel/channel"
            element={<ChannelView />}
          />
          <Route
            path="/admin/settingGeneral/channel/addChannel"
            element={<AddChannelView />}
          />
          <Route
            path="/admin/settingGeneral/channel/editChannel/:id"
            element={<EditChannelView />}
          />
          {/* COURIER */}
          <Route
            path="/admin/settingGeneral/courier/courier"
            element={<CourierView />}
          />
          <Route
            path="/admin/settingGeneral/courier/AddCourier"
            element={<AddCourierView />}
          />
          <Route
            path="/admin/settingGeneral/courier/EditCourier/:id"
            element={<EditCourierView />}
          />
          {/* DATA USER */}
          <Route path="/admin/user" element={<UserView />} />
          <Route path="/admin/customer" element={<UserCustView />} />
          <Route path="/admin/user/AddUser" element={<AddUserView />} />
          <Route
            path="/admin/user/AddAddress/:id"
            element={<AddAddressByAdmView />}
          />
          <Route
            path="/admin/user/EditAddress/:id"
            element={<EditAddressByAdmView />}
          />
          <Route path="/admin/user/EditUser/:id" element={<EditUserView />} />
          <Route
            path="/admin/user/userDetail/:id"
            element={<UserDetailView />}
          />
          {/* ORDER */}
          <Route
            path="/admin/order/finalPrintOrder"
            element={<FinalPrintA6 />}
          />
          <Route path="/admin/order/printOrder" element={<PrintOrderView />} />
          <Route path="/admin/order/semuaOrder" element={<SemuaOrderView />} />
          <Route path="/admin/order/addOrder" element={<AddOrderView />} />
          <Route
            path="/admin/order/editOrder/:id"
            element={<EditOrderView />}
          />
          <Route
            path="/admin/order/pesananBaru"
            element={<PesananBaruView />}
          />
          <Route
            path="/admin/order/detailOrder/:id"
            element={<DetailOrderView />}
          />
          <Route
            path="/admin/order/updateOrder/:id"
            element={<UpdateOrderView />}
          />
          <Route path="/admin/order/invoice/:id" element={<Invoice2 />} />
          {/* CUSTOMER */}
          <Route
            path="/admin/customer/dataCustomer"
            element={<CustomerView />}
          />
          <Route
            path="/admin/customer/addDataCustomer"
            element={<AddCustomerView />}
          />
          {/* Kupon */}
          <Route path="/admin/kupon/kupon" element={<KuponView />} />
          <Route path="/admin/kupon/Addkupon" element={<AddKuponView />} />
          <Route
            path="/admin/kupon/EditKupon/:id"
            element={<EditKuponView />}
          />
          {/* Manajemen Produk */}
          <Route path="/admin/produk/category" element={<CategoryView />} />
          <Route
            path="/admin/produk/AddCategory"
            element={<AddCategoryView />}
          />
          <Route
            path="/admin/produk/EditCategory/:id"
            element={<EditCategoryView />}
          />
          <Route path="/admin/produk/dataProduk" element={<ProdukView />} />
          <Route
            path="/admin/produk/detail-produk/:id"
            element={<DetailProdukView />}
          />
          <Route
            path="/admin/produk/AddDataProduk"
            element={<AddProdukView />}
          />
          <Route
            path="/admin/produk/EditDataProduk/:id"
            element={<EditProductView />}
          />
          <Route path="/admin/produk/diskon" element={<DiskonView />} />
          <Route path="/admin/produk/addDiskon" element={<AddDiskonView />} />
          <Route
            path="/admin/produk/EditDiskon/:id"
            element={<EditDiskonView />}
          />
          <Route path="/admin/produk/gudang" element={<GudangView />} />
          <Route path="/admin/produk/Addgudang" element={<AddGudangView />} />
          <Route
            path="/admin/produk/EditGudang/:id"
            element={<EditGudangView />}
          />
          <Route path="/admin/produk/unitItem" element={<UnitItemView />} />
          <Route
            path="/admin/produk/EditUnitItem/:id"
            element={<EditItemView />}
          />
          <Route
            path="/admin/produk/AddUnitItem"
            element={<AddUnitItemView />}
          />
          <Route path="/admin/produk/EditUnitItem" element={<EditItemView />} />
          <Route path="/admin/produk/Gallery" element={<GalleryView />} />
          <Route path="/admin/produk/AddGallery" element={<AddGalleryView />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

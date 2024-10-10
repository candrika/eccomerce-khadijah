import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import DetailGallery from "../../../componentAdmin/gallery/DetailGallery";
import EditProduct from "../../../componentAdmin/produk/EditProduct";

class DetailProdukView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetailGallery: false,
        };
        this.toggleDetailGallery = this.toggleDetailGallery.bind(this);
    }

    toggleDetailGallery() {
        this.setState((prevState) => ({
            showDetailGallery: !prevState.showDetailGallery,
        }));
    }

    render() {
        const { showDetailGallery } = this.state;

        return (
            <MainLayoutAdmin>
                <HeaderAdmin header={"Detail Produk"} />
                <EditProduct />
                <div className="mt-4">
                    <div
                        className={`flex items-center justify-between cursor-pointer border rounded p-2 ${
                            showDetailGallery ? "bg-blue-200" : "bg-gray-100"
                        }`}
                        onClick={this.toggleDetailGallery}
                    >
                        <span className="font-semibold">Edit Detail Gallery</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform ${
                                showDetailGallery ? "rotate-0" : "-rotate-90"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                    {showDetailGallery && (
                        <div className="mt-2">
                            <DetailGallery />
                        </div>
                    )}
                </div>
            </MainLayoutAdmin>
        );
    }
}

export default DetailProdukView;

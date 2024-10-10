import React, {useRef, useState, useEffect} from "react";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png";
import nota from "../../assets/nota.jpg";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Barcode from 'react-barcode';


const Invoice = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState([]);
    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState([]);
    const [bundle, setBundle] = useState([]);
    const [rekening1, setRekening1] = useState("");
    const [rekening2, setRekening2] = useState("");
    const [rekening3, setRekening3] = useState("");
    const [rekening4, setRekening4] = useState("");
    const [rekening5, setRekening5] = useState("");
    const watermarkPositions = [
        {top: "5%", left: "5%"},
        {top: "5%", left: "25%"},
        {top: "5%", left: "45%"},
        {top: "5%", left: "65%"},
        {top: "5%", left: "85%"},
        {top: "25%", left: "5%"},
        {top: "25%", left: "25%"},
        {top: "25%", left: "45%"},
        {top: "25%", left: "65%"},
        {top: "25%", left: "85%"},
        {top: "45%", left: "5%"},
        {top: "45%", left: "25%"},
        {top: "45%", left: "45%"},
        {top: "45%", left: "65%"},
        {top: "45%", left: "85%"},
        {top: "65%", left: "5%"},
        {top: "65%", left: "25%"},
        {top: "65%", left: "45%"},
        {top: "65%", left: "65%"},
        {top: "65%", left: "85%"},
    ];
    const [barcodeData, setBarcodeData] = useState('');

    useEffect(() => {
        const currentUrl = window.location.href;
        setBarcodeData(currentUrl);
    }, []);

    const fetchUserById = async (event) => {
        try {
            const response = await axios.get(
                `https://laravel-api-10.cerise.id/api/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("x", response.data);
            setInput({
                name: response.data.name,
                email: response.data.email,
                role_id: response.data.role_id,
                no_wa: response.data.no_wa,
                gender: response.data.gender,
            });
            const url = response.data.image;
            const filename = url.substring(url.lastIndexOf("/") + 1);
            console.log("url", response.data.image);
            console.log("filename", filename);
        } catch (error) {
            console.log(`${error} error`);
        }
    };
    const fetchRekening = async (event) => {
        try {
            const response = await axios.get(
                `https://laravel-api-10.cerise.id/api/markets`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("rekening", response.data.setting_general.data);
            setRekening1(response.data.setting_general.data.rekening1);
            setRekening2(response.data.setting_general.data.rekening2);
            setRekening3(response.data.setting_general.data.rekening3);
            setRekening4(response.data.setting_general.data.rekening4);
            setRekening5(response.data.setting_general.data.rekening5);
        } catch (error) {
            console.log(`${error} error`);
        }
    };

    const fetchInvoice = async () => {
        try {
            const response = await axios.get(
                `https://laravel-api-10.cerise.id/api/invoiceMember/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Orders", response.data.Order);
            console.log("Products", response.data.Products);
            console.log("Bundles", response.data.Bundles);

            setBundle(response.data.Bundles);
            setProduct(response.data.Products);
            setOrder(response.data.Order);
        } catch (error) {
            console.log(`${error} error`);
        }
    };

    useEffect(() => {
        fetchUserById();
        fetchInvoice();
        fetchRekening();
    }, []);

    const watermarkElements = watermarkPositions.map((position, index) => (
        <div
            key={index}
            className="absolute pointer-events-none watermark opacity-30"
            style={{top: position.top, left: position.left, zIndex: -1 + index}}
        >
            <div className="absolute top-0 left-0 w-full h-full mt-16 -ml-2 transform -rotate-45 md:mt-20 md:-ml-2">
                <h1 className="text-[0.8rem] font-bold text-gray-300 md:text-xl md:font-bold md:text-gray-300">
                    KhadijaMarket
                </h1>
            </div>
        </div>
    ));

    const invoiceRef = useRef(null);

    const generateImage = () => {
        if (invoiceRef && invoiceRef.current) {
            html2canvas(invoiceRef.current).then((canvas) => {
                const link = document.createElement("a");
                link.download = "invoice.png";
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    };

    function modifyPhoneNumber(phoneNumber) {
        if (phoneNumber && phoneNumber.startsWith('08')) {
            return '+628' + phoneNumber.substr(2);
        }
        return phoneNumber;
    }

    // Calculate total quantities for products and bundles
    const totalProductQuantity = product.length > 0 ? parseInt(product[0].quantity) : 0;
    const totalBundleQuantity = bundle.length > 0 ? parseInt(bundle[0].quantity) : 0;
    const totalQuantity = totalProductQuantity + totalBundleQuantity;

    const priceProductQuantity = product.length > 0 ? parseInt(product[0].price_sale) : 0;
    const priceBundleQuantity = bundle.length > 0 ? parseInt(bundle[0].price_bundle) : 0;
    const priceTotal = (priceProductQuantity * totalProductQuantity) + (priceBundleQuantity * totalBundleQuantity);

    // Initialize a variable to store the total discount
    let totalDiscount = 0;

// Map through the order items and calculate the total discount
    order.map((item, index) => {
        totalDiscount += parseInt(item.total_discount_table) +
            parseInt(item.total_discount_product) +
            parseInt(item.total_discount_coupon);
        return null; // Return null as map requires a return value
    });


    return (
        <div className="bg white max-h-full h-[100rem]">

            <div className="grid place-content-center text-[12px]" ref={invoiceRef}>
                <div className="mt-[5.2rem] absolute text-center w-full">
                    {/*address*/}
                    <p>JI. Cangkringan Km 1, Karangkalasan RT 05 RW 07
                        <br/>
                        Tirtomartani, Kec. Kalasan, Kab. Sleman</p>

                    {/*nota*/}
                    <div className="mt-2">
                        <p className="font-bold uppercase">NOTA PESANAN <br/></p>
                        {order.map((item, index) => (
                            <p className="font-semibold uppercase">
                                No Order : {item.order_code}</p>
                        ))}
                    </div>

                    {/*order date*/}
                    <div className="flex justify-center mt-3">
                        {order.map((item, index) => (
                            <div className="md:w-1/3">
                                <p>Tanggal Order <br/>{item.order_date}</p>
                            </div>
                        ))}
                    </div>

                    {/*Pemesan*/}
                    <div className="flex justify-center mt-3">
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-28">
                            {order.map((item, index) => (
                                <div className="md:w-full">
                                    <p>Nama Pemesan <br/>
                                        <span className="font-bold uppercase">
                                {item.penerima.name}
                                </span></p>
                                </div>
                            ))}
                            {order.map((item, index) => (
                                <div className="md:w-full">
                                    <p>No WhatsApp <br/>
                                        <span className="font-bold uppercase">
                                {item.penerima.no_wa}
                                </span></p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*Pengorder*/}
                    <div className="flex justify-center mt-3">
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-28">
                            {order.map((item, index) => (
                                <div className="md:w-full" key={index}>
                                    <p>Nama Pengirim <br/>
                                        <span className="font-bold uppercase">
                        {item.users.id === item.penerima.id ? 'Khadija Market' : item.users.name}
                    </span>
                                    </p>
                                </div>
                            ))}

                            {order.map((item, index) => (
                                <div className="md:w-full" key={index}>
                                    <p>No WhatsApp <br/>
                                        <span className="font-bold uppercase">
                        {item.users.id === item.penerima.id ? '081326865235' : item.users.no_wa}
                    </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*Address detail*/}
                    <div className="flex justify-center mt-3">
                        {order.map((item, index) => (
                            <div className="w-3/4 md:w-1/6 lg:1/2">
                                <p>Alamat
                                    Lengkap<br/>{item.detail_alamat == null ? 'JI. Cangkringan Km 1, Karangkalasan RT 05 RW 07 ' +
                                        'Tirtomartani, Kec. Kalasan, Kab. Sleman' : item.detail_alamat}</p>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-center mt-2">
                        <table className="table-auto" style={{ width: '360px' }}>
                            <thead>
                            <tr>
                                <th className="py-1 " style={{width: '50%'}}>Produk</th>
                                <th className="py-1 " style={{width: '25%'}}>Qty | Harga</th>
                                <th className="py-1 " style={{width: '25%'}}>Jumlah</th>
                            </tr>
                            </thead>
                            <tbody>
                            {product.length > 0 && (
                                <tr>
                                    <td className="py-2 " style={{width: '40%'}}>{product[0].name}</td>
                                    <td className="py-2 "
                                        style={{width: '25%'}}>{product[0].quantity} | {product[0].price_sale_formater}</td>
                                    <td className="py-2 "
                                        style={{width: '35%'}}>{parseInt(product[0].quantity) * parseInt(product[0].price_sale)}</td>
                                </tr>
                            )}
                            {bundle.length === 0 && (
                                <tr>
                                    <td colSpan={3} style={{paddingTop: '2.5rem'}}></td>
                                </tr>
                            )}

                            {bundle.length > 0 && (
                                <tr>
                                    <td className="py-2 " style={{width: '40%'}}>{product[0].name}</td>
                                    <td className="py-2 "
                                        style={{width: '25%'}}>{product[0].quantity} | {product[0].price_sale_formater}</td>
                                    <td className="py-2 "
                                        style={{width: '35%'}}>{parseInt(product[0].quantity) * parseInt(product[0].price_sale)}</td>
                                </tr>
                            )}

                            {/* Display total quantity row */}
                            <tr>
                                <td className="pt-2  text-start">Jumlah Item:</td>
                                <td className="pt-2 pl-4 font-bold  text-start" colSpan={2}>{totalQuantity} Item</td>
                            </tr>
                            <tr>
                                <td className=" text-start" colSpan={2}>Subtotal:</td>
                                <td className=" text-start">Rp. {priceTotal}</td>
                            </tr>
                            {order.map((item, index) => (
                                <tr>
                                    <td className=" text-start" colSpan={2}>Ongkir: <span
                                        className="uppercase"> {item.courier.name} {item.paketRajaOngkir}</span></td>
                                    <td className=" text-start">Rp. {item.ongkirRajaOngkir}</td>
                                </tr>
                            ))}

                            {order.map((item, index) => (
                                <tr>
                                    <td className=" text-start" colSpan={2}>Diskon:</td>
                                    <td className=" text-start">Rp. {totalDiscount}</td>
                                </tr>
                            ))}

                            {order.map((item, index) => (
                                <tr>
                                    <td className=" text-start" colSpan={2}>Angka Unik:</td>
                                    <td className=" text-start"> Rp. {item.id} (+)</td>
                                </tr>
                            ))}

                            {order.map((item, index) => (
                                <tr>
                                    <td className="pt-3 pb-1 font-bold  text-start" colSpan={2}>Total yang Harus
                                        Dibayar:
                                    </td>
                                    <td className="pt-3 pb-1 font-bold text-start">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(parseInt(item.id) + parseInt(item.ongkirRajaOngkir) + parseInt(priceTotal))}
                                    </td>
                                </tr>
                            ))}


                            <tr>
                                <td className=" text-start" colSpan={2}>Metode Pembayaran:</td>
                                <td className=" text-start"> Transfer / Tunai</td>
                            </tr>
                            <tr>
                                <td className=" text-start" colSpan={2}>Rekening:</td>
                                <td className=" text-start"> 1048.062.586</td>
                            </tr>
                            <tr>
                                <td className="font-bold  text-end" colSpan={3}>A.n Wahyu Pujananto</td>
                            </tr>
                            <tr>
                                <td className="text-start w-[10rem] text-[11px] py-2" colSpan={3}>
                                    <span>
                                        <p className="font-bold">Instruksi Pembayaran :</p>
                                        <p>
                                            Silahkan lakukan pembayaran dengan cara transfer ke
                                            Rekening diatas sesuai dengan nominal belanja beserta angka unik digit terakhir. Angka unik digunakan untuk memudahkan admin mengecek pembayaran.
                                        </p>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="" colSpan={3}>
                                    <div className="grid place-items-center" >
                                        {barcodeData && (
                                            <div>
                                                <style>
                                                    {`
                                                        text {
                                                          display: none;
                                                        }
                                                        svg {
                                                          width: 300px;
                                                          height: 100px;
                                                        }
                                                      `}
                                                </style>
                                                <Barcode value={barcodeData}/>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <img className="w-[414px] h-[896px]" src={nota} alt=""/>
            </div>

            {/* Download Image button */
            }
            <div className="grid px-2 place-items-center">
                <button
                    className="p-2 my-2 text-white bg-yellow-400 rounded shadow"
                    onClick={generateImage}
                >
                    Download Invoice
                </button>
                {order.map((item, index) => {
                    const modifiedPhoneNumber = modifyPhoneNumber(item.penerima.no_wa);
                    return (
                        <a
                            href={`https://wa.me/${modifiedPhoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white rounded shadow bg-primary"
                        >
                            Send Invoice to WhatsApp
                        </a>
                    );
                })}

            </div>
            <br/>
            <Link to="/pesanan-baru-member">
                <button className="p-2 my-2 bg-white rounded shadow text-primary">
                    Kembali ke Dashboard
                </button>
            </Link>
        </div>
    )
        ;
};

export default Invoice;

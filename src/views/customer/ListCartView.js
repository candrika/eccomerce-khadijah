import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import ListCart from "../../components/customer/ListCart";
import BundleCart from "../../components/customer/BundleCart";
import Navbar from "../../components/customer/Navbar";

const ListCartView = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);  // Adjust the threshold as needed

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);  // Adjust the threshold as needed
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? (
                <>
                    <Navbar />
                    <div style={{ paddingTop: '6rem' }}>
                    <ListCart />
                    </div>
                    <BundleCart />
                </>
            ) : (
                <MainLayout>
                    <ListCart />
                    <BundleCart />
                </MainLayout>
            )}
        </>
    );
};

export default ListCartView;

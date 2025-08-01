import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const navList = [
        {
            nav: "Men",
            to: "/collections/all",
        },
        {
            nav: "Women",
            to: "#",
        },
        {
            nav: "Top Wear",
            to: "#",
        },
        {
            nav: "Bottom Wear",
            to: "#",
        },
    ];

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const classForIcons = "h-6 w-6 text-gray-700";
    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 px-10 md:px-20">
                {/* Left - Logo */}
                <div>
                    <Link to="/">Ecomme</Link>
                </div>

                {/* Center - Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    {navList.map((nav) => (
                        <Link
                            key={nav.nav}
                            to={nav.to}
                            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
                            aria-label={`Go to ${nav.nav}`}
                        >
                            {nav.nav}
                        </Link>
                    ))}
                </div>

                {/* Right - icons */}
                <div className="flex items-center space-x-4">
                    <Link to={"/profile"} className="hover:text-black">
                        <HiOutlineUser className={classForIcons} />
                    </Link>
                    <button
                        onClick={toggleCartDrawer}
                        className="relative hover:text-black"
                    >
                        <HiOutlineShoppingBag className={classForIcons} />
                        <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                            4
                        </span>
                    </button>
                    {/* Search Icon */}
                    <SearchBar />

                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className={`${classForIcons}`} />
                    </button>
                </div>
            </nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Mobile Navigation */}
            <div
                className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                    navDrawerOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className="h-6 w-6 text-gray-600"/>
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <nav className="space-y-4">
                        {
                            navList.map(link => (
                                <Link
                                    key={link.nav}
                                    to={link.to}    
                                    onClick={toggleNavDrawer}
                                    className="block text-gray-600 hover:text-black"
                                >
                                    {link.nav}
                                </Link>

                            ))
                        }
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;

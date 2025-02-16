import React from "react";
import { Link } from "react-router-dom";
import { FaMeta } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FiInstagram, FiPhoneCall } from "react-icons/fi";

const Footer = () => {
    const shopLinks = [
        {
            linkTo: "#",
            name: "Men's Top Wear",
        },
        {
            linkTo: "#",
            name: "Women's Top Wear",
        },
        {
            linkTo: "#",
            name: "Men's Bottom Wear",
        },
        {
            linkTo: "#",
            name: "Women's Bottom Wear",
        },
    ];

    const supportLinks = [
        {
            linkTo: "#",
            name: "Contact Us",
        },
        {
            linkTo: "#",
            name: "About Us",
        },
        {
            linkTo: "#",
            name: "FAQs",
        },
        {
            linkTo: "#",
            name: "Features",
        },
    ];

    return (
        <footer className="border-t py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-6">
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
                    <p className="text-gray-500 mb-4">
                        Be the first to hear about new products, exclusive events, and
                        online offers.
                    </p>
                    <p className="font-medium text-sm text-gray-600 mb-6">
                        Sign up and get 10% of on your first order.
                    </p>

                    {/* Newsletter form */}
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-6 text-sm rounded-r-md hover:bg-gray-800 transition-all"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Shop Links */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
                    <ul className="space-y-2 text-gray-800">
                        {shopLinks.map((list) => (
                            <li id={list.name}>
                                <Link
                                    to={list.linkTo}
                                    className="hover:text-gray-500 transition-colors"
                                >
                                    {list.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-800">
                        {supportLinks.map((list) => (
                            <li id={list.name}>
                                <Link
                                    to={list.linkTo}
                                    className="hover:text-gray-500 transition-colors"
                                >
                                    {list.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Follow us */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
                    <div className="flex items-center space-x-4 mb-6">
                        <a
                            href="https://www.facebook.com"
                            target="_black"
                            rel="noopener noreferrer"
                            className="hover:text-gray-500"
                        >
                            <FaMeta className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_black"
                            rel="noopener noreferrer"
                            className="hover:text-gray-500"
                        >
                            <FiInstagram className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_black"
                            rel="noopener noreferrer"
                            className="hover:text-gray-500"
                        >
                            <RiTwitterXFill className="h-5 w-5" />
                        </a>
                    </div>
                    <p className="text-gray-500">Call Us</p>
                    <p>
                        <FiPhoneCall className="inline-block mr-2" />
                        +91 0123456789
                    </p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
                <p className="text-gray-500 text-sm tracking-tighter text-center">©️ 2025, Eccome. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

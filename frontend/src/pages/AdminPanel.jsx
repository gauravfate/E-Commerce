import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const user = useSelector((state) => state.userSlice?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.role != "ADMIN") { 
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className=" min-h-[90vh] lg:flex flex">
            <aside className="min-h-full bg-white max-w-80 w-full border-t-2">
                <div>
                    <div className="text-5xl flex justify-center mt-8">
                        <FaRegCircleUser />
                    </div>
                    <div className="flex justify-center font-semibold text-2xl mt-2">
                        <p>{user?.name}</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-3">
                    <nav className="grid text-center text-base bg-gray-50">
                        <Link
                            to="add-product"
                            className="hover:bg-gray-100 py-3 border-b-2 border-t-2"
                        >
                            Add Product
                        </Link>
                        <Link
                            to="all-products"
                            className="hover:bg-gray-100 py-3 border-b-2"
                        >
                            Product List
                        </Link>
                    </nav>
                </div>
            </aside>

            <main className="w-full h-full p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;

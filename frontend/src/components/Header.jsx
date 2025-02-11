import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { logoutUser } from "../network/user";
import { logout } from "../store/userSlice";

const Header = () => {
    const userStatus = useSelector((state) => state.userSlice.userStatus);
    const user = useSelector((state) => state.userSlice.user);
    const dispatch = useDispatch();

    const logoutHandle = async () => {
        const response = await logoutUser();

        // console.log(response);
        if (response.success) {
            dispatch(logout());
            toast.success("Logged Out");
        }
        if (response.error) {
            toast.error("Error In Logging Out");
        }
    };

    return (
        <header className="h-[4.5rem] bg-white border-b border-gray-200">
            <div className="h-full container mx-auto flex justify-between items-center px-10 ">
                <div>
                    <Link to={"/"}>
                        <Logo w={90} h={40} />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center w-full justify-between max-w-sm border-2 rounded-full pl-3">
                    <input
                        type="text"
                        placeholder="search here..."
                        className="outline-none w-full"
                    />
                    <div className="text-lg min-w-[50px] h-8 bg-blue-500 flex items-center justify-center rounded-r-full cursor-pointer">
                        <IoIosSearch className="text-white" />
                    </div>
                </div>

                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="relative ">
                        <div className="text-xl flex justify-center items-center group">
                            {/* {userStatus ? (
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={user?.profilePic || ""}
                                    alt="userImage"
                                />
                            ) : (
                                <FaRegUser />
                            )} */}

                            {userStatus ? <FaRegUser /> : null}

                            <div className="text-sm max-sm:hidden">{user?.email}</div>

                            {user?.role == "ADMIN" && (
                                <div className="absolute bg-white h-fit p-3 bottom-0 top-5 shadow-lg rounded hidden group-hover:block">
                                    <nav className=" text-sm">
                                        <Link
                                            to={"/admin-panel/all-products"}
                                            className="whitespace-nowrap"
                                        >
                                            Admin Panel
                                        </Link>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-2xl relative">
                        <Link to={"/cart"}>
                            <IoCartOutline />
                        </Link>

                        <div className="absolute -top-2 left-3 text-xs bg-red-500 w-5 h-5 p-2 flex justify-center items-center rounded-full">
                            <p className="text-white">0</p>
                        </div>
                    </div>

                    <div>
                        {console.log({ userStatus })}

                        {userStatus ? (
                            <button
                                onClick={logoutHandle}
                                className="hover:bg-blue-500 hover:text-white px-4 py-1 rounded-full border-2 flex items-center gap-2"
                            >
                                <span>Logout</span>
                                <MdLogout />
                            </button>
                        ) : (
                            <Link
                                to={"/login"}
                                className="hover:bg-blue-500 hover:text-white px-4 py-1 rounded-full border-2"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

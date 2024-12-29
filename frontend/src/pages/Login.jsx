import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { loginUser } from "../network/user.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice.js";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandle = async (data) => {

        if(!(data.email && data.password)) {
            toast.error("All fields are required");
        }
        try {
            const response = await loginUser(data);
            // console.log("response In Login : ", response.data);
            
            if(response.success) {
                dispatch(login(response.data.user));
                toast.success(response.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section id="login">
            <div className="container mx-auto py-12">
                <div className="bg-white p-2 w-full max-w-md mx-auto">
                    <div className="text-center text-2xl  text-blue-500 font-semibold">
                        Login
                    </div>
                    
                    <form onSubmit={handleSubmit(loginHandle)} className="px-5 py-3">
                        <Input
                            label="Email"
                            placeholder="email"
                            type="email"
                            className="w-full"
                            {...register("email", {
                                required: true,
                            })}
                        />

                        <div className="mb-4 ">
                            <div className="w-full relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full"
                                    placeholder="password"
                                    autoComplete="false"
                                    {...register("password", { required: true })}
                                />
                                <div
                                    className="flex items-center px-4 cursor-pointer absolute right-0 bottom-3"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link
                            to={"/forgot-password"}
                            className="hover:underline text-gray-500 block ml-auto w-fit"
                        >
                            Forgot-Password?
                        </Link>
                        


                        <button
                            type="submit"
                            className="bg-blue-500 w-full py-3 text-white text-lg mt-1 hover:bg-blue-600"
                        >
                            Login
                        </button>

                        <p className="text-blue-600 mt-1">
                            <Link to={"/sign-up"}>New to Store? Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;

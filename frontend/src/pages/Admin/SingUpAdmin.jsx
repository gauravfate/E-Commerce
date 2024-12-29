import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { loginUser } from "../../network/user";
import { toast } from "react-toastify";
import { createAdmin } from "../../network/admin";

const SingUpAdmin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit } = useForm();

    const loginHandle = async (data) => {

        if(data.password.length <= 5 ) {
            toast.error("Password must be at least 6 characters long.")
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match.")
            return;
        }
        try {
            const response = await createAdmin(data);

            console.log(response.ok);
            if (response) {
                toast.success(response.message);
                await loginUser({email:data.email, password : data.password})
                console.log(response);
                
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section id="SingUpAdmin">
            <div className="container mx-auto py-12">
                <div className="bg-white p-2 w-full max-w-md mx-auto">
                    <div className="text-center text-2xl  text-blue-500 font-semibold">
                        Sign Up
                    </div>

                    <form onSubmit={handleSubmit(loginHandle)} className="px-5 py-3">
                        <Input
                            label="Name"
                            placeholder="name"
                            type="name"
                            className="w-full"
                            {...register("name", {
                                required: true,
                            })}
                        />

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

                        <div className="mb-4 ">
                            <div className="w-full relative">
                                <Input
                                    label="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full"
                                    placeholder="confirm password"
                                    autoComplete="false"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <div
                                    className="flex items-center px-4 cursor-pointer absolute right-0 bottom-3"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                >
                                    <span>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 w-full py-3 text-white text-lg mt-1 hover:bg-blue-600"
                        >
                            Sign Up
                        </button>

                        <p className="text-blue-600 mt-1">
                            <Link to={"/login"}>Existing User? Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SingUpAdmin;

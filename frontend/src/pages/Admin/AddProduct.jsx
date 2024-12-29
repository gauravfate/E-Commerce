import React, { useEffect, useState } from "react";
import { getAddProduct } from "../../network/admin";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const [allUser, setAllUser] = useState([]);
    const { register, handleSubmit } = useForm();
    const [category, setCategory] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const users = await getAddProduct();

            setAllUser(users.data);
            // console.log(users.data);
        };

        getUsers();
    }, []);

    const productInfo = () => {};

    const categoriesProducts = ["Airpodes", "Camera", "Earphones", "Mobiles", "Mouse"];
    return (
        <div className="bg-white w-[65%]">
            <form className="w-full p-6">
                <div>
                    <Input
                        label="Product title"
                        placeholder="type here"
                        type="text"
                        className="w-full"
                        {...register("title", {
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <Input
                        label="Brand Name"
                        placeholder="brand name"
                        type="text"
                        className="w-full"
                        {...register("brandName", {
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category: </label>
                    <select id="category" className=" border-2 px-2 py-1">
                        {categoriesProducts.map((category) => {
                            return (
                                <option
                                    onClick={(e) => setCategory(e.target.val)}
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

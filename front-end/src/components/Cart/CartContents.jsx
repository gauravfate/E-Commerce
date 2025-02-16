import React from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
    const cartProducts = [
        {
            productId: 1,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=1",
        },
        {
            productId: 2,
            name: "T-shirt",
            size: "M",
            color: "Blue",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=2",
        },
        {
            productId: 3,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 15,
            image: "https://picsum.photos/200?random=3",
        },
    ];
    return (
        <div>
            {cartProducts.map((product, index) => (
                <div
                    key={index}
                    className="flex items-start justify-between py-4 border-b"
                >
                    <div className="flex items-start">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-24 object-cover mr-4 rounded"
                        />
                        <div>
                            <h3>{product.name}</h3>
                            <p className="text-sm text-gray-500">
                                Size: {product.size} | color: {product.color}
                            </p>

                            <div className="flex items-center mt-2">
                                <button>
                                    <CiCircleMinus className="text-2xl" />
                                </button>
                                <span className="mx-3">{product.quantity}</span>
                                <button>
                                    <CiCirclePlus className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>$ {product.price.toLocaleString()}</p>
                        <button>
                            <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;

import React from "react";

const chekout = {
    _id: "123",
    createdAt: new Date(),
    checkoutItems: [
        {
            productId: "1",
            name: "Jacket",
            color: "black",
            size: "M",
            price: 150,
            quantity: 1,
            image: "https://picsum.photos/150?random=1",
        },
        {
            productId: "2",
            name: "T-shirt",
            color: "black",
            size: "M",
            price: 150,
            quantity: 1,
            image: "https://picsum.photos/150?random=2",
        },
    ],
    shippingAddress: {
        address: "123 street",
        city: "India",
        country: "India",
    },
};

const OrderConfirmationPage = () => {
    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to order Date
        return orderDate.toLocaleDateString();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
                Thank You For Order!
            </h1>

            {chekout && (
                <div className="p-6 rounded-lg border">
                    <div className="flex justify-between mb-20">
                        {/* order Id and Date */}
                        <div>
                            <h2 className="text-gray-500">Order Id: {chekout._id}</h2>
                            <p className="text-gray-500">
                                Order Date:{" "}
                                {new Date(chekout.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Estimated Delivery */}
                        <div>
                            <p className="text-emerald-700 text-sm">
                                Estimated Delivery:{" "}
                                {calculateEstimatedDelivery(chekout.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Ordered Items */}
                    <div>
                        {chekout.checkoutItems.map((item) => (
                            <div key={item.productId} className="flex items-center mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <h4 className="text-md font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        {item.color} | {item.size}
                                    </p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-md">${item.price}</p>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment and Delivery Info */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Payment Info */}
                        <div>
                            <h4 className="text-lg font-semibold b-2">Payment</h4>
                            <p className="text-gray-600">PayPal</p>
                        </div>

                        {/* Delivery Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                            <p className="text-gray-600">
                                {chekout.shippingAddress.address}
                            </p>
                            <p className="text-gray-600">
                                {chekout.shippingAddress.city},{" "}
                                {chekout.shippingAddress.city}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmationPage;

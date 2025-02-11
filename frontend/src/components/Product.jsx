import React, { useEffect, useState } from "react";
import { getProducts } from "../network/product";
import { Link } from "react-router-dom";

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.data);
            } catch (err) {
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or text while data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Show an error message if something goes wrong
    }

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-3 py-8 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`} // Example: Linking to /product/123
                            className="group"
                        >
                            <img
                                alt={product.images[0]}
                                src={product.images[0]}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">
                                {product.title}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {product.price}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

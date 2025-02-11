import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../network/product"; // Ensure this function fetches product by ID

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(""); // State for main image

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id); // Fetch product by ID
                console.log(data);
                setProduct(data.data); // Set the product details from the response
                setMainImage(data.data.images[0]); // Default to first image as the main image
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="text-center text-xl mt-12">Loading product details...</div>;
    }

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl); // Update the main image when a thumbnail is clicked
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Product Title */}
            <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>

            {/* Product Details Section */}
            <div className="flex flex-col lg:flex-row mt-8 gap-12">
                {/* Product Images */}
                <div className="flex-1">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="flex mt-4 gap-4">
                        {/* Thumbnail images */}
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`product image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                                onClick={() => handleThumbnailClick(image)} // Click event to update main image
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 lg:ml-8">
                    {/* Price */}
                    <p className="text-3xl font-semibold text-blue-600">${product.price}</p>

                    {/* Product Description */}
                    <p className="mt-4 text-gray-700">{product.description}</p>
                    <p className="mt-2 text-gray-500">{product.content}</p>

                    {/* Product Category */}
                    <div className="mt-6">
                        <h3 className="font-medium text-gray-800">Category:</h3>
                        <p className="text-gray-600">{product.category}</p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-8 flex gap-4">
                        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Add To Cart
                        </button>
                        <button className="font-bold text-blue-600 py-3 px-6 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition duration-300">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

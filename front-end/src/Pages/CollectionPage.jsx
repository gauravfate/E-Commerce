import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const sideBarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        // close sidebar if clicked outside
        if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const feachedProducts = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    image: [{ url: "https://picsum.photos/500/500?random=5" }],
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 100,
                    image: [{ url: "https://picsum.photos/500/500?random=3" }],
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 100,
                    image: [{ url: "https://picsum.photos/500/500?random=1" }],
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 100,
                    image: [{ url: "https://picsum.photos/500/500?random=6" }],
                },
            ];
            setProducts(feachedProducts);
        }, 1000);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile Filter Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden boarder p-2 flex justify-center items-center"
            >
                <FaFilter className="mr-2" />
            </button>

            {/* Filter Sidebar */}
            <div
                ref={sideBarRef}
                className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>
            
            <div className="flex-grow">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                {/* Sort Options */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products}/>
            </div>
        </div>
    );
};

export default CollectionPage;

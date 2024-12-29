import React from "react";

const AllProducts = () => {
    return (
        <div className="bg-white p-2">
            <h1 className="text-center text-2xl font-semibold mt-4">All Products List</h1>
            {/* grid */}
            <div className="">
                {/* header */}
                <div className="grid grid-cols-6 gap-4 mt-8 text-center">
                    {[
                        "Product",
                        "Title",
                        "Old Price",
                        "New Price",
                        "Category",
                        "Remove",
                    ].map((i) => (
                        <div key={i}>{i}</div>
                    ))}
                </div>
                
                <div className="w-full h-[1.5px] bg-slate-400 mt-4"></div>
                
                <div className="grid grid-cols-6 gap-4 text-center">
                {[
                        "Product",
                        "Title",
                        "Old Price",
                        "New Price",
                        "Category",
                        "Remove",
                    ].map((i) => (
                        <div key={i}>{i}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
